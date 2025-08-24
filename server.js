const env = require("./src/config/environment");
const connectDB = require("./src/config/db");
const app = require("./src/app");

connectDB();

app.listen(env.port, () => {
  console.log(`${env.appName} server running on port ${env.port}`);
  console.log(`visit : ${env.baseUrl}/`);
});
