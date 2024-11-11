import React, { useEffect } from "react";
import { Button } from "react-bootstrap";

function EditNoteDetails({
  updatedText,
  setUpdatedText,
  handleUpdateNote,
  noteText,
  noteId,
}) {
  // Initialize the updated text when the note is selected for editing
  useEffect(() => {
    setUpdatedText(noteText);
  }, [noteText, setUpdatedText]);

  // Handle changes in the textarea
  const handleTextChange = (e) => {
    setUpdatedText(e.target.value);
  };

  // Handle saving the updated note
  const handleSave = () => {
    handleUpdateNote(noteId);
  };

  return (
    <div>
      <textarea
        style={{
          width: "390px",
          fontSize: "12px",
          marginLeft: "3px",
          height: "100px",
          marginBottom: "4px",
          border: "1px solid #b8b8b8",
          padding: "4px 4px",
        }}
        value={updatedText} // Controlled textarea
        onChange={handleTextChange} // Update text as the user types
        placeholder="Edit note"
        className="form-shadow"
      />
      <div>
        <Button onClick={handleSave}>Save</Button>
      </div>
    </div>
  );
}

export default EditNoteDetails;
