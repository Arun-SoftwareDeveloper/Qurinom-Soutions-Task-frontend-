// EditCardForm.js

import React, { useState } from "react";
import PropTypes from "prop-types";

const EditCardForm = ({ card, onSave, onCancel }) => {
  const [editedValues, setEditedValues] = useState({
    title: card.title,
    summary: card.summary,
    description: card.description,
    assignee: card.assignee,
  });

  const handleChange = (field, value) => {
    setEditedValues((prevValues) => ({ ...prevValues, [field]: value }));
  };

  const handleSave = () => {
    onSave(editedValues);
  };

  return (
    <div className="edit-form">
      <label htmlFor="editTitle" className="form-label">
        Task Title:
      </label>
      <input
        type="text"
        id="editTitle"
        className="form-control"
        value={editedValues.title}
        onChange={(e) => handleChange("title", e.target.value)}
      />

      <label htmlFor="editSummary" className="form-label">
        Task Summary:
      </label>
      <input
        type="text"
        id="editSummary"
        className="form-control"
        value={editedValues.summary}
        onChange={(e) => handleChange("summary", e.target.value)}
      />

      <label htmlFor="editDescription" className="form-label">
        Description:
      </label>
      <input
        type="text"
        id="editDescription"
        className="form-control"
        value={editedValues.description}
        onChange={(e) => handleChange("description", e.target.value)}
      />

      <label htmlFor="editAssignee" className="form-label">
        Assignee:
      </label>
      <input
        type="text"
        id="editAssignee"
        className="form-control"
        value={editedValues.assignee}
        onChange={(e) => handleChange("assignee", e.target.value)}
      />

      <button className="btn btn-success mt-2" onClick={handleSave}>
        Save
      </button>
      <button className="btn btn-secondary mt-2" onClick={onCancel}>
        Cancel
      </button>
    </div>
  );
};

EditCardForm.propTypes = {
  card: PropTypes.shape({
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    assignee: PropTypes.string.isRequired,
  }),
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EditCardForm;
