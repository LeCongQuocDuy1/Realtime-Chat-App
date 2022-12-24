const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

// khoi tao server
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

// lang nghe su kien khi ket noi toi
io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // lang nghe su kien khi ngat ket noi
    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    })
})


// lang nghe server
server.listen(3001, () => {
    console.log("SERVER IS RUNNING");
})
