const Todo = require("../models/Todo");

//create
const createTodo = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) {
            return res.status(400).json({
                message: "Title is required",
            });
        }
        const todo = await Todo.create({
            title,
        });
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({
            message: "Failed to create todo",
            error: error.message,
        });
    }
}

const getTodos = async (req, res) => {
    try {
        const todo = await Todo.find().sort({
            createdAt: -1,
        });
        res.status(200).json(todo)
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch todos",
            error: error.message,
        });
    }
};

const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;

        const todo = await Todo.findByIdAndUpdate(id, {
            title,
            completed,
        },
            {
                new: true,
                runValidators: true,
            });
        if (!todo) {
           return res.status(404).json({
                message: "Todo not found",
            });
        }
        res.status(200).json(todo)
    } catch (error) {
        res.status(500).json({
            message: "Failed to update todo",
            error: error.message,
        });
    }
};

const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findByIdAndDelete(id);
if(!todo){
    return res.status(404).json({
        message:"Todo not found",
    });
}
res.status(200).json({
    message: "Todo delete successfully",
});
    } catch(error){
        res.status(500).json({
            message:"Failed to delete todo",
            error: error.message,
        });
    }
};

module.exports={
    createTodo,
    updateTodo,
    deleteTodo,
    getTodos
};