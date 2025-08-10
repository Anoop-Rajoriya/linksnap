const app = require("./src/app");
const env = require("./src/config/env");
const connectDB = require("./src/config/db");

connectDB();

app.listen(env.port, () => {
  console.log(`server listening on PORT:${env.port}`);
  console.log(`visit: ${env.baseUrl}`);
});
