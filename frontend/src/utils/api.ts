// frontend/src/app/utils/api.ts
import axios from "axios";
import { getSession } from "next-auth/react";

export const graphqlRequest = async (query: string, variables = {}) => {
  const session = await getSession();
  const token = session?.accessToken ?? "";

  console.log("🔍 Token sent to backend:", token); // Debugging

  if (!token) {
    console.error("User is not authenticated.");
    throw new Error("User is not authenticated.");
  }

  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
        `${process.env.FRONTEND_URL}/graphql`,
      { query, variables },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ GraphQL Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ GraphQL Error:", error);
    throw error;
  }
};
