import React from "react";
import "../Styles/CreateCardPopup.css";

const CreateCardPopup = ({
  showPopup,
  onClose,
  newCardTitle,
  newCardSummary,
  newCardDescription,
  newCardAssignee,
  onChangeTitle,
  onChangeSummary,
  onChangeDescription,
  onChangeAssignee,
  onAddCard,
  tasks,
}) => {
  const handleAddCard = () => {
    //add to card logics are here
    onAddCard({
      title: newCardTitle,
      summary: newCardSummary,
      description: newCardDescription,
      assignee: newCardAssignee,
    });

    // Close the popup after adding the card
    onClose();
  };

  return (
    showPopup && (
      <div className="popup">
        <div className="popup-inner">
          <h2>Create New Task</h2>

          {/* Display existing tasks above the form */}
          {tasks && tasks.length > 0 && (
            <div className="existing-tasks">
              <h3>Existing Tasks</h3>
              <ul>
                {tasks.map((task) => (
                  <li key={task.id}>{task.title}</li>
                ))}
              </ul>
            </div>
          )}

          <form>
            <label htmlFor="newCardTitle" className="form-label">
              Task Title:
            </label>
            <input
              type="text"
              id="newCardTitle"
              className="form-control"
              value={newCardTitle}
              onChange={(e) => onChangeTitle(e.target.value)}
              aria-label="Card Title"
            />

            <label htmlFor="newCardSummary" className="form-label">
              Task Summary:
            </label>
            <input
              type="text"
              id="newCardSummary"
              className="form-control"
              value={newCardSummary}
              onChange={(e) => onChangeSummary(e.target.value)}
              aria-label="Card Summary"
            />

            <label htmlFor="newCardDescription" className="form-label">
              Task Description:
            </label>
            <textarea
              id="newCardDescription"
              className="form-control"
              value={newCardDescription}
              onChange={(e) => onChangeDescription(e.target.value)}
              aria-label="Card Description"
            ></textarea>

            <label htmlFor="newCardAssignee" className="form-label">
              Assignee:
            </label>
            <input
              type="text"
              id="newCardAssignee"
              className="form-control"
              value={newCardAssignee}
              onChange={(e) => onChangeAssignee(e.target.value)}
              aria-label="Assignee"
            />

            <button
              className="btn btn-success mt-2"
              onClick={handleAddCard}
              disabled={
                !newCardTitle ||
                !newCardSummary ||
                !newCardDescription ||
                !newCardAssignee
              }
            >
              Add Task
            </button>
            <button className="btn btn-secondary mt-2" onClick={onClose}>
              Cancel
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default CreateCardPopup;
