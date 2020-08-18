import React from 'react';
import Note from '../Note/Note';
import ApiContext from '../ApiContext';
import { findNote } from '../notes-helpers';
import PropTypes from 'prop-types';
import './NotePageMain.css';

export default class NotePageMain extends React.Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object.isRequired
    }).isRequired
  };

  static contextType = ApiContext;

  handleDeleteNote = (noteId) => {
    this.props.history.push(`/`);
  };

  render() {
    const { notes = [] } = this.context;
    let { noteId } = this.props.match.params;
    const note = findNote(notes, noteId) || { content: '' };
    return (
      <section className="NotePageMain">
        <Note
          id={note.id}
          name={note.name}
          modified={note.modified}
          onDeleteNote={this.handleDeleteNote}
        />
        <div className="NotePageMain__content">
          {note.content.split(/\n \r|\n/).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>
    );
  }
}