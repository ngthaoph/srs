import React from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_NOTE } from "../graphQL/mutations/mutations";

function NoteUpdate({ note, clientid }) {
  const [updateNote] = useMutation(UPDATE_NOTE, {
    variables: {
      updateNoteId: note.id,
      note: {
        note: note.note,
        clientId: clientid,
      },
    },
  });
  console.log("Hello:", updateNote);

  return (
    <div>
      <form>
        <textarea
          value={note.note}
          onChange={(e) =>
            updateNote({
              variables: {
                updateNoteId: note.id,
                note: { note: e.target.value, clientId: clientid },
              },
            })
          }
        />
      </form>
    </div>
  );
}

export default NoteUpdate;
