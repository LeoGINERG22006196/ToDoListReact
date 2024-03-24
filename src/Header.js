// Header.js

import React from "react";
import './App.css';

class Header extends React.Component {
    render() {
        return (
            <header>
                <h1>To Do List</h1>
                <label className="taskNumber">{this.props.tasksDone} task(s) done on {this.props.totalTasks}</label>
            </header>
        );
    }
}

export default Header;
