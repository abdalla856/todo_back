const Todo = require("../models/Todo.js");

exports.getTodos = async (req, res) => {
  try {
    const { id } = req.params;
    const todos = await Todo.find({ "user_id": id });
    res.status(200).json(todos.map((todo) => todo.toObject({ getter: true })));
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.addTodo = async (req, res) => {
  try {
    const { userId, text } = req.body;
    const todo = new Todo({ text: text, user_id: userId });

    await todo.save();
    res.json({ success: true, message: "Todo added successfully!", todo });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id, text, time } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { text: text, date: time },
      { returnDocument: "after" }
    );
    res.status(200).json(updatedTodo);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};


exports.deleteTodo = async (req , res)=>{
    try{

        const {id} = req.params;
        await Todo.findByIdAndDelete(id)
        res.status(200).json({message :"deleted successfully"})
    }catch(err){
        console.log(err.message);
    }
}