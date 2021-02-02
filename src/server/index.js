var path = require("path")
const express = require("express")
const mockAPIResponse = require("./mockAPI.js")
const cors = require("cors");
const fetch = require("node-fetch")
const dotenv = require("dotenv");
dotenv.config()

const app = express()

app.use(cors());
app.use(express.static("dist"))

console.log(__dirname)


app.get("/", function (req, res) {
    // res.sendFile("dist/index.html")
    res.sendFile(path.resolve("dist/index.html"))
})

// designates what port the app will listen to for incoming requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

// app.get("/test", function (req, res) {
//     res.send(mockAPIResponse)
// })

// API Credentials
const apiKey = process.env.API_KEY

app.get('/key', (req, res)=> {
    res.send(apiKey)
})