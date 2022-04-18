import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import {db} from "./firebase-config"
import {addDoc, collection, deleteDoc, doc, getDocs} from "firebase/firestore"

function App() {
  const [notes, setNotes] = useState([]);
  // I need a way to keep track of the state of the button (whether it was clicked or not)
  // If it is clicked, I need to fetch data from the db
  const [clicked, setClicked] = useState(false)
  const collectionRef = collection(db, "tasks")
  
  useEffect((collectionRef) => {
    const getTasks = async ()=>{
      const data = await getDocs(collectionRef);
      // For every doc in the collection, I'm going to return a js object containing the data in the doc
      setNotes(data.docs.map((doc)=>({...doc.data(), id : doc.id})))
    };
    getTasks();
    setClicked(false)
  }, [clicked])
  

  const addNote = async (newNote) => {
    setClicked(true);
    await addDoc(collectionRef, newNote);
  }

  const deleteNote = async (id) => {
    // Since we are doing an action specfic to a specfic document, we need to be able to identify that doc
    const taskRef = doc(db, "tasks", id)
    setClicked(true);
    await deleteDoc(taskRef);
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {/* The notes variable contains an array of js objects */}
      {notes.map((note) => {
        return (
          <Note
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
