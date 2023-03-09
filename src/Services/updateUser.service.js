const url = "http://localhost:3000";

export default async function updateUser(body, id) {
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