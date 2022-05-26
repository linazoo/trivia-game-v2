import React from "react";

export const WelcomeScreen = ({ resetGame }) => {
  return (
    <div className="welcome-section">
      <h1>Welcome to Trivia!</h1>
      <h2>Lets see how much you know about 90's movies and world geography.</h2>
      <button onClick={resetGame}>Play Now!</button>
    </div>
  );
};

export default WelcomeScreen;
