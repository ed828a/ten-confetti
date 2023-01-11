import { useEffect, useState } from "react";
import "./App.css";
import Die from "./Die";
import { nanoid } from "nanoid";
import ReactConfetti from "react-confetti";
const b = {
    c: "#ffffff"
}

function App() {
    const getNewDie = () => ({
        id: nanoid(),
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
    });
    const getANewSetOfDice = () => {
        const newSetDice = [];
        Array.from(new Array(10).keys()).forEach((e) => {
            newSetDice.push(getNewDie());
        });
        // console.log(newSetDice);
        return newSetDice;
    };

    const [dice, setDice] = useState(getANewSetOfDice());
    const [tenzies, setTenzies] = useState(false);
    useEffect(() => {
        console.log("dice state change");
        const value = dice[0].value;
        if (dice.every((die) => die.isHeld && die.value === value)) {
            setTenzies(true);
        }
        console.log(dice.every((die) => die.isHeld && die.value === value));
    }, [dice]);

    const rollDice = () => {
        if (tenzies) {
            setTenzies(false);
            setDice(getANewSetOfDice());
        } else {
            setDice((prevDice) =>
                prevDice.map((die) => (die.isHeld ? die : getNewDie()))
            );
        }
    };

    const hold = (id) =>
        setDice((prev) =>
            prev.map((die) =>
                die.id === id ? { ...die, isHeld: !die.isHeld } : die
            )
        );

    return (
        <div className="App">
            {tenzies && <ReactConfetti />}
            <main className="playground">
                <div className="tenz-container">
                    <div className="text">
                        <h2 className="title">Tenzies</h2>

                        {tenzies ? (
                            <h2 className="won" style={{ color: "red"}}>
                                Congradulations, you have won the game!!
                            </h2>
                        ) : (
                            <p className="brief">
                                Roll until all dice are the same. Click each die
                                to freeze it at its current value between rolls.
                            </p>
                        )}
                    </div>

                    <div className="dices">
                        {dice.map((die) => (
                            <Die key={die.id} die={die} hold={hold} />
                        ))}
                    </div>
                    <button className="roll-dice" onClick={rollDice}>
                        {tenzies ? "New Game" : "Roll"}
                    </button>
                </div>
            </main>
        </div>
    );
}

export default App;

// extra: css: put real dots on the dice
// track the number of rolls
// track the time it took to win
// save your best time to localstorage
