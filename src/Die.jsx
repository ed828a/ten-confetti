import React from "react";

const Die = ({ die, hold }) => {
    const { value, isHeld, id } = die
    return (
        <div
            className="die"
            style={
                isHeld
                    ? { backgroundColor: "#59e391", color: "white" }
                    : { backgroundColor: "#f5f5f5", color: "black" }
            }
            onClick={() => hold(id)}
        >
            <h2>{value}</h2>
        </div>
    );
};

export default Die;
