import { useState, useEffect } from "react";
import "./App.css";
import { CardsContainer } from "./components/CardsContainer/CardsContainer";
import { Card } from "./components/Card/Card";
import { steps } from "./utils";

function App() {
  const [lastCard, setLastCard] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const [countDirection, setCountDirection] = useState(1);

  document.addEventListener("keydown", (event) => {
    console.log(
      `Key: ${
        event.key
      } and typeof ${typeof event.key} and Number(event.key) ${Number(
        event.key
      )} with keycode ${event.keyCode} has been pressed`
    );
    const keyNumber = Number(event.key);
    if (!isNaN(keyNumber) && keyNumber > 0 && keyNumber < 8) {
      setSelectedCard(keyNumber);
    } else if (!isNaN(keyNumber) && keyNumber === 0) {
      setSelectedCard(null);
    }
  });

  useEffect(() => {
    let interval = setInterval(() => {
      if (lastCard === 6) {
        setCountDirection(-1);
      } else if (lastCard === 0) {
        setCountDirection(1);
      }
      setLastCard((prevLastCard) => prevLastCard + countDirection);
    }, 300);
    if (selectedCard) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [lastCard, selectedCard, countDirection]);

  return (
    <div>
      <div className="title">HUG RATE</div>
      <CardsContainer>
        {steps.map((step) => {
          return (
            <Card
              key={step.name}
              name={step.name}
              color={step.color}
              opacity={step.id <= lastCard || !!selectedCard ? 1 : 0}
              selected={selectedCard - 1 === step.id}
            />
          );
        })}
      </CardsContainer>
    </div>
  );
}

export default App;
