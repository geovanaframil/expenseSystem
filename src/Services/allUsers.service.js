const url = "http://localhost:3000";

async function getAllUsers() {
  const res = await fetch(`${url}/users`);

  const json = await res.json();

  return json;
}

export { getAllUsers };
