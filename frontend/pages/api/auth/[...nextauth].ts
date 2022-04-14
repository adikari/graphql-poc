import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

async function authorize(credentials: Record<'email', string> | undefined) {
  const url = `https://bgyn2ati22.execute-api.us-east-1.amazonaws.com/graphql`;

  const query = `
    mutation CreateUser($input: CreateUserInput!) {
      createUser(input: $input) {
        id
        name
      }
    }
  `;

  const variables = {
    input: {
      email: credentials?.email
    }
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query, variables })
    });

    const { data } = await res.json();

    const user = data?.createUser;

    if (!res.ok || !user) {
      return null;
    }

    return {
      _id: user.id,
      email: user.id,
      name: user.name
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Email',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'foo@gmail.com' }
      },
      authorize
    })
  ],
  jwt: {
    secret: 'some-secret'
  }
});
