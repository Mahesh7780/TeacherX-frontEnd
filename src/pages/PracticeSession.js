import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const mockQuestions = {
  Math: {
    Beginner: [
      { q: 'What is 2 + 2?', a: '4' },
      { q: 'Solve for x: x + 3 = 5', a: '2' },
    ],
    Intermediate: [
      { q: 'What is the derivative of x^2?', a: '2x' },
      { q: 'Solve: 2x + 5 = 11', a: '3' },
    ],
    Advanced: [
      { q: 'Integrate: ∫x^2 dx', a: 'x^3/3 + C' },
      { q: 'What is the limit of (1 + 1/n)^n as n approaches infinity?', a: 'e' },
    ],
  },
  Science: {
    Beginner: [
      { q: 'What planet is known as the Red Planet?', a: 'Mars' },
      { q: 'What is H2O commonly known as?', a: 'Water' },
    ],
    Intermediate: [
      { q: 'What is Newton’s second law?', a: 'F = ma' },
      { q: 'Define photosynthesis.', a: 'Process by which plants make food using sunlight' },
    ],
    Advanced: [
      { q: 'Explain the theory of relativity.', a: 'E = mc^2 and spacetime is relative' },
      { q: 'What is the chemical formula for glucose?', a: 'C6H12O6' },
    ],
  },
  Programming: {
    Beginner: [
      { q: 'What does HTML stand for?', a: 'HyperText Markup Language' },
      { q: 'Write a Python print statement.', a: 'print("Hello World")' },
    ],
    Intermediate: [
      { q: 'What is a for loop?', a: 'A loop that repeats code a set number of times' },
      { q: 'Explain the difference between let and var in JavaScript.', a: 'let is block scoped, var is function scoped' },
    ],
    Advanced: [
      { q: 'What is a closure in JavaScript?', a: 'A function with preserved data from its lexical scope' },
      { q: 'Explain recursion with an example.', a: 'A function that calls itself, e.g., factorial' },
    ],
  },
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const PracticeSession = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const subject = query.get('subject') || 'Math';
  const level = query.get('level') || 'Beginner';
  const questions = useMemo(() => mockQuestions[subject]?.[level] || [], [subject, level]);

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [input, setInput] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [finished, setFinished] = useState(false);

  const handleSubmit = () => {
    const correct = input.trim().toLowerCase() === questions[current].a.trim().toLowerCase();
    setIsCorrect(correct);
    setShowFeedback(true);
    setAnswers([...answers, { user: input, correct }]);
  };

  const handleNext = () => {
    setInput('');
    setShowFeedback(false);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    const correctCount = answers.filter(a => a.correct).length;
    return (
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900">
        <div className="max-w-2xl mx-auto w-full p-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Practice Results</h1>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Your Score</h2>
            <p className="text-2xl font-bold text-primary mb-2">{correctCount} / {questions.length}</p>
            <ul className="list-decimal pl-6 space-y-2 text-gray-800 dark:text-gray-100">
              {questions.map((q, idx) => (
                <li key={idx}>
                  <div className="mb-1">
                    <span className="font-medium">Q: {q.q}</span>
                  </div>
                  <div className="ml-2">
                    <span className="text-sm">Your answer: <span className={answers[idx]?.correct ? 'text-green-600' : 'text-red-600'}>{answers[idx]?.user || '-'}</span></span><br/>
                    <span className="text-sm">Correct answer: <span className="text-primary">{q.a}</span></span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <button
            className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-blue-600 transition"
            onClick={() => navigate('/practice-exercises')}
          >
            Back to Practice
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto w-full p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">Practice: {subject} ({level})</h1>
            <div className="text-sm text-gray-600 dark:text-gray-300">Question {current + 1} of {questions.length}</div>
          </div>
          <div className="w-40 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((current + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">{questions[current].q}</h2>
          {!showFeedback ? (
            <>
              <input
                type="text"
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 mb-4"
                placeholder="Type your answer..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                autoFocus
              />
              <button
                className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-blue-600 transition"
                onClick={handleSubmit}
                disabled={!input.trim()}
              >
                Submit
              </button>
            </>
          ) : (
            <div className="mb-4">
              {isCorrect ? (
                <div className="text-green-600 font-semibold mb-2">Correct!</div>
              ) : (
                <div className="text-red-600 font-semibold mb-2">Incorrect.</div>
              )}
              <div className="text-gray-700 dark:text-gray-200 mb-2">Correct answer: <span className="text-primary">{questions[current].a}</span></div>
              <button
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                onClick={handleNext}
              >
                {current + 1 === questions.length ? 'Finish' : 'Next'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PracticeSession; 