import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";
import Dropdown from "react-bootstrap/Dropdown";

class App extends Component {
  constructor(props) {
    super(props);

    // Setting up state
    this.state = {
      userInput: "",
      list: JSON.parse(localStorage.getItem("list")) || [],
      filter: "All",
    };
  }

  // Set a user input value
  updateInput(value) {
    this.setState({
      userInput: value,
    });
  }

  // Add item if user input is not empty
  addItem() {
    if (this.state.userInput !== "") {
      const userInput = {
        id: Math.random(),
        value: this.state.userInput,
        completed: false,
      };

      const list = [...this.state.list];
      list.push(userInput);

      localStorage.setItem("list", JSON.stringify(list));

      this.setState({
        list,
        userInput: "",
      });
    }
  }

  // Function to delete an item from the list using the id
  deleteItem(key) {
    const list = [...this.state.list];

    const updateList = list.filter((item) => item.id !== key);

    localStorage.setItem("list", JSON.stringify(updateList));

    this.setState({
      list: updateList,
    });
  }

  editItem = (index) => {
    const todos = [...this.state.list];
    const editedTodo = prompt('Edit the todo:');
    if (editedTodo !== null && editedTodo.trim() !== '') {
      let updatedTodos = [...todos];
      updatedTodos[index].value = editedTodo;

      localStorage.setItem("list", JSON.stringify(updatedTodos));

      this.setState({
        list: updatedTodos,
      });
    }
  }

  markAsCompleted = (index) => {
    const todos = [...this.state.list];
    todos[index].completed = !todos[index].completed;

    localStorage.setItem("list", JSON.stringify(todos));

    this.setState({
      list: todos,
    });
  }

  clearAll = () => {
    localStorage.removeItem("list");

    this.setState({
      list: [],
    });
  }

  setFilter = (filter) => {
    this.setState({ filter });
  }

  getFilteredItems = () => {
    const { list, filter } = this.state;
    if (filter === "All") return list;
    if (filter === "Completed") return list.filter(item => item.completed);
    if (filter === "Pending") return list.filter(item => !item.completed);
    return list;
  }

  render() {
    const filteredList = this.getFilteredItems();

    return (
      <>
        <header>
          <h1>TODO LIST</h1>
        </header>

        <Container className="container">
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Add item..."
                  size="lg"
                  value={this.state.userInput}
                  onChange={(item) => this.updateInput(item.target.value)}
                  aria-label="Add something"
                  aria-describedby="basic-addon2"
                  className="bg-light"
                />
                <InputGroup>
                  <Button
                    variant="dark"
                    className="mt-2"
                    onClick={() => this.addItem()}
                  >
                    ADD
                  </Button>
                </InputGroup>
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <ListGroup>
                {filteredList.map((item, index) => {
                  return (
                    <div key={index}>
                      <ListGroup.Item
                        variant="dark"
                        action
                        style={{
                          display: "flex",
                          justifyContent: 'space-between',
                          textDecoration: item.completed ? "line-through" : "none",
                        }}
                      >
                        {item.value}
                        <span>
                          <Button style={{ marginRight: "10px" }}
                            variant="light"
                            onClick={() => this.markAsCompleted(index)}>
                            {item.completed ? "Undo" : "Complete"}
                          </Button>
                          <Button style={{ marginRight: "10px" }}
                            variant="light"
                            onClick={() => this.deleteItem(item.id)}>
                            Delete
                          </Button>
                          <Button style={{ marginRight: "10px" }}
                            variant="light"
                            onClick={() => this.editItem(index)}>
                            Edit
                          </Button>
                        </span>
                      </ListGroup.Item>
                    </div>
                  );
                })}
              </ListGroup>
            </Col>
          </Row>

          <Row>
            <Col md={{ span: 6, offset: 3 }} className="text-center mt-3 footer-buttons">
              <Button variant="danger" onClick={this.clearAll}>Clear All</Button>
              <Dropdown className="ml-3">
                <Dropdown.Toggle variant="info" id="dropdown-basic">
                  Filter
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => this.setFilter("All")}>All</Dropdown.Item>
                  <Dropdown.Item onClick={() => this.setFilter("Completed")}>Completed</Dropdown.Item>
                  <Dropdown.Item onClick={() => this.setFilter("Pending")}>Pending</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>

          <footer>
            <p>Created by Isha</p>
          </footer>
        </Container>
      </>
    );
  }
}

export default App;
