import * as uuid from "uuid";

let _tasks = []
export const bulkAdd = (tasks) => {
    _tasks = _tasks.concat(tasks.map(t => ({UUID: uuid.v4(), title: t})))
    return _tasks
}
export const update = (id, data) => {
    const exist = _tasks.find(t => t.UUID === id)
    if (exist) {
        Object.assign(exist, data);
    }
}
export const getAll = () => _tasks;