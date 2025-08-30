const { env, connectDB } = require("./src/config");
const app = require("./src/app");

connectDB();

app.listen(env.port, () => {
  console.log(`${env.appName} server running on port ${env.port}`);
  console.log(`visit : ${env.baseUrl}/`);
});
