import React, { useState, useEffect } from "react";
import "../Styles/DashBoard.css";
import Card from "../Components/Card";
import CreateCardPopup from "../Components/CreateCardPopup";
import { FaSignOutAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

const Dashboard = ({ user, onLogout }) => {
  const [cards, setCards] = useState([]);
  const [newCardTitle, setNewCardTitle] = useState("");
  const [newCardSummary, setNewCardSummary] = useState("");
  const [newCardDescription, setNewCardDescription] = useState("");
  const [newCardAssignee, setNewCardAssignee] = useState("Arun Ramasmay");
  const [todoCards, setTodoCards] = useState([]);
  const [inProgressCards, setInProgressCards] = useState([]);
  const [doneCards, setDoneCards] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const storedCards = JSON.parse(localStorage.getItem("cards")) || [];
    setCards(storedCards);
    organizeCards(storedCards);
  }, []);

  const organizeCards = (allCards) => {
    const todo = allCards.filter((card) => card.status === "TO_DO");
    const inProgress = allCards.filter((card) => card.status === "IN_PROGRESS");
    const done = allCards.filter((card) => card.status === "DONE");

    setTodoCards(todo);
    setInProgressCards(inProgress);
    setDoneCards(done);
  };

  const handleAddCard = () => {
    if (
      !newCardTitle ||
      !newCardSummary ||
      !newCardDescription ||
      !newCardAssignee
    ) {
      console.error("Please enter title, summary, description, and assignee.");
      return;
    }

    const newCard = {
      _id: Date.now().toString(),
      title: newCardTitle,
      summary: newCardSummary,
      description: newCardDescription,
      assignee: newCardAssignee,
      status: "TO_DO",
    };

    setCards((prevCards) => [...prevCards, newCard]);
    organizeCards([...cards, newCard]);

    localStorage.setItem("cards", JSON.stringify([...cards, newCard]));

    setNewCardTitle("");
    setNewCardSummary("");
    setNewCardDescription("");
    setNewCardAssignee("Arun Ramasamy");
    setShowCreateForm(false);
    toast.success("Task created successfully!");
  };

  const handleEditCard = (cardId, updatedData) => {
    const updatedCards = cards.map((card) =>
      card._id === cardId ? { ...card, ...updatedData } : card
    );

    setCards(updatedCards);
    organizeCards(updatedCards);

    localStorage.setItem("cards", JSON.stringify(updatedCards));
  };

  const handleDeleteCard = (cardId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this card?"
    );
    if (isConfirmed) {
      const updatedCards = cards.filter((card) => card._id !== cardId);

      setCards(updatedCards);
      organizeCards(updatedCards);

      localStorage.setItem("cards", JSON.stringify(updatedCards));
    }
  };

  const handleDragStart = (e, cardId) => {
    e.dataTransfer.setData("text/plain", cardId);
  };

  const handleDrop = (e, newStatus) => {
    const cardId = e.dataTransfer.getData("text/plain");
    handleCardMove(cardId, newStatus);
  };

  const handleCardMove = (cardId, newStatus) => {
    const updatedCards = cards.map((card) =>
      card._id === cardId ? { ...card, status: newStatus } : card
    );

    setCards(updatedCards);
    organizeCards(updatedCards);

    localStorage.setItem("cards", JSON.stringify(updatedCards));
  };

  const handleCancel = () => {
    setShowCreateForm(false);
    setNewCardTitle("");
    setNewCardSummary("");
    setNewCardDescription("");
    setNewCardAssignee("Arun Ramasamy");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddCard();
    }
  };

  const handleCreatePopup = () => {
    setShowPopup(true);
  };

  return (
    <div className="container-fluid">
      <div className="dashboard-container">
        <div className="header">
          <h2 className="welcome-text">Welcome, {user.email}!</h2>
          <button className="btn btn-danger" onClick={onLogout}>
            Logout <FaSignOutAlt />
          </button>
        </div>

        <div className="add-card-form">
          <button className="btn btn-primary mt-2" onClick={handleCreatePopup}>
            <i class="fa-solid fa-plus"></i> Create
          </button>

          <CreateCardPopup
            showPopup={showPopup}
            onClose={() => setShowPopup(false)}
            newCardTitle={newCardTitle}
            newCardSummary={newCardSummary}
            newCardDescription={newCardDescription}
            newCardAssignee={newCardAssignee}
            onChangeTitle={setNewCardTitle}
            onChangeSummary={setNewCardSummary}
            onChangeDescription={setNewCardDescription}
            onChangeAssignee={setNewCardAssignee}
            onAddCard={handleAddCard}
          />
        </div>

        <div className="card-container">
          <div
            className="column"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, "TO_DO")}
          >
            <h3 className="task-heading">To Do</h3>
            {todoCards.map((card) => (
              <Card
                key={card._id}
                card={card}
                onDragStart={handleDragStart}
                onEdit={handleEditCard}
                onDelete={handleDeleteCard}
              />
            ))}
          </div>

          <div
            className="column"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, "IN_PROGRESS")}
          >
            <h3 className="task-heading">In Progress</h3>
            {inProgressCards.map((card) => (
              <Card
                key={card._id}
                card={card}
                onDragStart={handleDragStart}
                onEdit={handleEditCard}
                onDelete={handleDeleteCard}
              />
            ))}
          </div>

          <div
            className="column"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, "DONE")}
          >
            <h3 className="task-heading">Done</h3>
            {doneCards.map((card) => (
              <Card
                key={card._id}
                card={card}
                onDragStart={handleDragStart}
                onEdit={handleEditCard}
                onDelete={handleDeleteCard}
              />
            ))}
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
