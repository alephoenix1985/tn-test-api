import express from "express";
import * as taskHandler from "./handler/task.handler.js";

// const mongoose = require('mongoose');
import http from "http";

const STR_CON = process.env.MONGO_STR_CONNECTION || 'mongodb://localhost/test';
export function startServer(routes, PORT = 4000) {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
    app.use((req, res, next) => {
        res.setHeader("Accept-Ranges", "bytes=100-1500");
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });
    routes(app);

    const server = http.createServer(app);
    server.listen(PORT, () => {
        console.log(`Example app listening at http://localhost:${PORT}`)
    })
    server.on('error', (e) => {
        if (e.code === 'EADDRINUSE') {
            console.log('Address in use, retrying...');
            setTimeout(() => {
                server.close();
                const newPORT = PORT++
                server.listen(newPORT, () => {
                    console.log(`Example app listening at http://localhost:${newPORT}`)
                });
            }, 1000);
        }
    });
    return app;
}

function mongoSetUp() {
    const DBOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    };
    return mongoose.connect(STR_CON, DBOptions)
}

// mongoSetUp();

startServer((app) => {
    app.get('/', (req, res, next) => res.send('Welcome to Test TrueNorth Api'));

    app.put('/tasks/:id', async (req, res, next) => {
        const {id} = req.params || {};
        const data = req.body || {};
        let r = await taskHandler.update(id, data);
        res.send(r);
    });

    app.get('/tasks', async (req, res, next) => {
        let r = await taskHandler.get();
        res.send(r);
    });
})