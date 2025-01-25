import React, { Fragment, useState } from "react"; // Import React, Fragment for grouping elements, and useState for state management

// EditTodo component to handle editing an individual todo
const EditTodo = ({ todo }) => {
  // State to manage the description input value
  const [description, setDescription] = useState(todo.description);

  // Function to handle updating the todo description
  const updateDescription = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior (e.g., page refresh)
    try {
      // Create a request body with the updated description
      const body = { description };

      // Make a PUT request to the backend to update the todo
      const response = await fetch(
        `http://localhost:5001/todos/${todo.todo_id}`, // Endpoint for the specific todo by ID
        {
          method: "PUT", // Specify HTTP method as PUT for updating
          headers: { "Content-Type": "application/json" }, // Set request headers for JSON data
          body: JSON.stringify(body), // Convert the body object to a JSON string
        }
      );

      // Redirect to the homepage to refresh the list of todos
      window.location = "/";
    } catch (err) {
      // Log any errors to the console
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      {/* Button to open the modal for editing */}
      <button
        type="button"
        className="btn btn-warning" // Bootstrap class for styling
        data-toggle="modal" // Bootstrap attribute to trigger the modal
        data-target={`#id${todo.todo_id}`} // Unique ID for the modal based on the todo ID
        onClick={() => setDescription(todo.description)} // Reset the description when opening the modal
      >
        Edit
      </button>

      {/* Modal for editing the todo */}
      <div className="modal" id={`id${todo.todo_id}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            {/* Modal header */}
            <div className="modal-header">
              <h4 className="modal-title">Edit Todo</h4>
              {/* Close button to dismiss the modal */}
              <button
                type="button"
                className="close" // Bootstrap class for close button styling
                data-dismiss="modal" // Bootstrap attribute to dismiss the modal
                onClick={() => setDescription(todo.description)} // Reset the description when closing the modal
              >
                &times; {/* Close icon */}
              </button>
            </div>

            {/* Modal body with input for editing the description */}
            <div className="modal-body">
              <input
                className="form-control" // Bootstrap class for input styling
                value={description} // Bind the input value to the description state
                onChange={(e) => setDescription(e.target.value)} // Update the state when the input value changes
              />
            </div>

            {/* Modal footer with action buttons */}
            <div className="modal-footer">
              {/* Button to submit the updated description */}
              <button
                type="button"
                className="btn btn-warning" // Bootstrap class for warning button styling
                data-dismiss="modal" // Dismiss the modal after clicking
                onClick={(e) => updateDescription(e)} // Call the updateDescription function
              >
                Edit
              </button>
              {/* Button to close the modal without saving changes */}
              <button
                type="button"
                className="btn btn-danger" // Bootstrap class for danger button styling
                data-dismiss="modal" // Dismiss the modal after clicking
                onClick={() => setDescription(todo.description)} // Reset the description to its original value
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditTodo; // Export the EditTodo component to be used in other parts of the application


// Breaking Down onChange={(e) => setDescription(e.target.value)}:
// What is onChange?

// The onChange attribute is a React event handler.
// It is triggered whenever the value of the input field changes (e.g., when the user types into the input).
// What is (e)?

// e is short for "event."
// It represents the event object generated when the user interacts with the input field.
// What is e.target?

// e.target refers to the DOM element that triggered the event, in this case, the <input> element.
// What is e.target.value?

// e.target.value is the current value of the input field (i.e., what the user has typed in so far).
// As the user types into the input field, this value is updated dynamically.
// What does setDescription(e.target.value) do?

// setDescription is the state setter function created by useState.
// It updates the description state variable with the new value of the input field (e.target.value).
// Why is this needed?

// In React, input fields are often controlled components. This means their value is managed by the component's state.
// As the user types, the onChange handler ensures that the input field stays synchronized with the description state.