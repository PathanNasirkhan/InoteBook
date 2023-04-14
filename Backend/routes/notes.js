const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// Route 1 .Get all the notes using :get "api/notes/fetchallnotes" .  login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {

      //always wrap in try and catch for error handeling
      try {
            const note = await Note.find({ user: req.user.id });
            res.json(note);
      } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
      }
});

// Route 2 .Add a new note using :Post "api/notes/addnote" .  login required

router.post('/addnote', fetchuser, [

      // validation for title and description for no allow blank description

      body('title', 'Enter a Valid title').isLength({ min: 3 }),
      body('description', 'Enter description atleast 5 character').isLength({ min: 5 }),
], async (req, res) => {
      try {
            // using destructuring for use of title,description and tag from re.body

            const { title, description, tag } = req.body;
            // if there are errors , return bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                  return res.status(400).json({ errors: errors.array() });
            }

            const note = new Note({
                  title, description, tag, user: req.user.id
            });
            const saveNote = await note.save();

            res.json(saveNote)
      } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
      }
});

// Route 3 .Update the note using :Put "api/notes/updatenote" .  login required

router.put('/updatenote/:id', fetchuser,
      async (req, res) => {
            try {
                  const { title, description, tag } = req.body;
                  //Create a newNote object

                  const newNote = {};
                  if (title) { newNote.title = title };
                  if (description) { newNote.description = description };
                  if (tag) { newNote.tag = tag };

                  //Find the note to be updated and update it
                  let note = await Note.findById(req.params.id);
                  if (!note) {
                        return res.status(404).send("Not Found");
                  }

                  if (note.user.toString() !== req.user.id) {
                        return res.status(401).send("Not Allowed");
                  }
                  note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
                  res.json({ note });
            } catch (error) {
                  console.error(error.message);
                  res.status(500).send("Internal Server Error");
            }
      });


// Route 4 .Delete the note using :Delete "api/notes/deletenote" .  login required

router.delete('/deletenote/:id', fetchuser,
      async (req, res) => {
            try {
                  //Find the note to be deleted and delete it
                  let note = await Note.findById(req.params.id);
                  if (!note) {
                        return res.status(404).send("Not Found");
                  }
                  //Allow deletetion if user owns this note
                  if (note.user.toString() !== req.user.id) {
                        return res.status(401).send("Not Allowed");
                  }
                  note = await Note.findByIdAndDelete(req.params.id);
                  res.json({ "Success": "Note has been Deleted", note });
            } catch (error) {
                  console.error(error.message);
                  res.status(500).send("Internal Server Error");
            }
      });

module.exports = router