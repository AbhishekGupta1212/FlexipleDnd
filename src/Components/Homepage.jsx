import React, { useState,useEffect} from 'react';
import Note from './Note';
import {
  Box,

} from "@chakra-ui/react";
import '../Styles/board.css'; 

const Board = () => {
  const [notes, setNotes] = useState([]);
  
  const [draggedNote, setDraggedNote] = useState(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

 

  useEffect(() => {
    const availableNotes = localStorage.getItem("notes");
    availableNotes ? setNotes(JSON.parse(availableNotes)) : setNotes([]);
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNotes = () => {
    let x = Math.floor(Math.random() * 50) + 1;
    let y = Math.floor(Math.random() * 50) + 1;
    const newNotes = [
      ...notes,
      {
        text: "New Note",
        x: x * 10,
        y: y * 10,
        pinned: false,
        id: Math.floor(Math.random() * 500) + 1
      },
    ];
    localStorage.setItem("notes", JSON.stringify(newNotes));
    setNotes(newNotes);
  };

  const handleMouseDown = (e, id, pinned) => {
    if (pinned) {
      return;
    } else {
      setDraggedNote(id);
      setDragStart({
        x: e.clientX,
        y: e.clientY,
      });
    }
  };

  const handleMouseMove = (e) => {
   
    if (draggedNote !== null) {
      const x = e.clientX - dragStart.x;
      const y = e.clientY - dragStart.y;

      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === draggedNote
            ? { ...note, x: note.x + x, y: note.y + y }
            : note
        )
      );

      setDragStart({
        x: e.clientX,
        y: e.clientY,
      });
    }
  };

  const handleMouseUp = () => {
    
    setDraggedNote(null);
    setDragStart({ x: 0, y: 0 });
  };


 

  const handlePin = (id) => {
    let pinNote = notes.map((ele) =>
      ele.id === id ? { ...ele, pinned: !ele.pinned } : ele
    );
    setNotes(pinNote);
  };
const removeNotes = (ind) => {
  const updatedNotes = [...notes];
  updatedNotes.splice(ind, 1);
  localStorage.setItem("notes", JSON.stringify(updatedNotes));
  setNotes(updatedNotes);
};
const updateNotes = (ind, newText) => {
  console.log(ind, newText);
  const updatedNotes = [...notes];
  updatedNotes[ind].text = newText;
  localStorage.setItem("notes", JSON.stringify(updatedNotes));
  setNotes(updatedNotes);
};

  return (
    <>
   
      <Box w="100%" h="100vh" position="relative" bg="#ffffff" overflow="auto">
         <h2>Bulletin Board</h2>
        <button className="addButton" onClick={addNotes}>
          Add Note
        </button>

        {notes?.map((ele, ind) => (
          <Box
            key={ind}
            onMouseDown={(e) => handleMouseDown(e, ele.id, ele.pinned)}
            onMouseMove={(e) => handleMouseMove(e)}
            onMouseUp={handleMouseUp}
            position="absolute"
            zIndex={ele.pinned ? 1000 + ind : ind}
            left={ele.x + "px"}
            top={ele.y + "px"}
            cursor="move"
            w="230px"
            p="15px 8px 7px 15px"
            height="auto"
            bg="#e4e24a"
           boxShadow={" rgba(0, 0, 0, 0.35) 0px 5px 15px"}
            draggable={ele.pinned}
          >
            
            <Note
              note={ele}
              removeNotes={removeNotes}
              pinNote={handlePin}
              ind={ind}
              updateNotes={updateNotes}
            />
          </Box>
        ))}
      </Box>
    </>
  );
};

export default Board;
