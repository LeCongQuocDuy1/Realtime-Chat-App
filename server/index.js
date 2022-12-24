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

    // lang nghe su kien tham gia vao phong
    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined Room: ${data}`);
    })

    // lang nge su kien gui tin nhan
    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    })

    // lang nghe su kien khi ngat ket noi
    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    })
})


// lang nghe server
server.listen(3001, () => {
    console.log("SERVER IS RUNNING");
})
