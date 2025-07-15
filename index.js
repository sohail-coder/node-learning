const app = require("./server");
const connectDB = require("./db/connect");
require("dotenv").config();

const PORT = 6001 | process.env.PORT;

connectDB(process.env.DB_URL).then(() => {
  app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
  });
});
