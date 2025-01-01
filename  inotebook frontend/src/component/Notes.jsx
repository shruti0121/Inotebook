import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {

    const context = useContext(noteContext);
    const {notes, getNotes, editNote} = context;
    const [note, setNote] = useState({title:"",description:"",tag:""});
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("token")){
            getNotes();
        }
        else{
            navigate('/login');
        }
    }, [])

    const buttonRef = useRef(null);
    const closeButtonRef = useRef(null);

    const updateNote = (currentNote)=>{
        buttonRef.current.click();
        setNote({id : currentNote._id, title : currentNote.title, description : currentNote.description, tag : currentNote.tag});
    }

    const handleClick = (e)=>{
        e.preventDefault();
        editNote(note.id, note.title, note.description, note.tag);
        closeButtonRef.current.click();
        setNote({title:"",description:"",tag:""});
        props.showAlert("Updated Successfully","success");
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name] : e.target.value});
    }

  return (
    <>
        <AddNote showAlert={props.showAlert} />
        <button type="button" ref={buttonRef} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form className='my-3'>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" className="form-control" name='title' id="title" value={note.title} onChange={onChange} aria-describedby="emailHelp"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label> 
                                <input type="text" className="form-control" name='description' onChange={onChange} value={note.description} id="description"/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="tag" className="form-label">Tag</label> 
                                <input type="text" className="form-control" name='tag' onChange={onChange} value={note.tag} id="tag"/>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button ref={closeButtonRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button disabled={note.title.length < 5 || note.description.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                    </div>
                </div>
            </div>
        </div>
        <div className='row my-3'>
            <h2>Your Notes</h2>
            <div className='container mx-2'>
                {notes.length === 0 && "No notes to display"}
            </div>
            {
                notes.map((element)=>{
                    return <NoteItem key={element._id} updateNote={updateNote} showAlert={props.showAlert} element={element}/>
                })
            }
        </div>
     </>
  )
}

export default Notes