import React, { useState } from "react";
import styled from "styled-components";

const TaskContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  background-color: ${(props) => props.priorityColor || "#f5f5f5"};
`;

const TaskText = styled.span`
  flex-grow: 1;
  margin-left: 10px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const EditButton = styled.button`
  background-color: #ffc107;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: #e0a800;
  }
`;

const DeleteButton = styled.button`
  background-color: #ff6347;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: #ff4500;
  }
`;

const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  width: 300px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const SaveButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 20px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #218838;
  }
`;

const CancelButton = styled.button`
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 20px;
  cursor: pointer;
  margin-top: 10px;
  margin-right: 10px;

  &:hover {
    background-color: #5a6268;
  }
`;

const PopupInput = styled.input`
  padding: 12px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1),
      0 0 8px rgba(0, 123, 255, 0.6);
  }
`;

const PopupSelect = styled.select`
  padding: 12px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  background-color: white;
  cursor: pointer;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1),
      0 0 8px rgba(0, 123, 255, 0.6);
  }
`;

const Task = ({ task, onDelete, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);
  const [editedPriority, setEditedPriority] = useState(task.priority);

  const priorityColors = {
    High: "#ffcccb",
    Medium: "#fffacd",
    Low: "#d3ffd3",
  };

  const handleSave = () => {
    onSave(task.id, editedText, editedPriority);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  return (
    <>
      <TaskContainer priorityColor={priorityColors[task.priority]}>
        <TaskText>{task.text}</TaskText>
        <ButtonGroup>
          <EditButton onClick={() => setIsEditing(true)}>Edit</EditButton>
          <DeleteButton onClick={() => onDelete(task.id)}>Delete</DeleteButton>
        </ButtonGroup>
      </TaskContainer>
      {isEditing && (
        <>
          <Overlay onClick={() => setIsEditing(false)} />
          <Popup>
            <h3>Edit Task</h3>
            <PopupInput
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <PopupSelect
              value={editedPriority}
              onChange={(e) => setEditedPriority(e.target.value)}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </PopupSelect>
            <div>
              <CancelButton onClick={() => setIsEditing(false)}>
                Cancel
              </CancelButton>
              <SaveButton onClick={handleSave}>Save</SaveButton>
            </div>
          </Popup>
        </>
      )}
    </>
  );
};

export default Task;
