import React from "react";

export default class ShotMeLoader extends React.Component {
    render() {
        return (<div className="loader">
            <div className="spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        );
    }
}