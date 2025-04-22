import { useQuery, useMutation } from "@apollo/client";
import { GET_NOTES, DELETE_NOTE } from "@/graphql/notes";
import { NoteQueryResult, DeleteMutationResult } from "@/types/graphql.types";

type DeleteNoteMutationVariables = {
  id: string;
};

export const useNotes = () => {
  const { data, loading } = useQuery<NoteQueryResult>(GET_NOTES);

  const [onDelete] = useMutation<
    DeleteMutationResult,
    DeleteNoteMutationVariables
  >(DELETE_NOTE, {
    update(cache, { data }, options) {
      const existingNotes = cache.readQuery<NoteQueryResult>({
        query: GET_NOTES,
      });

      const deletedId = options?.variables?.id;

      if (existingNotes && data?.deleteNote && deletedId) {
        cache.writeQuery({
          query: GET_NOTES,
          data: {
            getNotes: existingNotes.getNotes.filter(
              (note) => note.id !== deletedId
            ),
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
    } catch (err) {
      console.error("Error during deleting note:", err);
    }
  };

  const notesToDisplay = data?.getNotes || [];

  return {
    onDeleteNote,
    notesToDisplay,
    loading,
  };
};
