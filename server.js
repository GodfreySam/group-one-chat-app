const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const mongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const ejs = require("ejs");
const flash = require("connect-flash");
const dotenv = require("dotenv")
// Load config
dotenv.config({ path: "./config/config.env" });

// Global Variables
const { globalVariables } = require("./middlewares/configurations");

// Passport config
require("./config/passport.config")(passport);

//  Database connection
// mongoose
// 	.connect("mongodb://localhost/waawsocial")
// 	.then((connected) => console.log("Database connected successfully"))
// 	.catch((err) => console.log("Error connecting to DB", err));

// initialize  express app
const app = express();

// Configure express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser());
app.use(
	session({
		secret: "another-secret",
		saveUninitialized: true,
		resave: true,
		cookie: { maxAge: Date.now() + 3600 * 24 * 60 * 60 },
		// store: mongoStore.create({
		// 	mongoUrl: "mongodb://localhost/waawsocial",
		// 	ttl: 3600 * 24 * 60 * 60,
		// }),
	}),
);

app.use(passport.initialize());
app.use(passport.session());
app.use(logger("dev"));
app.use(flash());
app.use(globalVariables);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Routes (Routes grouping)
const defaultRoutes = require("./routes/default.routes");
const authRoutes = require("./routes/auth.routes");

app.use("/", defaultRoutes);
app.use("/auth", authRoutes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
	res.render("error404");
	next();
});

//  assign port to a variable
const port = process.env.PORT || 3900;

app.listen(port, () =>
	console.log(`server running on http://localhost:${port}`),
);
