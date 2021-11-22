import * as db from "./db.helper.js";
import fetch from "node-fetch";

export const get = async () => {
    const dataDB = db.getAll();
    if (dataDB && dataDB.length) {
        return dataDB
    } else {
        const data = await fetch('https://lorem-faker.vercel.app/api?quantity=3').then(r=>r.json());
        db.bulkAdd(data)
        return db.getAll();
    }
}
export const update = async (id, data) => {
    db.update(id, data)
}