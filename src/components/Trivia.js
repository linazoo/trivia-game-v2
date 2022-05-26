import React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";

export const Trivia = ({
  score,
  currentQuestion,
  questions,
  onCorrectAnswer,
  advanceNextQuestion
}) => {
  const [hasAnswered, setHasAnswered] = React.useState(false);
  const [answeredCorrectly, setAnsweredCorrectly] = React.useState(null);
  const [selectedAnswers, setSelectedAnswers] = React.useState([]);

  const handleSingleAnswerClick = (isCorrect) => {
    setHasAnswered(true);
    if (isCorrect === true) {
      setAnsweredCorrectly(true);
      onCorrectAnswer();
    } else {
      setAnsweredCorrectly(false);
    }
  };

  const handleNextQuestionClick = () => {
    advanceNextQuestion();
    setHasAnswered(false);
  };
  // this handles when the user clicks the checkboxes for a multiple answer question - we check to see if the toggled item is the item that is selected and if it is we leave it as is and if its not we add it to our updatedselectedanswers array which keeps the latest items
  const handleCheckboxChange = (toggledItem) => {
    if (selectedAnswers.includes(toggledItem)) {
      const updatedSelectedAnswers = selectedAnswers.filter((selected) => {
        if (selected === toggledItem) {
          return false;
        } else {
          return true;
        }
      });
      setSelectedAnswers(updatedSelectedAnswers);
    } else {
      setSelectedAnswers([...selectedAnswers, toggledItem]);
    }
  };

  const handleMultipleAnswerQuestion = () => {
    const answerOptions = questions[currentQuestion].answerOptions;
    let isCorrect = true;

    const correctAnswers = answerOptions.filter((option) => {
      return option.isCorrect === true;
    });

    if (selectedAnswers.length !== correctAnswers.length) {
      isCorrect = false;
    }

    correctAnswers.forEach((answer) => {
      if (!selectedAnswers.includes(answer.answerText)) {
        isCorrect = false;
      }
    });

    setHasAnswered(true);
    if (isCorrect === true) {
      setAnsweredCorrectly(true);
      onCorrectAnswer();
    } else {
      setAnsweredCorrectly(false);
    }
  };

  return (
    <>
      <div className="question-count">
        <p>
          Question {currentQuestion + 1} of {questions.length}
        </p>
        <p>Score: {score}</p>
      </div>

      <div className="question-section">
        <div className="question-text">
          {questions[currentQuestion].questionText}
        </div>
      </div>

      {questions[currentQuestion].questionType === "multipleAnswer" ? (
        <div className="multiple-answer-section">
          <FormGroup>
            {questions[currentQuestion].answerOptions.map((answerOption) => {
              return (
                <FormControlLabel
                  key={answerOption.answerText}
                  control={
                    <Checkbox
                      onChange={() =>
                        handleCheckboxChange(answerOption.answerText)
                      }
                    />
                  }
                  label={answerOption.answerText}
                />
              );
            })}
          </FormGroup>
          {!hasAnswered ? (
            <Button
              variant="contained"
              className="set-button"
              onClick={handleMultipleAnswerQuestion}
            >
              Set your asnwers!
            </Button>
          ) : null}
        </div>
      ) : (
        <div className="single-answer-section">
          {questions[currentQuestion].answerOptions.map((answerOption) => {
            if (questions[currentQuestion].questionType === "multipleAnswer") {
              return <Checkbox />;
            }
            return (
              <Button
                variant="contained"
                disabled={hasAnswered}
                onClick={() => handleSingleAnswerClick(answerOption.isCorrect)}
                key={answerOption.answerText}
              >
                {answerOption.answerText}
              </Button>
            );
          })}
        </div>
      )}

      {hasAnswered ? (
        <>
          <div className="feedback-section">
            {answeredCorrectly ? (
              <p className="correct-answer">
                You got it right!
                <span aria-label="party emoji" role="img">
                  &nbsp; 🥳
                </span>
              </p>
            ) : (
              <p className="wrong-answer">
                That was wrong
                <span aria-label="party emoji" role="img">
                  &nbsp; 😳
                </span>
              </p>
            )}
            <Button
              variant="contained"
              onClick={handleNextQuestionClick}
              className="next-question-button"
            >
              Next Question
            </Button>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Trivia;
