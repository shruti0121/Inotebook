import React, { useContext } from 'react';
import noteContext from '../context/NoteContext';

const NoteItem = (props) => {

    const {element, updateNote} = props;
    const context = useContext(noteContext);
    const {deleteNote} = context;

  return (
    <div className='col-md-3'>
        <div className='card my-3'>
            <div className='card-body'>
                <h5 className='card-title'>{element.title}</h5>
                <p className='card-text'>{element.description}</p>
                <i className="fa-regular fa-trash-can ml-3" onClick={()=>{deleteNote(element._id); props.showAlert("Deleted Successfully","success");}}></i>
                <i className="fa-regular fa-pen-to-square mx-3" onClick={()=>{updateNote(element)}}></i>
            </div>
        </div>
    </div>
  )
}

export default NoteItem