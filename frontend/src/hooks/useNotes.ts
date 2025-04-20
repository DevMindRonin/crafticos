import { useQuery } from "@apollo/client";
import { GET_NOTES } from "@/graphql/queries/getNotes";

export const useNotes = () => {
  const { data, loading } = useQuery(GET_NOTES);

  const notesToDisplay = data?.getNotes || [];
  return {
    notesToDisplay,
    loading,
  };
};
