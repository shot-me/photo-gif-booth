import React from 'react';

import BackspaceGreyImg from '../images/backspace_grey.png';
import BackspaceGreenImg from '../images/backspace_green.png';

export default class NumericKeyboard extends React.Component {
    constructor() {
        super();
        this.state = {
            backspaceImg: BackspaceGreyImg
        };
    }
    mouseOverBackspace() {
        this.setState({ backspaceImg: BackspaceGreenImg });
    }
    mouseOutBackspace() {
        this.setState({ backspaceImg: BackspaceGreyImg });
    }
    render() {
        const { onKeyboardClick } = this.props;
        return (
            <div className="numeric-keyboard">
                <div className="row">
                    <div onClick={() => onKeyboardClick(1)}>1</div>
                    <div onClick={() => onKeyboardClick(2)}>2</div>
                    <div onClick={() => onKeyboardClick(3)}>3</div>
                </div>
                <div className="row">
                    <div onClick={() => onKeyboardClick(4)}>4</div>
                    <div onClick={() => onKeyboardClick(5)}>5</div>
                    <div onClick={() => onKeyboardClick(6)}>6</div>
                </div>
                <div className="row">
                    <div onClick={() => onKeyboardClick(7)}>7</div>
                    <div onClick={() => onKeyboardClick(8)}>8</div>
                    <div onClick={() => onKeyboardClick(9)}>9</div>
                </div>
                <div className="row">
                    <div onClick={() => onKeyboardClick(10)}>✖</div>
                    <div onClick={() => onKeyboardClick(0)}>0</div>
                    <div onMouseOver={this.mouseOverBackspace.bind(this)} onMouseOut={this.mouseOutBackspace.bind(this)} onClick={() => onKeyboardClick(11)}>
                        <img src={this.state.backspaceImg} className="numeric-backspace" role="presentation" />
                    </div>
                </div>
            </div>);
    }
}
/* ➡ */