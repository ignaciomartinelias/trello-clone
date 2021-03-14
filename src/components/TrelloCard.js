import React from "react";
import styled from "@emotion/styled";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  margin-bottom: 7.5px;
  padding: 7.5px;
  background: ${props => (props.isDragging ? "#122429" : "white")};
  border-radius: 3px;
  transition: .25s ease-in-out;
  span {
    color: ${props => (props.isDragging ? "white" : "#666")};
    font-size: 14px;
    word-break: break-word;
  }
`;

const TrelloCard = ({ listId, card, index }) => {
  return (
    <Draggable draggableId={`${listId} ${card.id}`} index={index}>
      {(provided, snapshot) => (
        <Container ref={provided.innerRef} isDragging={snapshot.isDragging} {...provided.draggableProps} {...provided.dragHandleProps}>
          <span>{card.text}</span>
        </Container>
      )}
    </Draggable>
  );
};

export default TrelloCard;
