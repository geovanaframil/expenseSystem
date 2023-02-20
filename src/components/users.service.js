const url = "http://localhost:3000";

async function getUser(userId) {
  const res = await fetch(`${url}/users/${userId}`);

  const json = await res.json();

  return json;
}

export { getUser };
