const url = "http://localhost:3000";

async function addNewExpense(body) {
  const headers = new Headers();

  headers.append("content-type", "application/json");

  const initExpense = {
    headers: headers,
    method: "POST",
    body: JSON.stringify(body),
  };

  let response = await fetch(`${url}/expenses`, initExpense);

  if (response.ok) {
    let dataExpense = await response.json();
    return dataExpense;
  } else {
    await response.text();
  }
}

async function fetchDeleteExpense(id) {
  await fetch(`${url}/expenses/${id}`, { method: "DELETE" });
}

async function fetchEditExpense(body, id) {
  const headers = new Headers();

  headers.append("content-type", "application/json");

  const initCategory = {
    headers: headers,
    method: "PUT",
    body: JSON.stringify(body),
  };

  let response = await fetch(`${url}/expenses/${id}`, initCategory);

  if (response.ok) {
    let dataExpense = await response.json();
    return dataExpense;
  } else {
    await response.text();
  }
}

async function expensesAllUsers() {
  const res = await fetch(`${url}/expenses`);

  const json = await res.json();

  return json;
}

async function findExpense(id) {
  const res = await fetch(`${url}/expenses/${id}`);

  const json = await res.json();

  return json;
}

export {
  addNewExpense,
  fetchDeleteExpense,
  fetchEditExpense,
  expensesAllUsers,
  findExpense,
};
