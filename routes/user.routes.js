const express = require("express");
const User = require("../controllers/user.controller.js");
const Todo = require("../controllers/todo.controller")
const UserRoute = express.Router();

UserRoute.post("/signup", User.signup);
UserRoute.post("/login", User.login);
UserRoute.post("/addtodo", Todo.addTodo);
UserRoute.get("/todos/:id", Todo.getTodos);
UserRoute.put("/update_todo" , Todo.updateTodo)
UserRoute.delete('/delete_todo/:id' , Todo.deleteTodo)
module.exports = UserRoute;
