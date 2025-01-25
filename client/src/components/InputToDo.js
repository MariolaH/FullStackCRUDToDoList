import React, { Fragment, useState } from "react"; // Import React, Fragment for grouping, and useState for state management

// InputTodo component
const InputTodo = () => {
  // State to manage the input field's value (description of the todo)
  const [description, setDescription] = useState("");

  // Function to handle form submission
  const onSubmitForm = async (e) => {
    // Prevent the default behavior of the form submission (e.g., page refresh)
    e.preventDefault();

    try {
      // Create an object to send in the request body
      const body = { description };

      // Make a POST request to the backend to add a new todo
      const response = await fetch("http://localhost:5001/todos/", {
        method: "POST", // Specify the HTTP method
        headers: { "Content-Type": "application/json" }, // Specify that the request body is JSON
        body: JSON.stringify(body), // Convert the `body` object to a JSON string
      });

      // Redirect to the homepage after adding the todo
      window.location = "/";
    } catch (err) {
      // Log any errors that occur to the console
      console.error(err.message);
    }
  };

  // Render the component
  return (
    <Fragment>
      {/* Header for the todo list */}
      <h1 className="text-center mt-5">PERN Todo List</h1>
      
      {/* Form for adding a new todo */}
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        {/* Input field for the todo description */}
        <input
          type="text" // Input type is text
          className="form-control" // Bootstrap class for styling the input
          value={description} // Bind the input value to the state
          onChange={(e) => setDescription(e.target.value)} // Update the state when the input value changes
        />
        {/* Submit button to add the new todo */}
        <button className="btn btn-success">Add</button>
      </form>
    </Fragment>
  );
};

export default InputTodo; // Export the InputTodo component for use in other parts of the application
