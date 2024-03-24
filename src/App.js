import React from "react";
import './App.css';
import Header from './Header';
import Footer from './Footer';

class TodoApp extends React.Component {
  openModal = () => this.setState({open: true});
  closeModal = () => this.setState({open: false});
  constructor(props) {
    super(props)
    this.state = {
      items: [
        { text: "Learn JavaScript", done: false },
        { text: "Learn React", done: false },
        { text: "Play around in JSFiddle", done: true },
        { text: "Build something awesome", done: true }
      ],
      inputTask: "Une tâche",
      searchTerm: "",
      open: false
    }
    this.addTask = this.addTask.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  render() {
    const filteredItems = this.state.items.filter(item =>
        item.text.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    );
    return (
        <div className="container">
          <Header
              tasksDone={this.state.items.filter(item => item.done === true).length}
              totalTasks={this.state.items.length}
          />
          <div className="taskList">
            {filteredItems.map((item, index) => (
                <li key={index}>
                  <input className="checkBox" type="checkbox" readOnly checked={item.done}
                         onChange={() => this.checkATask(index)}/>
                  <span className={item.done ? "done" : ""}>{item.text}</span>
                  <div className="orderDiv">
                    <button className="order up" onClick={() => this.moveItemUp(index)}>↑</button>
                    <button className="order down" onClick={() => this.moveItemDown(index)}>↓</button>
                    <button className="delete" onClick={() => this.deleteATask(index)}>Delete</button>
                  </div>
                </li>
            ))}
          </div>
          <Footer
              searchTerm={this.state.searchTerm}
              handleSearchChange={this.handleSearchChange}
              handleInputChange={this.handleInputChange}
              addTask={this.addTask}
              open={this.state.open}
              openModal={this.openModal}
              closeModal={this.closeModal}
          />
        </div>
    )
  }

  ///////////////////////////////////////////////////////////////
  //////////////////////////COMPONENT////////////////////////////
  ///////////////////////////////////////////////////////////////

  componentDidMount() {
    const storedItems = localStorage.getItem("todoItems");
    if (storedItems) {
      this.setState({ items: JSON.parse(storedItems) });
    }
  }
  componentDidUpdate() {
    localStorage.setItem("todoItems", JSON.stringify(this.state.items));
  }

  ///////////////////////////////////////////////////////////////
  ////////////////////////////Task///////////////////////////////
  ///////////////////////////////////////////////////////////////

  checkATask = (index) => {
    const { items } = this.state;
    // Création d'une copie de la liste d'items
    const updatedItems = items.slice();
    // Inversion de l'état de la propriété "done" de l'élément à l'index spécifié
    updatedItems[index] = { ...updatedItems[index], done: !updatedItems[index].done };
    // Mise à jour de l'état avec la nouvelle liste d'items
    this.setState({ items: updatedItems });
  }
  deleteATask = (index) => {
    if (window.confirm("Are you sure to delete this task ?")) {
      const { items } = this.state;
      // Création d'une nouvelle liste d'items en excluant l'élément à l'index spécifié
      const updatedItems = items.filter((_, i) => i !== index);
      // Mise à jour de l'état avec la nouvelle liste d'items
      this.setState({ items: updatedItems });
    }
  }
  addTask() {
    this.setState(previousState => ({
      items : [...previousState.items,{text : this.state.inputTask, done:false}]
    }));
  }

  ///////////////////////////////////////////////////////////////
  //////////////////////////MOVE ITEM////////////////////////////
  ///////////////////////////////////////////////////////////////

  moveItemUp = (index) => {
    if (index > 0) {
      const { items } = this.state;
      // Création d'une copie de la liste d'items
      const newItems = items.slice();
      // Échange des éléments à l'index actuel et à l'index précédent
      [newItems[index], newItems[index - 1]] = [newItems[index - 1], newItems[index]];
      // Mise à jour de l'état avec la nouvelle liste d'items
      this.setState({ items: newItems });
    }
  }
  moveItemDown = (index) => {
    const { items } = this.state;
    if (index < items.length - 1) {
      // Création d'une copie de la liste d'items
      const newItems = items.slice();
      // Échange des éléments à l'index actuel et à l'index suivant
      [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
      // Mise à jour de l'état avec la nouvelle liste d'items
      this.setState({ items: newItems });
    }
  }

  ///////////////////////////////////////////////////////////////
  //////////////////////////HANDLE///////////////////////////////
  ///////////////////////////////////////////////////////////////

  handleSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }
  handleInputChange(event) {
    this.setState({inputTask: event.target.value});
  }
}

export default TodoApp;


