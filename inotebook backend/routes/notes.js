const {Router} = require('express');
const fetchUser = require('../middlewares/fetchUSer');
const notes = require('../models/notes');

const router = Router();

//API for getting all notes of user
router.get("/getNotes", fetchUser, async (req, res)=>{
    const Notes = await notes.find({"createdBy" : req.user});
    res.status(200).json(Notes);
});

//API for adding note
router.post("/addNote", fetchUser, async (req, res)=>{
    const {title, description, tag} = req.body;
    if(!title || !description){
        return res.status(400).json({"Error" : "All fields are mandatory"});
    }
    const Note = await notes.create({title, description, tag, createdBy : req.user});
    res.status(201).json(Note);
});

//API for updating a note
router.put("/updateNote/:id", fetchUser, async (req, res)=>{
    const id = req.params.id;
    const {title, description, tag} = req.body;
    //Create a new object to store updated value
    const newNote = {};
    if(title) newNote.title = title;
    if(description) newNote.description = description;
    if(tag) newNote.tag = tag;
    //Find the note and update it
    let note = await notes.findById(id);
    if(!note) return res.status(404).send("Not found");
    //Check wheather user is updating his own note or other
    if(note.createdBy.toString() !== req.user) return res.status(401).send("Not allowed");
    note = await notes.findByIdAndUpdate(id, {$set : newNote}, {new : true});
    return res.status(200).json(note);
});

//API for deleting a note
router.delete("/deleteNote/:id", fetchUser, async (req, res)=>{
    const id = req.params.id;
    //Find the note to be deleted
    let note = await notes.findById(id);
    if(!note) return res.status(404).send("Not found");
    //Check wheather user is deleting his own note or other
    if(note.createdBy.toString() !== req.user) return res.status(401).send("NOt allowed");
    note = await notes.findByIdAndDelete(id);
    return res.status(200).json({"Message" : "Success", note});
});

module.exports = router;