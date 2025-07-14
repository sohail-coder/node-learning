const app = require("./server");
const connectDB = require("./db/connect");
require("dotenv").config();

const PORT = process.env.PORT | 6001;

connectDB(process.env.DB_URL).then(() => {
  app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
  });
});
