const app = require("./src/app");
const env = require("./src/config/environment");
const connectDatabase = require("./src/config/database");

connectDatabase();

app.listen(env.port, () => {
  console.log(`server listening on port: ${env.port}`);
  console.log(`visit: ${env.baseUrl}`);
});
