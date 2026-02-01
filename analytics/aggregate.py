#!/usr/bin/env python3
"""
Aggregate learning analytics from raw submission data.
Generates insights about what editors struggle with.
"""

import json
from collections import defaultdict
from pathlib import Path

def load_submissions(filepath):
    """Load JSONL submission data."""
    submissions = []
    with open(filepath, 'r') as f:
        for line in f:
            if line.strip():
                submissions.append(json.loads(line))
    return submissions

def analyze_by_error_type(submissions):
    """Calculate accuracy by error type."""
    error_stats = defaultdict(lambda: {"correct": 0, "total": 0, "time_total": 0})
    
    for sub in submissions:
        error_type = sub.get("error_type", "unknown")
        error_stats[error_type]["total"] += 1
        error_stats[error_type]["time_total"] += sub.get("time_seconds", 0)
        
        if sub["result"] == "true_positive" or sub["result"] == "true_negative":
            error_stats[error_type]["correct"] += 1
    
    # Calculate percentages
    results = {}
    for error_type, stats in error_stats.items():
        accuracy = (stats["correct"] / stats["total"] * 100) if stats["total"] > 0 else 0
        avg_time = (stats["time_total"] / stats["total"]) if stats["total"] > 0 else 0
        results[error_type] = {
            "accuracy": round(accuracy, 1),
            "total_attempts": stats["total"],
            "avg_time_seconds": round(avg_time, 1)
        }
    
    return results

def find_struggle_areas(error_type_stats, threshold=70):
    """Find error types where students struggle (below threshold accuracy)."""
    struggles = []
    for error_type, stats in error_type_stats.items():
        if stats["accuracy"] < threshold:
            struggles.append({
                "error_type": error_type,
                "accuracy": stats["accuracy"],
                "attempts": stats["total_attempts"]
            })
    return sorted(struggles, key=lambda x: x["accuracy"])

def analyze_false_patterns(submissions):
    """Analyze false positive and false negative patterns."""
    false_negatives = defaultdict(int)  # Missed errors
    false_positives = defaultdict(int)  # Overcorrections
    
    for sub in submissions:
        error_type = sub.get("error_type", "unknown")
        if sub["result"] == "false_negative":
            false_negatives[error_type] += 1
        elif sub["result"] == "false_positive":
            false_positives[error_type] += 1
    
    return {
        "most_missed": dict(sorted(false_negatives.items(), key=lambda x: -x[1])[:5]),
        "most_overcorrected": dict(sorted(false_positives.items(), key=lambda x: -x[1])[:5])
    }

def generate_report(submissions):
    """Generate full analytics report."""
    error_stats = analyze_by_error_type(submissions)
    struggles = find_struggle_areas(error_stats)
    patterns = analyze_false_patterns(submissions)
    
    report = {
        "total_submissions": len(submissions),
        "unique_students": len(set(s["student_id"] for s in submissions)),
        "accuracy_by_error_type": error_stats,
        "struggle_areas": struggles,
        "false_patterns": patterns,
        "recommendations": []
    }
    
    # Generate recommendations
    for struggle in struggles[:3]:
        report["recommendations"].append(
            f"Add more practice for '{struggle['error_type']}' (only {struggle['accuracy']}% accuracy)"
        )
    
    return report

def main():
    # Load data
    raw_dir = Path(__file__).parent / "raw"
    submissions = []
    
    for filepath in raw_dir.glob("submissions-*.jsonl"):
        submissions.extend(load_submissions(filepath))
    
    if not submissions:
        print("No submission data found.")
        return
    
    # Generate report
    report = generate_report(submissions)
    
    # Print summary
    print("\n📊 LEARNING ANALYTICS REPORT")
    print("=" * 50)
    print(f"Total submissions analyzed: {report['total_submissions']}")
    print(f"Unique students: {report['unique_students']}")
    
    print("\n🎯 ACCURACY BY ERROR TYPE:")
    for error_type, stats in sorted(report['accuracy_by_error_type'].items(), 
                                     key=lambda x: x[1]['accuracy']):
        bar = "█" * int(stats['accuracy'] / 10) + "░" * (10 - int(stats['accuracy'] / 10))
        print(f"  {error_type:20} {bar} {stats['accuracy']:5.1f}%")
    
    print("\n⚠️  STRUGGLE AREAS (< 70% accuracy):")
    for struggle in report['struggle_areas']:
        print(f"  • {struggle['error_type']}: {struggle['accuracy']}%")
    
    print("\n🔴 MOST MISSED ERRORS (false negatives):")
    for error_type, count in report['false_patterns']['most_missed'].items():
        print(f"  • {error_type}: {count} misses")
    
    print("\n💡 RECOMMENDATIONS:")
    for rec in report['recommendations']:
        print(f"  → {rec}")
    
    # Save report
    output_path = Path(__file__).parent / "aggregated" / "latest-report.json"
    output_path.parent.mkdir(exist_ok=True)
    with open(output_path, 'w') as f:
        json.dump(report, f, indent=2)
    print(f"\n✅ Full report saved to: {output_path}")

if __name__ == "__main__":
    main()
