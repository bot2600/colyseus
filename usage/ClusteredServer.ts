import * as cluster from "cluster";
import * as path from 'path';
import * as express from 'express';

import { ClusterServer } from "../src/ClusterServer";
import { ChatRoom } from "./ChatRoom";

const PORT = 8080;

let gameServer = new ClusterServer();

// Register ChatRoom as "chat"
gameServer.register("chat", ChatRoom);

if (cluster.isMaster) {
  gameServer.listen(PORT);
  gameServer.fork();

} else {
  const app = new express();

  app.get("/something", (req, res) => {
    console.log("something!", process.pid);
    res.send("Hey!");
  });

  // Create HTTP Server
  gameServer.attach({ server: app });
}

console.log(`Listening on ${ PORT }`);
