/*Create a new component AddFolder that implements a form to capture the name
 of a new folder from the user. This form should submit the name of the new 
 folder to the POST /folders endpoint on the server. Ensure that any errors 
 are properly handled. Add a button to the navigation to invoke the new form. */


import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';
import ApiContext from '../ApiContext';
import config from '../config';

import './AddFolder.css';

export default class AddFolder extends Component {
  static defaultProps = {
    history: {
      push: () => {}
    },
  }
  static contextType = ApiContext;

  constructor(props) {
    super(props);
    this.state = {
      name: { value: '', touched: false }
    };
  }

  updateName(name) {
    this.setState({ name: { value: name, touched: true } });
  }

  validateName() {
    const { value, touched } = this.state.name;
    const { folders } = this.context;
    return (
      typeof value === 'string' &&
      value.length > 0 &&
      touched &&
      !folders.find(
        (folder) =>
          folder.name && folder.name.toLowerCase() === value.toLowerCase()
      )
    );
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const newFolder = JSON.stringify({ name: this.state.name.value });
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: newFolder
    };
    fetch(`${config.API_ENDPOINT}/folders`, options)
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then((res) => {
        this.context.addFolder(res);
        this.props.history.push('/');
      })
      .catch((error) => {
        console.error({ error });
      });
  }

  render() {
    return (
      <form className="add-folder-form" onSubmit={(e) => this.handleSubmit(e)}>
        <h2>Add New Folder</h2>
        <div className="add-folder-inputs">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="add-folder-name-input"
            name="name"
            id="name"
            onChange={(e) => this.updateName(e.target.value)}
          />
          <button
            disabled={!this.validateName()}
            type="submit"
            className="submit-new-folder"
          >
            Add
          </button>
        </div>
      </form>
    );
  }
}

// export default withRouter(AddFolder);