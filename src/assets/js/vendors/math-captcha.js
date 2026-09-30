// Math captcha
//
// Adds a small arithmetic "prove you are human" challenge to any container
// marked with [data-math-captcha]. The expected answer is kept in the instance
// scope (it is never written into the DOM) and a new question is issued after
// every failed attempt.
//
// Markup contract:
//   <div data-math-captcha>
//     <span data-math-captcha-question></span>
//     <input data-math-captcha-input required />
//     <button data-math-captcha-refresh type="button"></button>
//   </div>
//
// Note: this is a client side deterrent only. A determined bot can always read
// the rendered question, so keep a server side check in production.

'use strict';

(function () {
  const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  // Build one question. Operands stay small so it is quick for a human to solve.
  const createQuestion = () => {
    const operator = ['+', '-', 'x'][randomInt(0, 2)];
    let left;
    let right;

    if (operator === '-') {
      left = randomInt(3, 15);
      right = randomInt(1, left - 1);
    } else if (operator === 'x') {
      left = randomInt(2, 9);
      right = randomInt(2, 6);
    } else {
      left = randomInt(1, 12);
      right = randomInt(1, 12);
    }

    const answers = {
      '+': left + right,
      '-': left - right,
      x: left * right,
    };

    return {
      label: `${left} ${operator} ${right} = ?`,
      answer: String(answers[operator]),
    };
  };

  class MathCaptcha {
    constructor(root) {
      this.root = root;
      this.form = root.closest('form');
      this.input = root.querySelector('[data-math-captcha-input]');
      this.question = root.querySelector('[data-math-captcha-question]');
      this.refreshButton = root.querySelector('[data-math-captcha-refresh]');
      this.answer = null;

      if (!this.input || !this.question) return;

      this.reset();
      this.attachEvents();
    }

    // Issue a new question and clear any previous error state.
    reset() {
      this.newQuestion();
      this.input.value = '';
      this.markValid();
    }

    // Swap in a fresh question without touching the field state.
    newQuestion() {
      const { label, answer } = createQuestion();
      this.answer = answer;
      this.question.textContent = label;
    }

    markInvalid() {
      this.input.classList.add('is-invalid');
      this.input.setCustomValidity('Incorrect answer.');
    }

    markValid() {
      this.input.classList.remove('is-invalid');
      this.input.setCustomValidity('');
    }

    isCorrect() {
      return this.input.value.trim() === this.answer;
    }

    attachEvents() {
      // Drop the error state as soon as the answer is edited.
      this.input.addEventListener('input', () => this.markValid());

      if (this.refreshButton) {
        this.refreshButton.addEventListener('click', () => {
          this.reset();
          this.input.focus();
        });
      }

      if (this.form) {
        // Runs after the theme's own .needs-validation submit handler, so a
        // solved captcha never blocks the rest of the form validation.
        this.form.addEventListener('submit', (event) => {
          if (this.isCorrect()) return;

          event.preventDefault();
          event.stopPropagation();

          this.newQuestion();
          this.input.value = '';
          this.markInvalid();
          this.input.focus();
        });
      }
    }
  }

  const initMathCaptcha = () => {
    document.querySelectorAll('[data-math-captcha]').forEach((root) => new MathCaptcha(root));
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMathCaptcha);
  } else {
    initMathCaptcha();
  }
})();
