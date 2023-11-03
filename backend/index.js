const express = require("express")
const router = require("./src/routers")
const app = express()
const dbConnection = require("./src/config/db");
const cors = require("cors")

const port = 5050

app.use(cors())
app.use(express.json())
app.use("/api/v1", router)

dbConnection
    .sync()
    .then(() => {
        app.listen(port, () => {
            console.log(
                `🟢 Database connected and Server running on http://localhost:${port}`
            );
        });
    })
    .catch((error) => {
        console.log("🔴 Unable to connect to the database:", error);
    });