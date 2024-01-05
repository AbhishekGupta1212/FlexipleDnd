import React, {useState} from 'react';
import '../Styles/note.css';

const Note = ({
  note,
  ind,
  removeNotes,
  updateNotes,
  pinNote,

}) => {
  const [isEditing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(note.text);

  const handleEdit = () => {
    if (!isEditing) {
      setEditing(true);
      setEditedText(note.text);
    }
  };

  const handleSave = (ind, editedText) => {
    setEditing(false);

    updateNotes(ind, editedText);
  };

  const handleInputChange = (e) => {
    setEditedText(e.target.value);
  };

  return (
    <>
      <div className="note-header">
        <button className="xbutton" onClick={() => removeNotes(ind)}>
          x
        </button>
        <button className="rainbow1 rainbow-1" onClick={() => pinNote(note.id)}>
          {note.pinned ? ( 
           "Unpin note"
          ) : (
           "Pin note"
          )}
        </button>
      </div>
      <div className="note-content" onClick={handleEdit}>
        {isEditing ? (
          <textarea
            type="text"
            value={editedText}
            onChange={handleInputChange}
            onBlur={() => handleSave(ind, editedText)}
            autoFocus
          />
        ) : (
          <span>{note.text}</span>
        )}
      </div>
      <button className="edit" onClick={handleEdit}>
        Edit
      </button>
    </>
  );
};

export default Note;
