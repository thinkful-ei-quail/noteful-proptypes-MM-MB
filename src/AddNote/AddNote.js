import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ApiContext from '../ApiContext';
import config from '../config';
import CircleButton from '../CircleButton/CircleButton';

import './AddNote.css';

export default class AddNote extends Component {
  static contextType = ApiContext;

  constructor(props) {
    super(props);
    this.state = {
      name: { value: '', touched: false },
      content: { value: '', touched: false },
      folder: { value: '' }
    };
  }

  updateName = (name) => {
    this.setState({ name: { value: name, touched: true } });
  };

  updateContent = (content) => {
    this.setState({ content: { value: content, touched: true } });
  };

  updateFolder = (id) => {
    this.setState({ folder: { value: id, touched: true } });
  };

  renderFolderSelection = () => {
    return this.context.folders.map((folder) => {
      return (
        <option key={folder.id} value={folder.id}>
          {folder.name}
        </option>
      );
    });
  };

  validateName() {
    const { value, touched } = this.state.name;
    return typeof value === 'string' && value.length > 0 && touched;
  }

  validateFolder = () => {
    return this.state.folder.value;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, content, folder } = this.state;
    const newNote = JSON.stringify({
      name: name.value,
      content: content.value,
      folderId: folder.value,
      modified: new Date(Date.now())
    });
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: newNote
    };
    fetch(`${config.API_ENDPOINT}/notes`, options)
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then((res) => {
        res.id = res.id.toString();
        this.context.addNote(res);
        this.props.history.push('/');
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  renderAlt = () => {
    return (
      <>
        <h2>Please create a folder first</h2>
        <CircleButton
          tag={Link}
          to="/add-folder"
          type="button"
          className="NoteListNav__add-folder-button"
        >
          <FontAwesomeIcon icon="plus" />
          <br />
          Folder
        </CircleButton>
      </>
    );
  };

  renderForm = () => {
    return (
      <form className="add-note-form" onSubmit={(e) => this.handleSubmit(e)}>
        <h2>Add New Note</h2>
        <div className="add-note-inputs">
          <label htmlFor="name">Name: (required)</label>
          <input
            type="text"
            className="add-folder-name-input"
            name="name"
            id="name"
            onChange={(e) => this.updateName(e.target.value)}
          />
          {this.state.name.touched && !this.validateName() ? (
            <p>name is required</p>
          ) : null}
          <textarea
            onChange={(e) => this.updateContent(e.target.value)}
            id="content"
            aria-label="note content"
            placeholder="New Note (content optional)"
            rows="14"
          />
          <label htmlFor="folder">Folder: (required) </label>
          <select
            name="folder"
            onChange={(e) => this.updateFolder(e.target.value)}
          >
            <option value="">Choose</option>
            {this.renderFolderSelection()}
          </select>
          {this.state.folder.touched && !this.validateFolder() ? (
            <p>Folder is required</p>
          ) : null}
          <button
            disabled={!this.validateName() || !this.validateFolder()}
            type="submit"
            className="submit-new-folder"
          >
            Add
          </button>
        </div>
      </form>
    );
  };

  render() {
    return (
      <>
        {this.context.folders.length > 0 && this.renderForm()}
        {this.context.folders.length <= 0 && this.renderAlt()}
      </>
    );
  }
}

// export default withRouter(AddNote);