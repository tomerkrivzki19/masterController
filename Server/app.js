require("@shopify/shopify-api/adapters/node");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const cookieParer = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

const compresion = require("compresion");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController"); //TODO: fix the controller to our owen use depending on the routs we will use /api or other
const clientRouter = require("./Router/clientRouter");

const app = express();

app.use(
  cors({
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    origin: "https://master-controller.vercel.app/",
  })
);
app.options("*", cors()); //define all the routes

// TODO: app.set("trust proxy", 1); // Trust the first proxy in the chain (Vercel)

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  max: 100, // 100 request
  windowMs: 60 * 60 * 1000, //for 1 hour
  //result : 100 req from that one ip in one hour, when that surten of ip get above 100 req in an hour he will get an err
  message: "Too many request from this IP, please try again in an hour!",
});

app.use("/api", limiter);

//Body parser, reading data from the body into req.body
app.use(express.json({ limit: "50mb" })); //here we set the limit for parsering files to max of 10 kb , what will happeend id there are a file more then 10 kb , simpily he will not be accepted
//an build express package that parse url encoded form, urlencoded is also called on the form way of sending data  is also called urlencoded - what is doing is to parse that type of urlencoded form!
app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  })
);

// cookie-parser
app.use(cookieParer());
//ATTACKS BLOCK:
app.use(mongoSanitize()); // this is a function that we call that them will return us a middleware function that then we can use, what the middleware function does is to loook at the req body, req queryString and also req.params and filter out all the dollars sign and dots, y removing them this apparators will no longer work
//Data sanitization against XSS
app.use(xss());
//compresion
app.use(compresion());

//Development log-in
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies);
  // console.log(req.headers); //access to the req headers
  next();
});

//ROUTES

app.use("/api/v1", clientRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`can't find  ${req.originalUrl} on this server`, 404));
});

//err handaling middleware
app.use(globalErrorHandler);

module.exports = app;
