import React, { useRef, useState } from "react";
import quiz from "../aptitude_quiz_questions.json";

const Verbal = ({ questions, level, onReset }) => {
  const fullData = quiz.verbal;

  const filteredByLevel = fullData.filter((q) => q.level === level);

  const limitedQuestions = filteredByLevel.slice(0, questions);

  const [data] = useState(limitedQuestions);
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(limitedQuestions[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [result, setResult] = useState(false);

  let option1 = useRef();
  let option2 = useRef();
  let option3 = useRef();
  let option4 = useRef();

  let opt_array = [option1, option2, option3, option4];

  let checkAns = (e, ans) => {
    if (lock == false) {
      if (question.answer == ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore((p) => p + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        opt_array[question.answer - 1].current.classList.add("correct");
      }
    }
  };

  let nextFn = (e) => {
    if (lock == true) {
      if (index == data.length - 1) {
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(data[index]);
      setLock(false);
      opt_array.forEach((option) =>
        option.current.classList.remove("correct", "wrong")
      );
    }
  };

  let resetFn = (e) => {
    setIndex(0);
    setLock(false);
    setQuestion(data[0]);
    setResult(false);
    setScore(0);
    onReset();
  };

  return (
    <div className="container">
      <article>
        <h1>Quiz App</h1>
        <hr />
        {result ? (
          <>
            <h2>
              Your Score is {score} out of {data.length}{" "}
            </h2>
            <button onClick={resetFn} className="next-btn">
              Reset
            </button>
          </>
        ) : (
          <>
            <h2>
              {index + 1}. {question.question}{" "}
            </h2>
            <ul>
              <li ref={option1} onClick={(e) => checkAns(e, 1)}>
                {question.option1}
              </li>
              <li ref={option2} onClick={(e) => checkAns(e, 2)}>
                {question.option2}
              </li>
              <li ref={option3} onClick={(e) => checkAns(e, 3)}>
                {question.option3}
              </li>
              <li ref={option4} onClick={(e) => checkAns(e, 4)}>
                {question.option4}
              </li>
            </ul>
            <button onClick={nextFn} className="next-btn">
              Next
            </button>
            <p>
              {" "}
              {index + 1} out of {data.length}{" "}
            </p>
          </>
        )}
      </article>
    </div>
  );
};

export default Verbal;
