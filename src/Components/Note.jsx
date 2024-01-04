import React, { useRef, useState, useEffect } from 'react';
import '../Styles/note.css';

const Note = ({ id, text, onDelete, onEdit, onPin, isPinned }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [noteText, setNoteText] = useState(text);
  const [isMoving, setIsMoving] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const stickyNoteRef = useRef();

  const handleDelete = () => {
    onDelete(id);
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onEdit(id, noteText);
  };

  const handlePin = () => {
    onPin(id);
  };

  const handleMouseDown = (e) => {
    setIsMoving(true);
    const dimensions = stickyNoteRef.current.getBoundingClientRect();
    setOffset({
      x: e.clientX - dimensions.left,
      y: e.clientY - dimensions.top,
    });
  };

  const handleMouseMove = (e) => {
    if (isMoving) {
      const x_axis = e.clientX - offset.x;
      const y_axis = e.clientY - offset.y;

      stickyNoteRef.current.style.left = x_axis + 'px';
      stickyNoteRef.current.style.top = y_axis + 'px';
    }
  };

  const handleMouseUp = () => {
    setIsMoving(false);
  };

  useEffect(() => {
    const x_axis = Math.random() * window.innerWidth * 0.7;
    const y_axis = Math.random() * window.innerHeight * 0.7;

    setPosition({ x: x_axis, y: y_axis });

    stickyNoteRef.current.style.left = x_axis + 'px';
    stickyNoteRef.current.style.top = y_axis + 'px';
  }, [id]);

  return (
    <div
      className={`note ${isPinned ? 'pinned' : ''}`}
      ref={stickyNoteRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ position: 'absolute', top: position?.y || 0, left: position?.x || 0 }}
    >
      {isEditing ? (
        <textarea
          className="note-textarea"
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          onBlur={handleBlur}
          autoFocus
          cols="30"
          rows="10"
        />
      ) : (
        <div onDoubleClick={handleDoubleClick} className="note-container">
          <div className="button-container">
            <button onClick={handlePin} style={{ fontSize: '15px' }}>
              {isPinned ? 'Unpin' : 'Pin'}
            </button>
            <span>Text {id}</span>
            <button onClick={handleDelete} className="clear">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="20">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>
          </div>
          <div className="text">{text}</div>
        </div>
      )}
    </div>
  );
};

export default Note;
