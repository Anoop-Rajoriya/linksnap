const app = require("./src/app");
const { env, connectDB } = require("./src/configs");

connectDB();

app.listen(env, () => {
  console.log(`Server is running on PORT: ${env.port}`);
  console.log(`visite: ${env.baseUrl}`);
});
