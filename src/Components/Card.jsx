import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaEdit, FaTrash } from "react-icons/fa";
import EditCardForm from "../Components/EditCardForm";

const Card = ({ card, onDragStart, onEdit, onDelete }) => {
  const [showActions, setShowActions] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const handleEditClick = () => {
    setShowEditForm(true);
  };

  const handleEditSave = (editedValues) => {
    onEdit(card._id, editedValues);
    setShowEditForm(false);
  };

  const handleEditCancel = () => {
    setShowEditForm(false);
  };

  const handleDeleteClick = () => {
    onDelete(card._id);
  };

  return (
    <div
      draggable
      className="card"
      onDragStart={(e) => onDragStart(e, card._id)}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {showEditForm ? (
        <EditCardForm
          card={card}
          onSave={handleEditSave}
          onCancel={handleEditCancel}
        />
      ) : (
        <>
          <h4>{card.title}</h4>
          <p>
            <b>
              {" "}
              <span className="task-card">Task Summary:</span>
            </b>{" "}
            {card.summary}
          </p>
          <p>
            <b>
              {" "}
              <span className="task-card">Task Description:</span>{" "}
            </b>
            {card.description}
          </p>
          <p>
            {" "}
            <b>
              <span className="task-card">Assignee:</span>{" "}
            </b>
            {card.assignee}
          </p>

          {showActions && (
            <div className="card-actions">
              <span onClick={handleEditClick}>
                <FaEdit />
              </span>
              <span onClick={handleDeleteClick}>
                <FaTrash />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    assignee: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }),
  onDragStart: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Card;
