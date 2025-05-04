const express = require('express');
const cors = require('cors');
const app = express();
const pg = require('pg');
const PORT = 3000;

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "todo",
    password: "postgres@1q2w3e4r",
    port: 5432,
  });
  db.connect();

app.use(cors());
app.use(express.json());

app.post("/todos", async(req,res) => {
    try {
        const { description } = req.body;
        const newTodo = await db.query(
            "INSERT INTO todos (description) VALUES($1) RETURNING *",
            [description]
        );
        res.json(newTodo.rows[0]);
        
    } catch (error) {
        console.log(error.message);
    }
})

app.get("/todos", async (req,res) => {
    try {
        const allTodos = await db.query("SELECT * FROM todos");
        res.json(allTodos.rows);
    } catch (error) {
        console.error(error.message);
    }
})

app.get("/todos/:id", async(req,res) => {
    try {
        const { id } = req.params;
        const todo = await db.query("SELECT * FROM todos WHERE todo_id = $1",[id]);
        res.json(todo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
})

app.put("/todos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { description } = req.body;
      const updateTodo = await db.query(
        "UPDATE todos SET description = $1 WHERE todo_id = $2",
        [description, id]
      );
      res.json("Todo was updated");
    } catch (error) {
      console.error(error.message);
      res.status(500).json("Internal server error");
    }
  });
  

app.delete("/todos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleteTodo = await db.query("DELETE FROM todos WHERE todo_id = $1", [
        id
      ]);
      res.json("Todo was deleted!");
    } catch (err) {
      console.log(err.message);
    }
  });

app.listen(PORT, () => {
    console.log(`Server running of PORT ${PORT}`);
})