const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
require("dotenv").config();

server.use(middlewares);
server.use(router);
const PORT = process.env.PORT || 3123;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
