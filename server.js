const express = require("express");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const swaggerDocument = require("./src/utility/swagger/swagger.json");
const swaggerUi = require("swagger-ui-express");

dotenv.config();

//firebase initialzation
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const app = express();
app.use(express.json());


// Routes
const student = require("./src/routes/student");
const auth = require('./src/routes/auth')
const route = express.Router();
route.get("/", (req, res) => {
  return res.status(200).json({ msg: "Server is running." });
});

app.use("/", route);
app.use('/auth',auth);
app.use("/student", student);
app.use('/api-docs', swaggerUi.serve,   swaggerUi.setup(swaggerDocument));


// DB Connection & Server
console.log("Connecting to DB...");
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to DB!");
    app.listen(process.env.PORT || 3000, () => console.log("Started Server"));
  })
  .catch((e) => {
    console.error("Failed to connected to DB!" + e.message);
  });
