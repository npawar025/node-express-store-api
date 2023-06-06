import express from "express";
import { connectDB } from "./db/connect.js";
import * as dotenv from "dotenv";
import notFound from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import productRouter from "./routes/products.js";
import "express-async-errors";


dotenv.config();
/*
The dotenv.config() function is used to load variables from a .env file into Node.js application's process environment.
The .env file is a simple text file that contains key-value pairs of environment variables. Each line in the file typically
represents one environment variable in the format KEY=VALUE. The dotenv.config() function reads the contents of the .env file 
and sets the key-value pairs as environment variables accessible within your Node.js application.
*/

const app = express();
const port = 3000;

//middleware
app.use(express.json());

//By including express.json() as middleware in your application,
// it instructs Express to parse the request body if it's in JSON format and make it available in the req.body object.

//route
app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">Products</a>');
});

app.use("/api/v1/products", productRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Listening on port ${port}..`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
