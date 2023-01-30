const express = require("express")
const mongoose= require("mongoose")
const bodyParser = require("body-parser")
const Route = require("./routes/router")
const app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

mongoose.connect("mongodb+srv://linagodbole99:dAix1EtU6C6yxJDR@cluster0.oip3eje.mongodb.net/metapercept", {},
).then(()=> console.log("database is connected"))
.catch((err)=> console.log(err))


app.use("/", Route)

app.get("/get", (req,res)=>{
    res.send("connected")
})

app.listen(3000,()=>{
    console.log("port is connected at 3000");
})