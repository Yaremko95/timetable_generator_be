const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const usersRouter = require("./services/users");
//const loadRouter = require("./services/timetable");
const listEndpoints = require("express-list-endpoints");
const timetableRouter = require("./services/timetable");
const dotenv = require("dotenv");
dotenv.config();
const pass = require("./passport");

const sequelize = require("./db/index");

const app = express();

const whitelist = [process.env.FE_URL, "http://localhost:3000"];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());

app.use(passport.initialize());
// sequelize.sync().then(() => {
//   console.log("Drop and Resync with { force: true }");
// });

app.use("/users", usersRouter);
//app.use("/load", loadRouter);
app.use(
  "/timetable",
  //passport.authenticate("jwt", { session: false }),
  timetableRouter
);
console.log(listEndpoints(app));
app.listen(process.env.PORT, () => {
  console.log("running on port ", process.env.PORT);
});
