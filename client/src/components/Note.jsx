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
import EditNoteDetails from "./EditNoteDetails";
import NoteUpdate from "./NoteUpdate";
import NoteTable from "./NoteTable";
import timeConversion from "../utils/timeConvestion";

function NoteEntry() {
  const { client } = useClients();
  const [displayNote, setDisplayNote] = useState([]);

  console.log("displayNote", displayNote);

  //display the note box
  const [boxIsVisible, setBoxIsVisible] = useState(false);

  const [createNote, { loading: createNoteLoading, error: createNoteError }] =
    useMutation(CREATE_NOTE_ENTRY);

  const {
    data: notesByClientIdData,
    loading: notesByClientIDLoading,
    error: notesByClientIDError,
  } = useQuery(GET_NOTES_BY_CLIENT_ID, {
    variables: {
      clientId: client.id,
    },
  });
  console.log(notesByClientIdData);

  useEffect(() => {
    if (notesByClientIdData) {
      const notes = notesByClientIdData.noteByClientId.map((note) => ({
        id: note.id,
        text: note.note,
        noteTime: note.createdAt, //update the query in server
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
    console.log(createdNote.createNote);
    setDisplayNote((prevNotes) => [
      ...prevNotes,
      {
        id: createdNote.createNote.id,
        text: data.note,
        noteTime: createdNote.createNote.createdAt,
      },
    ]);
  };

  //   try {
  //     await updateNote({
  //       variables: {
  //         updateNoteId: id,
  //         note: {
  //           note: newText,
  //           clientId: client.id,
  //         },
  //       },
  //     });
  //     setDisplayNote((prevNotes) =>
  //       prevNotes.map((note) =>
  //         note.id === id ? { ...note, text: newText } : note
  //       )
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  //toggle the note entry box
  const handleBoxVisible = () => {
    setBoxIsVisible(!boxIsVisible);
  };

  // if (createNoteLoading || deleteNoteLoading || notesByClientIDLoading)
  //   return <p>Loading...</p>;
  // if (createNoteError) return <p>Error: {createNoteError.message}</p>;

  // if (notesByClientIDError) return <p>Error: {notesByClientIDError.message}</p>;

  return (
    <div>
      <SRSButton onClick={handleBoxVisible}>Create New Note</SRSButton>

      {boxIsVisible && (
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="note"
            control={control}
            render={({ field }) => (
              <Form.Group controlId="note" className="mt-2">
                <Form.Label className="visually-hidden"></Form.Label>
                <Form.Control
                  {...field}
                  as="textarea"
                  style={{
                    width: "390px",
                    fontSize: "12px",
                    marginLeft: "3px",
                    height: "100px",
                    marginBottom: "4px",
                    border: "1px solid #b8b8b8",
                    padding: "4px 4px",
                  }}
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
      )}
      {displayNote.length > 0 && (
        <NoteTable
          displayNote={displayNote}
          setDisplayNote={setDisplayNote}
          client={client}
        />
      )}
    </div>
  );
}

export default NoteEntry;
