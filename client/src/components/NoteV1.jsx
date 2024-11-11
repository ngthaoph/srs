import React, { useState, useEffect } from "react";
import Joi from "joi";
import {
  CREATE_NOTE_ENTRY,
  DELETE_NOTE,
  UPDATE_NOTE,
} from "../graphQL/mutations/mutations";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation, useQuery } from "@apollo/client";
import { Controller, useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { GET_NOTES_BY_CLIENT_ID } from "../graphQL/queries/queries";
import { useClients } from "../context/ClientProvider";
import SRSButton from "../common/SRSButton";

function NoteEntry() {
  const { client } = useClients();
  const [displayNote, setDisplayNote] = useState([]);
  console.log(displayNote);

  //converting time
  const formatDate = (timestamp) => {
    const date = new Date(parseInt(timestamp)).toLocaleDateString();
    return toString(date);
  };

  const [createNote, { loading: createNoteLoading, error: createNoteError }] =
    useMutation(CREATE_NOTE_ENTRY);
  const [deleteNote, { loading: deleteNoteLoading, error: deleteNoteError }] =
    useMutation(DELETE_NOTE);
  const [updateNote] = useMutation(UPDATE_NOTE);

  const {
    data: notesByClientIdData,
    loading: notesByClientIDLoading,
    error: notesByClientIDError,
  } = useQuery(GET_NOTES_BY_CLIENT_ID, {
    variables: {
      clientId: client.id,
    },
  });

  useEffect(() => {
    if (notesByClientIdData) {
      const notes = notesByClientIdData.noteByClientId.map((note) => ({
        id: note.id,
        text: note.note,
        noteTime: note.createdAt,
      }));
      setDisplayNote(notes);
    }
  }, [notesByClientIdData]);

  const schema = Joi.object({
    note: Joi.string().required(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
    defaultValues: {
      note: "",
    },
  });

  const onSubmit = async (data) => {
    data.clientId = client.id;
    const { data: createdNote } = await createNote({
      variables: { note: data },
    });
    setDisplayNote((prevNotes) => [
      ...prevNotes,
      { id: createdNote.createNote.id, text: data.note },
    ]);
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote({
        variables: { deleteNoteId: id },
      });
      setDisplayNote((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (id, newText) => {
    try {
      await updateNote({
        variables: {
          updateNoteId: id,
          note: {
            note: newText,
            clientId: client.id,
          },
        },
      });
      setDisplayNote((prevNotes) =>
        prevNotes.map((note) =>
          note.id === id ? { ...note, text: newText } : note
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (createNoteLoading || deleteNoteLoading || notesByClientIDLoading)
    return <p>Loading...</p>;
  if (createNoteError) return <p>Error: {createNoteError.message}</p>;
  if (deleteNoteError) return <p>Error: {deleteNoteError.message}</p>;
  if (notesByClientIDError) return <p>Error: {notesByClientIDError.message}</p>;

  return (
    <div>
      <SRSButton>Create New Note</SRSButton>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="note"
          control={control}
          render={({ field }) => (
            <Form.Group controlId="note" className="mt-2">
              <Form.Label className="visually-hidden">Note</Form.Label>
              <Form.Control
                {...field}
                type="text"
                placeholder="Enter note"
                size="lg"
                className="form-shadow"
              />
              {errors.note && (
                <p className="text-danger">{errors.note.message}</p>
              )}
            </Form.Group>
          )}
        />
        <Button variant="dark" size="lg" className="w-100 mt-2" type="submit">
          Save <i className="bi bi-send-fill"></i>
        </Button>
      </Form>

      {displayNote.length > 0 && (
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
            {displayNote.map(({ id, text }) => (
              <tr key={id}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {text}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  <Button variant="danger" onClick={() => handleDelete(id)}>
                    Delete
                  </Button>
                  <Button
                    variant="warning"
                    onClick={() =>
                      handleUpdate(id, prompt("Update note:", text))
                    }
                  >
                    Update
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default NoteEntry;
