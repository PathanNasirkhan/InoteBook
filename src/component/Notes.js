import React, { useContext, useEffect, useRef ,useState} from 'react'
import notecontext from '../context/notes/notecontext'
import Noteitem from './Noteitem';
import AddNote from './AddNote';

function Notes() {
    const context = useContext(notecontext);
    const { notes, getNotes , editNote} = context;
    useEffect(() => {
        getNotes();
        // eslint-disable-next-line
    }, []);

    const [note , setNote] = useState({id:"", etitle:"", edescription:"", etag:""})

    const updateNote = (CurrentNote) => {
        ref.current.click();
          setNote({id:CurrentNote._id, etitle:CurrentNote.title ,edescription:CurrentNote.description, etag:CurrentNote.tag});
    }
    const ref = useRef(null);
    const refclose = useRef(null);

    const handleClick = (e) =>{
        editNote(note.id , note.etitle, note.edescription, note.etag);
        refclose.current.click();
        e.preventDefault();
      }
  
      const onChange = (e)=>{
          setNote({...note,[e.target.name]:e.target.value});
      }
    return (
        <>
            <AddNote />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle}  onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} minLength={5} required/>
                                </div>

                                
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleClick} type="button" className="btn btn-primary">Update</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3'>
                <h2>Your Note</h2>
                <div className='container mx-2'>
                {notes.length === 0 && "You have no notes"}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} />;
                })}
            </div>
        </>
    )
}

export default Notes