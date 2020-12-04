import config from '../config.js';
import io from "socket.io-client";

const socket = io.connect("https://api.mountkelvin.com", {
    reconnectionDelay: 1000,
    reconnectionDelayMax: 3000,
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    socket.emit("subscribe", {
      siteKey: config.API_KEY,
    });
  });

  socket.on("siteKeyFound", ({ siteKey, data }) => {
    console.log(data);
  });

export default socket;