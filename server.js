const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app.js");
const DB = process.env.DATABASE;
// console.log(process.env.PORT);

const connectDB = async () => {
  try {
    mongoose.connect(DB).then(() => {
      console.log("Database connected SuccessFully !!");
    });
  } catch (error) {
    console.log("error");
    process.exit(1);
  }
};

let port = process.env.PORT || 8002;
// app.use((req, res, next) => {
//   console.log("sfdsfasdf");
//   next();
// });
// done
connectDB().then(() => {
  app.listen(port, () => {
    console.log("listening for requests");
  });
});
