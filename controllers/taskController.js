const taskModel = require('../models/taskModel');

exports.getTasks = (req, res) => {
    res.render('index', { tasks: taskModel.getTasks() });
};

exports.addTask = (req, res) => {
    const { title, description } = req.body;
    taskModel.addTask(title, description);
    res.redirect('/');
};

exports.editTask = (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    taskModel.updateTask(id, title, description);
    res.redirect('/');
};

exports.deleteTask = (req, res) => {
    const { id } = req.params;
    taskModel.deleteTask(id);
    res.redirect('/');
};
