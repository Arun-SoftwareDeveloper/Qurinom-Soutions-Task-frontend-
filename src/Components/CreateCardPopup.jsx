// CreateCardPopup.js

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
    // Add logic to save the new card or perform necessary actions

    // Close the popup after adding the card
    onClose();
  };

  return (
    showPopup && (
      <div className="popup">
        <div className="popup-inner">
          <h2>Create New Card</h2>

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
              Card Title:
            </label>
            <input
              type="text"
              id="newCardTitle"
              className="form-control"
              value={newCardTitle}
              onChange={(e) => onChangeTitle(e.target.value)}
            />

            <label htmlFor="newCardSummary" className="form-label">
              Card Summary:
            </label>
            <input
              type="text"
              id="newCardSummary"
              className="form-control"
              value={newCardSummary}
              onChange={(e) => onChangeSummary(e.target.value)}
            />

            <label htmlFor="newCardDescription" className="form-label">
              Card Description:
            </label>
            <textarea
              id="newCardDescription"
              className="form-control"
              value={newCardDescription}
              onChange={(e) => onChangeDescription(e.target.value)}
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
              Add Card
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
