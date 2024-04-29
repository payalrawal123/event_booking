const express = require("express");
const { userRouter } = require("./routes/userRoutes");
const { connectionToDb } = require("./config/db");
const { todoRouter } = require("./routes/todoRoutes");
const app = express();

app.use(express.json());
app.use("/user",userRouter);
app.use("/todo", todoRouter)
app.listen(3000,async(req,res)=>{
    await connectionToDb();
    console.log("server running at 3000....");
})