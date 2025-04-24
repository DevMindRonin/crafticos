import { useQuery, useMutation } from "@apollo/client";
import { GET_NOTES, DELETE_NOTE, UPDATE_NOTE, ADD_NOTE } from "@/graphql/notes";
import {
  NoteQueryResult,
  DeleteMutationResult,
  UpdateMutationResult,
} from "@/types/graphql.types";
import { useState } from "react";
export const useNotes = () => {
  const [error, setError] = useState("");
  const [noteText, setNoteText] = useState<string>("");

  const { data } = useQuery<NoteQueryResult>(GET_NOTES);

  const [onUpdate] = useMutation<UpdateMutationResult>(UPDATE_NOTE);

  const [onDelete] = useMutation<DeleteMutationResult>(DELETE_NOTE, {
    update(cache, { data }) {
      const successfullyDeletedNote = data?.deleteNote;

      if (successfullyDeletedNote?.id) {
        const existingNotes = cache.readQuery<NoteQueryResult>({
          query: GET_NOTES,
        });
        if (existingNotes?.getNotes) {
          cache.writeQuery({
            query: GET_NOTES,
            data: {
              getNotes: existingNotes.getNotes.filter(
                (note) => note.id !== successfullyDeletedNote.id
              ),
            },
          });
        }
      }
    },
  });

  const [addNewNote] = useMutation(ADD_NOTE, {
    update(cache, { data }) {
      const newNote = data?.addNote;
      if (!newNote) return;

      const existingNotes = cache.readQuery<NoteQueryResult>({
        query: GET_NOTES,
      });

      if (existingNotes?.getNotes) {
        cache.writeQuery({
          query: GET_NOTES,
          data: {
            getNotes: [...existingNotes.getNotes, newNote],
          },
        });
      }
    },
  });

  const onDeleteNote = async (id: string) => {
    try {
      await onDelete({
        variables: { id },
      });
    } catch (error) {
      console.error("Error during deleting note:", error);
      throw error;
    }
  };

  const onUpdateNote = async (id: string, text: string) => {
    try {
      await onUpdate({
        variables: {
          id,
          text,
        },
      });
    } catch (error) {
      console.error("Error during updaring note: ", error);
      throw error;
    }
  };

  const onSave = async () => {
    try {
      if (!noteText.trim()) {
        setError("Insert some value");
        return;
      }
      await addNewNote({
        variables: {
          text: noteText,
        },
      });
      // refetch();
      setNoteText("");
    } catch (error) {
      console.log(error);
      setError("Problem with saving a note");
    }
  };

  return {
    onDeleteNote,
    onUpdateNote,
    notesToDisplay: data?.getNotes || [],

    noteText,
    setNoteText,
    onSave,
    error,
    setError,
  };
};
