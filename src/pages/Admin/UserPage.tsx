import React, { useState } from "react";

const UserPage = () => {
  const [inputValues, setInputValues] = useState({});
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    setCounter(counter + 1);
    console.log(counter);
  };

  const handleOnChange = (e) => {
    const abc = {};
    abc[e.target.className] = e.target.value;
    setInputValues({ ...inputValues, ...abc });
  };

  return (
    <div className="App">
      <button className="bg-red-200" onClick={handleClick}>
        Hello
      </button>

      {Object.keys(inputValues).map((c) => {
        return <p>{inputValues[c]}</p>;
      })}

      {Array.from(Array(counter)).map((c, index) => {
        return (
          <input
            onChange={handleOnChange}
            key={c}
            className={`${index} bg-slate-200`}
            type="text"
          ></input>
        );
      })}
    </div>
  );
};

export default UserPage;
