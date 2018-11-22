import React from "react";

export default class ShotMeNumericKeyboard extends React.Component {
  render() {
    const { onClickHandler } = this.props;
    return (
      <div className="shot-me-num-keyboard">
        <div className="shot-me-num-keyboard-row">
          <div onClick={() => onClickHandler(1)}>1</div>
          <div onClick={() => onClickHandler(2)}>2</div>
          <div onClick={() => onClickHandler(3)}>3</div>
        </div>
        <div className="shot-me-num-keyboard-row">
          <div onClick={() => onClickHandler(4)}>4</div>
          <div onClick={() => onClickHandler(5)}>5</div>
          <div onClick={() => onClickHandler(6)}>6</div>
        </div >
        <div className="shot-me-num-keyboard-row">
          <div onClick={() => onClickHandler(7)}>7</div>
          <div onClick={() => onClickHandler(8)}>8</div>
          <div onClick={() => onClickHandler(9)}>9</div>
        </div >
        <div className="shot-me-num-keyboard-row">
          <div onClick={() => onClickHandler(0)}>0</div>
          <div
            className="shot-me-num-keyboard-backspace"
            onClick={() => onClickHandler("backspace")}
          >
            delete
          </div>
        </div >
      </div >
    );
  }
}
