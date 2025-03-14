import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { client } from "../../../../lib/apollo";
import { gql } from "@apollo/client";

const REGISTER_MUTATION = gql`
  mutation Register($email: String!, $password: String!, $name: String!) {
    register(email: $email, password: $password, name: $name) {
      token
      user {
        id
        email
        name
      }
    }
  }
`;

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    // Hash hesla před uložením
    const hashedPassword = await bcrypt.hash(password, 10);

    // Volání GraphQL API na registraci uživatele
    const { data } = await client.mutate({
      mutation: REGISTER_MUTATION,
      variables: { email, password: hashedPassword, name },
    });

    if (!data.register) {
      return NextResponse.json(
        { error: "Registration failed" },
        { status: 400 }
      );
    }

    return NextResponse.json(data.register);
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
