const express = require('express');
const path = require('path');
const fs = require('fs');
// pick another npm package to give unique ids to notes

const notesData = require('./db/db.json');

//do i need the port set up?
const PORT = process.env.PORT || 3001;
const app = express();

// set up express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//returns notes.html file
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

//returns index.html file
app.get('*', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

// GET Route for homepage
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './notes/index.html')));


//ask tutor about slice
//reads db.json and return all notes as JSON
app.get('/api/notes', (req, res) => {
	res.json(notesData.slice(1))
	});

//need app.post '/api/notes'
app.post('/api/notes', (req, res) => {
	const newNote = createNewNote(req.body, notesData);
	res.json(newNote);
})

	// not finsished
app.delete('/api/notes/:id', (req, res) => {
	console.log(req.body);
	fs.readFile('.db/db.json')
});
// param with id of note to delete
// need filter to run thru notes and find ones with given id property
// remove specified id property
// rewrite the notes to the db.json file




app.listen(PORT, () => console.log(`App listening on port ${PORT}`));