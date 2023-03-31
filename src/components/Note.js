import { useEffect, useState } from "react";
import notesStore from "../stores/notesStore";

export default function Note({
  note,
  setNote,
  detectChange,
  setDetectChange,
  handleNoteSubmit,
  handleNoteClose,
  isLoadingSave,
}) {
  const [enableSave, setEnableSave] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleChangeTitle = (e) => {
    if (!detectChange) {
      setNote({ ...note, title: e.target.value });
      setDetectChange(true);
    } else {
      setNote({ ...note, title: e.target.value });
    }
    setEnableSave(true);
  };

  const handleChangeBody = (e) => {
    if (!detectChange) {
      setNote({ ...note, body: e.target.value });
      setDetectChange(true);
    } else {
      setNote({ ...note, body: e.target.value });
    }
    setEnableSave(true);
  };

  return (
    <div className="form-note">
      <form className="add-note-form">
        <div className="d-title">
          <label className="d-block mb-2">Note Title</label>
          <input
            value={note.title}
            onChange={(e) => handleChangeTitle(e)}
            placeholder="Note Title"
            className="form-control mb-4"
            required
          />
        </div>
        <div className="d-body">
          <label className="d-block mb-2">Note Description</label>
          <textarea
            value={note.body}
            onChange={(e) => handleChangeBody(e)}
            placeholder="Note Body"
            className="form-control mb-4"
          />
        </div>
        <div className="note-footer">
          {enableSave ? (
            <button
              type="submit"
              className="btn btn-primary save-btn"
              onClick={(e) => {
                setIsLoading(true);
                handleNoteSubmit(e);
              }}
            >
              {isLoading ? (
                <div className="spinner-border text-light" role="status">
                  <span className="sr-only"></span>
                </div>
              ) : (
                "Save & Close"
              )}
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-primary save-btn"
              onClick={(e) => {
                setIsLoading(true);
                handleNoteSubmit(e);
              }}
              disabled
            >
              Save & Close
            </button>
          )}
          <button
            type="submit"
            className="btn btn-secondary close-btn"
            onClick={handleNoteClose}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
}
