import React, { useState } from "react";
import timeConversion from "../utils/timeConvestion";
import { Button } from "react-bootstrap";
import { UPDATE_NOTE, DELETE_NOTE } from "../graphQL/mutations/mutations";
import { useMutation } from "@apollo/client";
import EditNoteDetails from "./EditNoteDetails";

function NoteTable({ displayNote, setDisplayNote, client }) {
  const [updateNote] = useMutation(UPDATE_NOTE);
  const [selectedNoteId, setSelectedNoteId] = useState(null); // Track which note is selected for editing
  const [updatedText, setUpdatedText] = useState("");

  // Handle note update
  const handleUpdateNote = async (id) => {
    const noteToUpdate = displayNote.find((note) => note.id === id);

    if (noteToUpdate) {
      await updateNote({
        variables: {
          updateNoteId: noteToUpdate.id,
          note: {
            note: updatedText || noteToUpdate.text, // Use updatedText or original note text
            clientId: client.id,
          },
        },
      });

      // Update local state with the new note text
      setDisplayNote((prevNotes) =>
        prevNotes.map((note) =>
          note.id === id ? { ...note, text: updatedText || note.text } : note
        )
      );

      // Reset selected note and updated text
      setSelectedNoteId(null);
      setUpdatedText("");
    }
  };

  // Handle delete

  const [deleteNote, { loading: deleteNoteLoading, error: deleteNoteError }] =
    useMutation(DELETE_NOTE);

  const handleDelete = async (id) => {
    const noteToDelete = displayNote.filter((note) => note.id === id);
    console.log(noteToDelete);
    try {
      await deleteNote({
        variables: { deleteNoteId: id },
      });
      setDisplayNote((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  if (deleteNoteError) return <p>Error: {deleteNoteError.message}</p>;
  return (
    <>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                backgroundColor: "#f2f2f2",
              }}
            >
              Date
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                backgroundColor: "#f2f2f2",
              }}
            >
              Note
            </th>
            <th
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                backgroundColor: "#f2f2f2",
              }}
            >
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {displayNote.map(({ id, text, noteTime }) => (
            <tr key={id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {timeConversion(noteTime)}
              </td>

              <td
                style={{ border: "1px solid #ddd", padding: "8px" }}
                onClick={() => setSelectedNoteId(id)} // Select the note to edit
              >
                {selectedNoteId === id ? (
                  <EditNoteDetails
                    updatedText={updatedText}
                    setUpdatedText={setUpdatedText}
                    handleUpdateNote={handleUpdateNote}
                    noteText={text}
                    noteId={id}
                  />
                ) : (
                  text
                )}
              </td>

              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <Button onClick={() => setSelectedNoteId(id)}>Edit</Button>
                <Button onClick={() => handleDelete(id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default NoteTable;
