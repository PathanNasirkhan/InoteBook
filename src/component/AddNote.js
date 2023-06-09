import React ,{useContext, useState} from 'react'
import notecontext from '../context/notes/notecontext'
function AddNote() {
    const context = useContext(notecontext);
    const {addNote} = context;
     const [note , setNote] = useState({title:"", description:"", tag:""})
    const handleClick = (e) =>{
      e.preventDefault();
      addNote(note.title,note.description);
      setNote({title:"", description:"", tag:""});
    }

    const onChange = (e)=>{
        setNote({...note,[e.target.name]:e.target.value});
    }
  return (
    <div className='container my-3 '>
    <h2>Add Note</h2>
    <form className='my-3'>
    <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name='title'  onChange={onChange} minLength={5}  value={note.title} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="description" name='description' onChange={onChange} value={note.description} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} value={note.tag} />
  </div>
  
  <button disabled={note.title.length < 5 || note.description.length < 5 } type="button" className="btn btn-primary" onClick={handleClick}>Add Note</button>
</form>
    </div>
  )
}

export default AddNote