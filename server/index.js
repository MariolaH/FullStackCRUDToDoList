// Import the required modules
const express = require("express"); // Import the Express framework for building the API
const app = express(); // Initialize the Express application
const cors = require("cors"); // Import CORS to enable Cross-Origin Resource Sharing
const pool = require("./db"); // Import the database connection from the db.js file

require("dotenv").config(); // Load environment variables from a .env file

// Middleware
app.use(cors()); // Enable CORS for allowing requests from different origins
app.use(express.json()); // Middleware to parse incoming JSON requests (makes `req.body` accessible)

// Routes

// Create a todo
app.post("/todos", async (req, res) => {
    try {
        // Extract the description from the request body
        const { description } = req.body;

        // Insert the description into the 'todo' table and return the newly created row
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *",
            [description]
        );

        // Send the first row of the result (the newly created todo) as a JSON response
        res.json(newTodo.rows[0]);
    } catch (err) {
        // Log any errors that occur to the console
        console.error(err.message);
    }
});

// Get all todos
app.get("/todos", async (req, res) => {
    try {
        // Fetch all rows from the 'todo' table
        const allTodos = await pool.query("SELECT * FROM todo");

        // Send all the rows as a JSON response
        res.json(allTodos.rows);
    } catch (err) {
        // Log any errors that occur to the console
        console.error(err.message);
    }
});

// Get a single todo by ID
app.get("/todos/:id", async (req, res) => {
    try {
        // Extract the `id` from the request parameters
        const { id } = req.params;

        // Fetch the todo with the specified `id` from the 'todo' table
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);

        // Send the first row of the result as a JSON response
        res.json(todo.rows[0]);
    } catch (err) {
        // Log any errors that occur to the console
        console.error(err.message);
    }
});

// Update a todo by ID
app.put("/todos/:id", async (req, res) => {
    try {
        // Extract the `id` from the request parameters and `description` from the request body
        const { id } = req.params;
        const { description } = req.body;

        // Update the description of the todo with the specified `id`
        await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2",
            [description, id]
        );

        // Send a confirmation message as a JSON response
        res.json("Todo was updated");
    } catch (err) {
        // Log any errors that occur to the console
        console.error(err.message);
    }
});

// Delete a todo by ID
app.delete("/todos/:id", async (req, res) => {
    try {
        // Extract the `id` from the request parameters
        const { id } = req.params;

        // Delete the todo with the specified `id` from the 'todo' table
        await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);

        // Send a confirmation message as a JSON response
        res.json("Todo was deleted");
    } catch (err) {
        // Log any errors that occur to the console
        console.error(err.message);
    }
});

// Start the server and listen on port 5001
app.listen(5001, () => {
    console.log("server is running on port 5001");
});
