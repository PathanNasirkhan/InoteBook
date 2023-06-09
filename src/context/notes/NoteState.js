import { useState } from "react";
import notecontext from "./notecontext";
// import { json } from "react-router-dom";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesinitial = []
  const [notes, setNotes] = useState(notesinitial);


  //Get all Notes
  const getNotes = async() => {
    // API CALL
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": 'application/json',
        "auth-token": localStorage.getItem('token')
      },
    });
    const json =await response.json();
    setNotes(json);
  }

  //Add a Note
  const addNote = async(title, description, tag) => {
    // API CALL
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json();
    setNotes(notes.concat(note))
  }

  // Dlete a Note
  const deleteNote = async(id) => {
    // To do Api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": 'application/json',
        "auth-token": localStorage.getItem('token')
      },
    });
    // const json = response.json();
    // console.log(json);

    const newNote = notes.filter((note) => { return note._id !== id });
    setNotes(newNote);
  }

  // Edit a NOte
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();

    let newNote = JSON.parse(JSON.stringify(notes));
    // Logic to edit in client
    for (let i = 0; i < newNote.length; i++) {
      const element = newNote[i];
      if (element._id === id) {
        newNote[i].title = title;
        newNote[i].description = description;
        newNote[i].tag = tag

        break;
      }
    
    }
    setNotes(newNote);
  }

  return (
    <notecontext.Provider value={{ notes, addNote, deleteNote, editNote ,getNotes}}>
      {props.children}
    </notecontext.Provider>
  );
}


export default NoteState;