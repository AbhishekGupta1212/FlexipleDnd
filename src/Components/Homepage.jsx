import React, { useState } from 'react';
import Note from './Note';
import '../Styles/board.css'; // Import your board styles

const Board = () => {
  const [allNotes, setAllNotes] = useState([]);
  const [pinnedNotes, setPinnedNotes] = useState([]);
  const [idCounter, setIdCounter] = useState(1);

  const handleAddNote = () => {
    const newNote = {
      id: idCounter,
      text: 'New Note',
    };
    setIdCounter(idCounter + 1);
    setAllNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const handleDelete = (noteId) => {
    setAllNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    setPinnedNotes((prevPinnedNotes) =>
      prevPinnedNotes.filter((pinnedNote) => pinnedNote.id !== noteId)
    );
  };

  const handleEdit = (noteId, newText) => {
    setAllNotes((prevNotes) =>
      prevNotes.map((note) => (note.id === noteId ? { ...note, text: newText } : note))
    );
  };

  const handlePin = (noteId) => {
    const noteToPin = allNotes.find((note) => note.id === noteId);

    if (noteToPin) {
      const isPinned = pinnedNotes.some((pinnedNote) => pinnedNote.id === noteId);

      if (isPinned) {
        setPinnedNotes((prevPinnedNotes) =>
          prevPinnedNotes.filter((pinnedNote) => pinnedNote.id !== noteId)
        );
      } else {
        setPinnedNotes((prevPinnedNotes) => [...prevPinnedNotes, noteToPin]);
      }
    }
  };

  return (
    <>
      <div className="board-title">
        <strong>
          <i>Bulletin Board</i>
        </strong>
      </div>
      <div className="container">
        <button onClick={handleAddNote} className="add-btn">
          Add Note
        </button>
        {allNotes.map((note) => (
          <Note
            key={note.id}
            id={note.id}
            text={note.text}
            onDelete={() => handleDelete(note.id)}
            onEdit={(newText) => handleEdit(note.id, newText)}
            onPin={() => handlePin(note.id)}
            isPinned={pinnedNotes.some((pinnedNote) => pinnedNote.id === note.id)}
            pinnedNotes={pinnedNotes}
          />
        ))}
      </div>
    </>
  );
};

export default Board;
