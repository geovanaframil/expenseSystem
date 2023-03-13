const url = 'http://localhost:3000';

export default async function findUser(id) {
    const res = await fetch(`${url}/users/${id}`);

    const json = await res.json();

    return json;
}
