import React, { useState } from "react";
import Select from "react-select";

export default function App() {
  // React state to manage selected options
  const [selectedOptions, setSelectedOptions] = useState();

  // Array of all options
  const optionList = [
    { value: "red", a: "Red", label:"a"},
    { value: "green", a: "Green" },
    { value: "yellow", a: "Yellow" },
    { value: "blue", a: "Blue" },
    { value: "white", a: "White" }
  ];

  // Function triggered on selection
  function handleSelect(data) {
    setSelectedOptions(data);
    console.log(data);
  }
  return (
    <div className="app">
      <h2>Choose your color</h2>
      <div className="dropdown-container">
        <Select
          options={optionList}
          placeholder="Select color"
          value={selectedOptions}
          onChange={handleSelect}
          isSearchable={true}
          isMulti
        />
      </div>
    </div>
  );
}