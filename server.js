const app = require("./src/app");
const config = require("./src/config/config");

const PORT = config.port || 3000;

app.listen(PORT, () => {
  console.log(`🚀 LinkSnap server running on port ${PORT}`);
  console.log(`🌐 Visit: http://localhost:${PORT}`);
});
