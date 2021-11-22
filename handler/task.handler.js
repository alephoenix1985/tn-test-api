import * as db from "./db.helper.js";
import fetch from "node-fetch";


export const importReset = async (n) => {
    const data = await fetch('https://lorem-faker.vercel.app/api?quantity=' + n).then(r => r.json());
    db.bulkAdd(data)
}


export const get = async () => {
    return db.getAll() || [];
}
export const update = async (id, data) => {
    db.update(id, data)
}