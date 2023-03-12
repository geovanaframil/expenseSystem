const url = 'http://localhost:3000';

export default async function findExpense(id) {
    const res = await fetch(`${url}/expenses/${id}`);

    const json = await res.json();

    return json;
}
