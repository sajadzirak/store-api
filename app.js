require("dotenv").config();
require("express-async-errors")

const express = require("express");
const app = express();

const connectDB = require("./db/connect")
const productsRouter = require("./routes/products")

const notFoundMiddleWare = require("./middleware/not-found");
const errorMiddleWare = require("./middleware/error-handler");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Store API</h1>");
});

app.use("/api/v1/products", productsRouter)

app.use(notFoundMiddleWare)
app.use(errorMiddleWare)

const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening port ${port}...`))
    } catch(error) {
        console.log(error)
    }
}

start()