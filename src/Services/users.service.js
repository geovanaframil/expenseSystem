const url = "http://localhost:3000";

async function addNewUser(body) {
  const headers = new Headers();

  headers.append("content-type", "application/json");

  const initExpense = {
    headers: headers,
    method: "POST",
    body: JSON.stringify(body),
  };

  let response = await fetch(`${url}/users`, initExpense);

  if (response.ok) {
    let dataExpense = await response.json();
    return dataExpense;
  } else {
    await response.text();
  }
}

async function getAllUsers() {
  const res = await fetch(`${url}/users`);

  const json = await res.json();

  return json;
}

async function getUser(id) {
  const res = await fetch(`${url}/users/${id}`);

  const json = await res.json();

  return json;
}

async function findUser(id) {
  const res = await fetch(`${url}/users/${id}`);

  const json = await res.json();

  return json;
}

async function updateUser(body, id) {
  const headers = new Headers();

  headers.append("content-type", "application/json");

  const initUser = {
    headers: headers,
    method: "PUT",
    body: JSON.stringify(body),
  };

  let response = await fetch(`${url}/users/${id}`, initUser);

  if (response.ok) {
    let dataExpense = await response.json();
    return dataExpense;
  } else {
    await response.text();
  }
}

export { addNewUser, getAllUsers, getUser, findUser, updateUser };
