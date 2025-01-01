const express = require('express');
const connectDb = require('./connection');
const cors = require('cors');
const authRouter = require('./routes/auth');
const notesRouter = require('./routes/notes');

const app = express();
const PORT = 8000;

connectDb();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/notes', notesRouter);

app.listen(PORT, ()=>{ 
    console.log(`Server Started on ${PORT}`)
});