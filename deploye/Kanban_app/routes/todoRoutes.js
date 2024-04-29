const express = require("express");
const { auth } = require("../middleware/authmiddleware");
const { todoModel } = require("../models/todoSchema");
const todoRouter = express.Router();


todoRouter.get("/",auth, async(req,res)=>{
    const page = req.query.page || 1;
    const limit = req.query.limit || 2;
    const skip = (page-1) * limit;
    try {
        const todo = await todoModel.find({userID:req.body.userID}).skip(skip).limit(limit);
       
      return  res.status(200).json({error:false, items:todo})
    } catch (error) {
      return res.status(500).send({ error: true, message: error.message });
          
    }
})
todoRouter.post("/",auth, async(req,res)=>{
    // const { title, description,status } = req.body;
//   const { userId } = req;
    try {
        const todo = new todoModel(req.body);
        await todo.save();
      return  res.status(200).json({error:false, items:todo})
    } catch (error) {
      return res.status(500).send({ error: true, message: error.message });
          
    }
})
todoRouter.patch("/:todoId",auth, async(req,res)=>{
   const {todoId} = req.params;
    try {
        const todo = await todoModel.findOne({_id:todoId});
      if(todo.userID ===req.body.userID){
        const updateTodo = await todoModel.findByIdAndUpdate({_id:todoId}, req.body);

        return  res.status(200).json({error:false, items:updateTodo})
      }else{
        return res.status(200).send({ msg: "userid not match"});
      }
    } catch (error) {
      return res.status(500).send({ error: true, message: error.message });
          
    }
})
todoRouter.delete("/:todoId",auth, async(req,res)=>{
   const {todoId} = req.params;
    try {
        const todo = await todoModel.findOne({_id:todoId});
      if(todo.userID ===req.body.userID){
        const deleteTodo = await todoModel.findByIdAndDelete({_id:todoId});

        return  res.status(200).json({error:false, items:deleteTodo})
      }else{
        return res.status(200).send({ msg: "userid not match"});
      }
    } catch (error) {
      return res.status(500).send({ error: true, message: error.message });
          
    }
})
module.exports = {
    todoRouter
}