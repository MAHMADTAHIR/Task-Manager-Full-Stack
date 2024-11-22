const express = require('express');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

let tasks = [];

app.get('/', (req, res) => {
    res.render('layout', { 
        body: `
            <div class="container">
                <h2>Task Manager</h2>
                <form action="/add-task" method="POST" class="task-form">
                    <div class="form-group">
                        <label for="title">Task Title</label>
                        <input type="text" id="title" name="title" placeholder="Enter task title" required>
                    </div>
                    <div class="form-group">
                        <label for="description">Task Description</label>
                        <textarea id="description" name="description" placeholder="Enter task description" required></textarea>
                    </div>
                    <button type="submit" class="btn">Add Task</button>
                </form>
                <ul class="task-list">
                    ${tasks.length > 0 ? tasks.map(task => `
                        <li class="task-item">
                            <div class="task-details">
                                <h3>${task.title}</h3>
                                <p>${task.description}</p>
                            </div>
                            <form action="/delete-task/${task.id}" method="POST" class="delete-form">
                                <button type="submit" class="btn delete-btn">Delete</button>
                            </form>
                        </li>`).join('') 
                        : '<p>No tasks available. Add a new task!</p>'}
                </ul>
            </div>`
    });
});

app.post('/add-task', (req, res) => {
    const { title, description } = req.body;
    tasks.push({ id: tasks.length + 1, title, description });
    res.redirect('/');
});

app.post('/delete-task/:id', (req, res) => {
    const id = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== id);
    res.redirect('/');
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
