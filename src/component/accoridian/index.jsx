import data from './data';
import { useState } from 'react';
import './style.css';

export default function Accordion() {
  const [selected, setSelected] = useState(null);
  const [enableMultiselector, setEnableMultiselector] = useState(false);
  const [multiple, setMultiple] = useState([]);
  const [buttonActive, setButtonActive] = useState(false);

  const handleSinglefunction = (getCurrentId) => {
    setSelected((prevSelected) => (prevSelected === getCurrentId ? null : getCurrentId));
  };

  const handleMultiplefunction = (getCurrentId) => {
    setMultiple((prevMultiple) => {
      const copyMultiple = [...prevMultiple];
      const indexOfCurrentId = copyMultiple.indexOf(getCurrentId);

      if (indexOfCurrentId === -1) {
        copyMultiple.push(getCurrentId);
      } else {
        copyMultiple.splice(indexOfCurrentId, 1);
      }

      return copyMultiple;
    });
  };

  const handleButtonClick = () => {
    setEnableMultiselector((prevEnableMultiselector) => !prevEnableMultiselector);
    setButtonActive(true);

    setTimeout(() => {
      setButtonActive(false);
    }, 1000); // Change the delay time as needed
  };

  return (
    <div className="wrapper">
      <h1>Single and Multiple Selection Modes</h1>
      <button
        onClick={handleButtonClick}
        className={buttonActive ? 'active' : ''}
      >
        Enable Multi Selection
      </button>
      <div className="accordion">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div key={dataItem.id} className="item">
              <div
                onClick={
                  enableMultiselector
                    ? () => handleMultiplefunction(dataItem.id)
                    : () => handleSinglefunction(dataItem.id)
                }
                className="title"
              >
                <h3>{dataItem.question}</h3>
                <span>+</span>
              </div>
              {enableMultiselector ? (
                multiple.indexOf(dataItem.id) !== -1 && (
                  <div className="content">{dataItem.answer}</div>
                )
              ) : (
                selected === dataItem.id && <div className="content">{dataItem.answer}</div>
              )}
            </div>
          ))
        ) : (
          <div>No data found</div>
        )}
      </div>
    </div>
  );
}
