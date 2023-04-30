import React, { useState, useEffect } from 'react';
import './questions.css';

function AnswerBar({ onSubmit }) {
  const [answer, setAnswer] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(answer.trim());
    setAnswer('');
  };

  return (
    <div className="form-group">
      <input type="text" id="answer" name="answer" autoComplete="off" required value={answer} onChange={(e) => setAnswer(e.target.value)} />
      <button type="submit" onClick={handleSubmit}>Next</button>
    </div>
  );
}

export default function Step2({ nextPage }) {
  const personalQuestions = [
    'What is your name?',
    'What is your age?',
    'What is your gender?',
    'What is your occupation?',
    'What is your marital status?',
    'Do you have any children?',
  ];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const storedIndex = parseInt(localStorage.getItem('currentQuestionIndex'));
    const storedAnswers = JSON.parse(localStorage.getItem('answers'));
    if (!isNaN(storedIndex)) {
      setCurrentQuestionIndex(storedIndex);
    }
    if (storedAnswers) {
      setAnswers(storedAnswers);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('currentQuestionIndex', currentQuestionIndex.toString());
    localStorage.setItem('answers', JSON.stringify(answers));
  }, [currentQuestionIndex, answers]);

  const handleAnswer = (answer) => {
    if (answer !== '') {
      setAnswers({ ...answers, [currentQuestionIndex]: answer });
      if (currentQuestionIndex < personalQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    }
  };

  const handleSubmission = () => {
    const filename = "answers.txt";
    let fileContents = "";
    Object.keys(answers).forEach((key) => {
      fileContents += `${personalQuestions[key]}: ${answers[key]}\n`;
    });

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileContents));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);

    nextPage(answers);
  };

  return (
    <div className="container">
      <h1>Personal Information</h1>
      <div className="question-container">
        <h3>{personalQuestions[currentQuestionIndex]}</h3>
        <AnswerBar onSubmit={handleAnswer} />
      </div>
      <div className="progress">
        <div
          className="progress-bar"
          style={{ width: `${((currentQuestionIndex + 1) / personalQuestions.length) * 100}%` }}
        ></div>
      </div>
      <p className="progress-label">
        {currentQuestionIndex + 1}/{personalQuestions.length}
      </p>
      {currentQuestionIndex === personalQuestions.length - 1 && (
        <button type="submit" onClick={handleSubmission}>Submit</button>
      )}
    </div>
  );
}


