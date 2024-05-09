const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let todos = [];

// GET all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// GET single todo
app.get("/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).send("Todo not found");
  }
});

// POST new todo
app.post("/todos", (req, res) => {
  const todo = {
    id: todos.length + 1,
    title: req.body.title,
  };
  todos.push(todo);
  res.status(201).json(todo);
});

// PUT update existing todo
app.put("/todos/:id", (req, res) => {
  const index = todos.findIndex((t) => t.id === parseInt(req.params.id));
  if (index >= 0) {
    todos[index] = { ...todos[index], ...req.body };
    res.json(todos[index]);
  } else {
    res.status(404).send("Todo not found");
  }
});

// DELETE a todo
app.delete("/todos/:id", (req, res) => {
  const index = todos.findIndex((t) => t.id === parseInt(req.params.id));
  if (index >= 0) {
    todos = todos.filter((t) => t.id !== parseInt(req.params.id));
    res.status(200).send("Delete Complete");
  } else {
    res.status(404).send("Todo not found");
  }
});

app.listen(port, () => {
  console.log(`Todo List API server listening at http://localhost:${port}`);
});
