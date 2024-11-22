let tasks = [];
let taskId = 1;

exports.getTasks = () => tasks;

exports.addTask = (title, description) => {
    tasks.push({ id: taskId++, title, description, completed: false });
};

exports.updateTask = (id, title, description) => {
    const task = tasks.find(task => task.id == id);
    if (task) {
        task.title = title;
        task.description = description;
    }
};

exports.deleteTask = (id) => {
    tasks = tasks.filter(task => task.id != id);
};
