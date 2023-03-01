const url = "http://localhost:3000";

export default async function getAllUsers() {
  const res = await fetch(`${url}/users`);

  const json = await res.json();

  return json;
};
