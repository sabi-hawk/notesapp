const Note = require("../models/note");
const User = require("../models/user");
const { authenticateRequest } = require("./usersController");

const fetchNotes = async (req, res) => {
  try {
    const data = await authenticateRequest(req, res);
    // checking if the user exists
    const user = await User.findOne({ _id: data.userId });
    if (!user) {
      return res.status(401).json({ message: "Unauthorized User Access" });
    }
    // Find the notes
    const notes = await Note.find({ userId: data.userId });

    // Respond with them
    res.json({ notes });
  } catch (error) {
    console.log("Error | controller | Notes | fetchNotes | catch", error);
    return res
      .status(error?.status || 500)
      .json({ error: error?.error || "Something went wrong" });
  }
};

const fetchNote = async (req, res) => {
  try {
    const data = await authenticateRequest(req, res);

    // checking if the user exists
    const user = await User.findOne({ _id: data.userId });
    if (!user) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }
    // Get id off the url
    const noteId = req.params.id;

    // Find the note using that id
    const note = await Note.findById(noteId);

    if (note) {
      // Respond with the note
      return res.json({ note });
    }

    res.status(404).json({ message: "Note Doesn't Exists!" });
  } catch (error) {
    console.log("Error | controller | Notes | fetchNote | catch", error);
    return res
      .status(error?.status || 500)
      .json({ error: error?.error || "Something went wrong" });
  }
};

const createNote = async (req, res) => {
  try {
    const data = await authenticateRequest(req, res);
    // Get the sent in data off request body
    const { title, body } = req.body;
    console.log("Decoded", data);
    const user = await User.findOne({ _id: data.userId });
    if (!user) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }

    // Create a note with it
    const note = await Note.create({
      userId: user._id,
      title: title,
      body: body,
    });

    // respond with the new note
    res.json({ note });
  } catch (error) {
    console.log("Error | controller | Notes | createNote | catch", error);
    return res
      .status(error?.status || 500)
      .json({ error: error?.error || "Something went wrong" });
  }
};

const updateNote = async (req, res) => {
  try {
    const data = await authenticateRequest(req, res);

    // checking if the user exists
    const user = await User.findOne({ _id: data.userId });
    if (!user) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }

    // Get the id off the url
    const noteId = req.params.id;

    // Get the data off the req body
    const { title, body } = req.body;

    const note = Note.findOne({ _id: noteId });
    if (note) {
      // Find and update the record
      await Note.findByIdAndUpdate(noteId, {
        title,
        body,
      });
      // Find updated note
      const updatedNote = await Note.findById(noteId);

      // Respond with it
      return res.json({ updatedNote });
    }
    res.status(404).json({ message: "Note Doesn't Exists!" });
  } catch (error) {
    console.log("Error | controller | Notes | updateNote | catch", error);
    return res
      .status(error?.status || 500)
      .json({ error: error?.error || "Something went wrong" });
  }
};

const deleteNote = async (req, res) => {
  try {
    const data = await authenticateRequest(req, res);

    // checking if the user exists
    const user = await User.findOne({ _id: data.userId });
    if (!user) {
      return res.status(401).json({ message: "Unauthorized Access" });
    }
    // get id off url
    const noteId = req.params.id;

    const note = Note.findOne({ _id: noteId });
    if (note) {
      // Delete the record
      await Note.deleteOne({ _id: noteId });
      // Respond
      return res.json({ success: "Note deleted" });
    }

    res.status(404).json({ message: "Note Doesn't Exists!" });
  } catch (error) {
    console.log("Error | controller | Notes | deleteNote | catch", error);
    return res
      .status(error?.status || 500)
      .json({ error: error?.error || "Something went wrong" });
  }
};

module.exports = {
  fetchNotes,
  fetchNote,
  createNote,
  updateNote,
  deleteNote,
};
