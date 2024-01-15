import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import exphbs from "express-handlebars";
import mongoose from "mongoose";
import flashMessages from "connect-flash";
import flash from "express-flash";
import session from "express-session";


import routes from "./routes/routes.js";

const app = express();

dotenv.config();

app.use(session({
      secret: "volleyball",
      resave: false,
      saveUninitialized: true,
    })
  );

app.use(flashMessages());
app.use(flash());

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/assets", express.static("assets"));

app.engine('hbs', exphbs.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');

const PORT = process.env.PORT || 5000;
const connectionURL = process.env.MONGODB_URL;

app.use("/", routes);
app.get("*", (req, res) => {
  res.redirect("/error"); // Redirect to the error page
});

// app.listen(PORT, () => {
//   console.log(` server started on port http://localhost:${PORT} `);
// });

const main = async () => {
    await mongoose.connect(connectionURL);
}

main().then(() =>
    app.listen(PORT, () => console.log(`Server is up on port http://localhost:${PORT}`))
).catch((error) => console.log(error.message));;