import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../flux/reducers/auth";
import { useNavigate } from "react-router-dom";
import Note from "../components/Note";
import { createNote, deleteNote, fetchNotes, updateNote } from "../api/notes";
import { setUserNotes } from "../flux/reducers/notes";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const { notes } = useSelector((state) => state);
  const [currentNote, setCurrentNote] = useState(null);
  const [addNote, setAddNote] = useState(false);
  const [detectChange, setDetectChange] = useState(false);
  const [openNote, setOpenNote] = useState(true);
  const [currentNotes, setCurrentNotes] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getNotes = async () => {
      const response = await fetchNotes();
      setCurrentNotes(response.data.notes);
      dispatch(setUserNotes(response.data.notes));
    };
    getNotes();
  }, []);

  useEffect(() => {}, [notes]);
  const handleLogout = () => {
    dispatch(setUser({}));
    dispatch(setUserNotes({}));
    navigate("/");
    toast.success("Logged out successfully!", {
      autoClose: 3000,
    });
  };

  const handleCreateNote = async (e) => {
    e.preventDefault();
    try {
      setIsLoadingSave(true);
      const response = await createNote(currentNote);
      if (response.status === 200) {
        toast.success("Note added successfully!", {
          autoClose: 3000,
        });
      }
      setIsLoadingSave(false);
      const fetchedNotes = await fetchNotes();
      setCurrentNotes(fetchedNotes.data.notes);
      dispatch(setUserNotes(fetchedNotes.data.notes));
      setAddNote(false);
      setCurrentNote(null);
    } catch (error) {
      toast.error("Something went wrong!", {
        autoClose: 3000,
      });
    }
  };

  const handleNoteClick = async (noteId) => {
    let foundNote = notes.find((note) => note._id === noteId);
    setCurrentNote(foundNote);
    setOpenNote(true);
  };

  const handleUpdateNote = async (e) => {
    e.preventDefault();
    setIsLoadingSave(true);
    let targetNoteId = currentNote?.note?._id || currentNote?._id;

    try {
      await updateNote(targetNoteId, {
        title: currentNote.title,
        body: currentNote.body,
      });
      setIsLoadingSave(false);
      // fetching notes again (update)
      const fetchedNotes = await fetchNotes();
      setCurrentNotes(fetchedNotes.data.notes);
      dispatch(setUserNotes(fetchedNotes.data.notes));
      setAddNote(false);
      setCurrentNote(null);
      toast.success("Note updated successfully!", {
        autoClose: 3000,
      });
    } catch (error) {
      toast.error("Something went wrong!", {
        autoClose: 3000,
      });
    }
  };

  const handleDeleteNote = async (noteId) => {
    // deleting a note
    const response = await deleteNote(noteId);
    if (response.status === 200) {
      toast.success("Note removed successfully!", {
        autoClose: 3000,
      });
    }
    // fetching notes again (update)
    const fetchedNotes = await fetchNotes();
    setCurrentNotes(fetchedNotes.data.notes);
    setCurrentNote(null);
  };

  const handleNoteClose = () => {
    setCurrentNote(null);
    setOpenNote(false);
  };

  return (
    <div>
      <div className="notes-main">
        <div className="col-3 left-side-bar">
          <div className="bg-white h-100 p-3 position-relative border-custom">
            <h1 className="h-all-notes">All Notes</h1>
            <div className="notes-wrapper">
              {currentNotes.length > 0 ? (
                currentNotes.map((note) => {
                  return (
                    <div
                      className={`note-heading d-flex align-items-center justify-content-between ${
                        currentNote?._id === note._id
                          ? "active"
                          : "class-name-if-false"
                      }`}
                      key={note._id}
                      onClick={() => handleNoteClick(note._id)}
                    >
                      <h2>{note.title}</h2>

                      <button
                        className="btn tn-secondary del-btn"
                        data-bs-toggle="modal"
                        data-bs-target={`#example_${note._id}`}
                      >
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>{" "}
                      </button>

                      <div
                        className="modal fade"
                        id={`example_${note._id}`}
                        tabIndex={-1}
                        role="dialog"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title"
                                id="exampleModalLabel"
                              >
                                Are you sure ?
                              </h5>
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              This action will delete the note permanently!
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                                onClick={() => handleDeleteNote(note._id)}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="spinner-wrapper">
                  <div
                    className="spinner-border text-secondary spinner-color"
                    role="status"
                  >
                    <span className="sr-only"></span>
                  </div>
                </div>
              )}
            </div>
            <div className="footer w-100 position-absolute bottom-0 pb-3 left-0 btn-logout-d">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        <div className="col-9 right-side-bar">
          <div className="h-100 position-relative p-3 border-custom">
            {(addNote || currentNote) && openNote ? (
              <Note
                note={currentNote || {}}
                setNote={setCurrentNote}
                detectChange={detectChange}
                setDetectChange={setDetectChange}
                handleNoteSubmit={addNote ? handleCreateNote : handleUpdateNote}
                handleNoteClose={handleNoteClose}
                isLoadingSave={isLoadingSave}
              />
            ) : (
              <div className="h-100 d-flex align-items-center justify-content-center empty-box">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="empty-svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
                <h1>Select a note to open or modify its contents</h1>
                <p>OR</p>
                <div className="footer w-100 text-center">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      setCurrentNote({});
                      setAddNote(true);
                      setOpenNote(true);
                    }}
                  >
                    Add Note
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
