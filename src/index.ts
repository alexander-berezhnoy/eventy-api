import express from "express";
import http from "http";
// import WebSocket from "ws";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./db";
import Routes from "./routes";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const server = http.createServer(app);

// Connect to MongoDB
connectDB();

app.use((req, res, next) => {
  if (req.url === "/") {
    return res.redirect(301, "/events");
  }
  return next();
});

app.use("/", Routes);

// Set up a WebSocket server
// const wss = new WebSocket.Server({ server });

// wss.on("connection", (ws) => {
//   console.log("WebSocket connected!");

//   ws.on("message", (message: string) => {
//     console.log(`Received message: ${message}`);
//     ws.send("hello");
//   });

//   ws.on("close", () => {
//     console.log("WebSocket closed!");
//   });
// });

// Start the HTTP and WebSocket servers

server.listen(process.env.PORT || 8080, () => {
  console.log(`Server started`);
});
