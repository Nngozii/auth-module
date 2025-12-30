const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");
const flash = require("connect-flash");

const db = require("./Database/main");
const MONGO_URI = require("./Database/main").MONGO_URI;

const adminRoute = require("./routes/admin");
const authRoute = require("./routes/auth");
const shopRoute = require("./routes/shop");
const e404 = require("./controllers/404");

const app = express();

const store = new MongoDBStore({
  uri: MONGO_URI,
  collection: "sessions",
});
const csrfProtection = csrf();

app.set("view engine", "pug");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    name: "session-id",
    secret: "mi secret", // Secret key,
    saveUninitialized: false,
    resave: false,
    store: store,
  })
);
//app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  if (req.session.user) {
    req.user = req.session.user._id;
  }
  next();
});

app.use((req, res, next) => {
  res.locals.currentPath = req.originalUrl;
  next();
});

app.use(adminRoute);
app.use("/auth", authRoute);
app.use(shopRoute);
app.use(e404.err404);

db.once("connection", () => {
  console.log("Database on!");
});
db.on("error", (error) => {
  console.log("Error", error);
});
db.on("disconnected", () => {
  console.log("MBD Disconnected");
});

app.listen(2026, () => {
  console.log("server listening on port 2026...");
});
