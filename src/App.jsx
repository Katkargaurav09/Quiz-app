import React, { useState } from "react";
import Numerical from "./components/Numerical";
import Logical from "./components/Logical";
import Verbal from "./components/Verbal";

const App = () => {
  let [data, setData] = useState({ question: 5, category: "", level: "" });
  let [startQuiz, setStartQuiz] = useState(false);

  let handleSubmit = (e) => {
    e.preventDefault();
    setStartQuiz(true);
  };

  const handleReset = () => {
    setStartQuiz(false);
  };

  let handleChange = (e) => {
    let { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  if (startQuiz) {
    if (data.category === "Quantitative Aptitude") {
      return (
        <Numerical
          question={data.question}
          level={data.level}
          onReset={handleReset}
        />
      );
    } else if (data.category === "Logical Reasoning") {
      return (
        <Logical
          question={data.question}
          level={data.level}
          onReset={handleReset}
        />
      );
    } else if (data.category === "Verbal Ability") {
      return (
        <Verbal
          question={data.question}
          level={data.level}
          onReset={handleReset}
        />
      );
    } else {
      return <h2>Please select a valid category.</h2>;
    }
  }
  return (
    <div className="home-container">
      <article>
        <h1>Quiz App</h1>
        <hr />
        <form className="selection" onSubmit={handleSubmit}>
          <label htmlFor="question">Number Of Question:</label>
          <select
            id="question"
            name="question"
            value={data.question}
            onChange={handleChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
          <label htmlFor="category">Select Category:</label>
          <select
            id="category"
            name="category"
            value={data.category}
            onChange={handleChange}
            required
          >
            <option value="">-- Select --</option>
            <option value="Quantitative Aptitude">Quantitative Aptitude</option>
            <option value="Logical Reasoning">Logical Reasoning</option>
            <option value="Verbal Ability">Verbal Ability</option>
          </select>
          <label htmlFor="level">Select Level:</label>
          <select
            id="level"
            name="level"
            value={data.level}
            onChange={handleChange}
            required
          >
            <option value="">-- Select --</option>
            <option value="easy">Basic Level</option>
            <option value="intermediate">Intermediate Level</option>
            <option value="advanced">Advanced Level</option>
          </select>
          <button type="submit">Start Quiz</button>
        </form>
      </article>
    </div>
  );
};

export default App;
