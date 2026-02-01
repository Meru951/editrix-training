/**
 * Proofreading Course — Exercise Engine
 * Handles loading, rendering, and scoring of exercises
 */

class ExerciseEngine {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentExercise = null;
        this.userAnswers = [];
    }

    /**
     * Load exercises from JSON file
     */
    async loadExercises(stage) {
        const response = await fetch(`../curriculum/stage-${stage}/exercises.json`);
        return await response.json();
    }

    /**
     * Render a spot-errors exercise
     * User clicks on words they think are errors
     */
    renderSpotErrors(exercise) {
        this.currentExercise = exercise;
        this.userAnswers = [];

        const words = exercise.passage.split(/(\s+)/);
        let html = `
            <h3>${exercise.title}</h3>
            <p class="instructions">${exercise.instructions}</p>
            <div class="passage spot-errors">
        `;

        words.forEach((word, idx) => {
            if (word.trim()) {
                html += `<span class="word" data-idx="${idx}" onclick="engine.toggleWord(${idx})">${word}</span>`;
            } else {
                html += word;
            }
        });

        html += `
            </div>
            <button onclick="engine.submitSpotErrors()">Check Answers</button>
            <div id="feedback"></div>
        `;

        this.container.innerHTML = html;
    }

    toggleWord(idx) {
        const el = this.container.querySelector(`[data-idx="${idx}"]`);
        if (this.userAnswers.includes(idx)) {
            this.userAnswers = this.userAnswers.filter(i => i !== idx);
            el.classList.remove('marked');
        } else {
            this.userAnswers.push(idx);
            el.classList.add('marked');
        }
    }

    submitSpotErrors() {
        const exercise = this.currentExercise;
        const words = exercise.passage.split(/(\s+)/).filter(w => w.trim());
        
        // Get indices of actual error words
        const errorIndices = [];
        exercise.errors.forEach(err => {
            const idx = words.findIndex(w => w.includes(err.word) || err.word.includes(w));
            if (idx !== -1) errorIndices.push(idx);
        });

        // Calculate score
        let correct = 0;
        let falsePositives = 0;
        let missed = 0;

        this.userAnswers.forEach(idx => {
            if (errorIndices.includes(idx)) {
                correct++;
            } else {
                falsePositives++;
            }
        });

        errorIndices.forEach(idx => {
            if (!this.userAnswers.includes(idx)) {
                missed++;
            }
        });

        const total = errorIndices.length;
        const score = Math.max(0, (correct - falsePositives) / total * 100);

        this.showFeedback({
            score: score.toFixed(0),
            correct,
            missed,
            falsePositives,
            total
        });
    }

    /**
     * Render a fix-errors exercise
     * User types corrections in input fields
     */
    renderFixErrors(exercise) {
        this.currentExercise = exercise;
        
        let html = `
            <h3>${exercise.title}</h3>
            <p class="instructions">${exercise.instructions}</p>
            <div class="passage fix-errors">
                <p>${exercise.passage}</p>
            </div>
            <div class="corrections">
                <h4>Your Corrections:</h4>
        `;

        exercise.errors.forEach((err, idx) => {
            html += `
                <div class="correction-row">
                    <label>Error ${idx + 1}: "${err.text}"</label>
                    <input type="text" id="fix-${idx}" placeholder="Your correction...">
                </div>
            `;
        });

        html += `
            </div>
            <button onclick="engine.submitFixErrors()">Check Answers</button>
            <div id="feedback"></div>
        `;

        this.container.innerHTML = html;
    }

    submitFixErrors() {
        const exercise = this.currentExercise;
        let correct = 0;

        exercise.errors.forEach((err, idx) => {
            const input = document.getElementById(`fix-${idx}`);
            const userAnswer = input.value.trim().toLowerCase();
            const expected = err.correction.toLowerCase();

            if (userAnswer === expected || this.fuzzyMatch(userAnswer, expected)) {
                correct++;
                input.classList.add('correct');
            } else {
                input.classList.add('incorrect');
            }
        });

        const score = (correct / exercise.errors.length * 100).toFixed(0);
        this.showFeedback({
            score,
            correct,
            total: exercise.errors.length
        });
    }

    /**
     * Render multiple choice exercise
     */
    renderMCQ(exercise) {
        this.currentExercise = exercise;

        let html = `
            <h3>${exercise.title}</h3>
            <p class="instructions">${exercise.instructions}</p>
        `;

        exercise.items.forEach((item, idx) => {
            html += `
                <div class="mcq-item">
                    <p class="question">${idx + 1}. ${item.question}</p>
                    <div class="options">
            `;
            item.options.forEach((opt, optIdx) => {
                html += `
                    <label>
                        <input type="radio" name="q${idx}" value="${optIdx}">
                        ${opt}
                    </label>
                `;
            });
            html += `</div></div>`;
        });

        html += `
            <button onclick="engine.submitMCQ()">Check Answers</button>
            <div id="feedback"></div>
        `;

        this.container.innerHTML = html;
    }

    submitMCQ() {
        const exercise = this.currentExercise;
        let correct = 0;

        exercise.items.forEach((item, idx) => {
            const selected = document.querySelector(`input[name="q${idx}"]:checked`);
            if (selected && parseInt(selected.value) === item.correct) {
                correct++;
            }
        });

        const score = (correct / exercise.items.length * 100).toFixed(0);
        this.showFeedback({
            score,
            correct,
            total: exercise.items.length
        });
    }

    /**
     * Fuzzy matching for correction answers
     */
    fuzzyMatch(a, b) {
        // Remove punctuation and compare
        const clean = s => s.replace(/[^\w\s]/g, '').toLowerCase();
        return clean(a) === clean(b);
    }

    /**
     * Display feedback after submission
     */
    showFeedback(results) {
        const feedback = document.getElementById('feedback');
        const passed = results.score >= 80;

        feedback.innerHTML = `
            <div class="feedback-box ${passed ? 'passed' : 'failed'}">
                <h4>${passed ? '✓ Passed!' : '✗ Keep practicing'}</h4>
                <p>Score: <strong>${results.score}%</strong></p>
                <p>Correct: ${results.correct} / ${results.total}</p>
                ${results.missed ? `<p>Missed: ${results.missed}</p>` : ''}
                ${results.falsePositives ? `<p>False positives: ${results.falsePositives}</p>` : ''}
            </div>
        `;

        // Save progress
        this.saveProgress(results.score);
    }

    /**
     * Save progress to localStorage
     */
    saveProgress(score) {
        const progress = JSON.parse(localStorage.getItem('courseProgress') || '{}');
        const exerciseId = `${this.currentExercise.stage}-${this.currentExercise.id}`;
        
        if (!progress.exercises) progress.exercises = {};
        progress.exercises[exerciseId] = {
            score,
            completedAt: new Date().toISOString()
        };

        localStorage.setItem('courseProgress', JSON.stringify(progress));
    }
}

// Global instance
let engine;
document.addEventListener('DOMContentLoaded', () => {
    engine = new ExerciseEngine('exercise-container');
});
