const url = "http://localhost:3000";

async function expensesAllUsers() {
  const res = await fetch(`${url}/expenses`);

  const json = await res.json();

  return json;
}

export { expensesAllUsers };
