import { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props)=>{
    
    const [notes, setNotes] = useState([]);

    const getNotes = async()=>{
        const response = await fetch('http://localhost:8000/api/notes/getNotes',{
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            }
        });
        const json = await response.json();
        setNotes(json);
    }

    //Add a note
    const addNote = async (title, description, tag)=>{

        const response = await fetch('http://localhost:8000/api/notes/addNote',{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify({title, description, tag})
        });
        const note = await response.json();
        setNotes(notes.concat(note));
    }

    //Update a note
    const editNote = async(id, title, description, tag)=>{

        const response = await fetch(`http://localhost:8000/api/notes/updateNote/${id}`,{
            method:'PUT',
            headers:{
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify({title, description, tag})
        });

        const json = response.json();

        let newNotes = JSON.parse(JSON.stringify(notes));

        for (let index = 0; index < notes.length; index++) {
            if(newNotes[index]._id === id){
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes)
    }

    //Delete a note
    const deleteNote = async(id)=>{

        const response = await fetch(`http://localhost:8000/api/notes/deleteNote/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem("token")
            }
        });

        const json = response.json();
        const newNotes = notes.filter((note)=>{return note._id !== id});
        setNotes(newNotes);
    }
    
    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote, getNotes, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;