const express = require("express");
const app = express();
const path = require("path");
const userRouter = require("./Routers/userRouter.js");
const gsmRouter = require("./Routers/gsmRouter.js");
const viewRouter = require("./Routers/viewRouter.js");
const cookieParser = require("cookie-parser");
const compression = require("compression");
// starts express
app.use(express.json());
app.use(cookieParser());
app.use(compression());

app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "publics")));
app.set("views", path.join(__dirname, "views"));

app.use("/", viewRouter);
// app.use((req, res, next) => {
//   console.log(req.cookies);
//   next();
// });
// app.use("/overview", (req, res, next) => {
//   res.send("Hello world");
//   next();
// });

app.use("/api/v1/users", userRouter);
app.use("/api/v1/gsm", gsmRouter);

module.exports = app;
// nice
