import React from "react";
import styled from "@emotion/styled";
import TrelloCard from "./TrelloCard";
import TrelloActionButton from "./TrelloActionButton";
import { Droppable, Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #dfe3e6;
  border-radius: 3px;
  width: 270px;
  min-width: 270px;
  margin-right: 10px;
  padding: 12px;
  transition: 0.1s ease-in-out;
  .cards-container {
    h4 {
      padding: 0 7.5px 10px;
      margin: 0;
      font-size: 16px;
    }
    .card-list {
      min-height: 0.5px;
    }
  }
`;

const TrelloList = ({ list, handleAddCard, index }) => {
  const { id, title, cards } = list;
  return (
    <Draggable draggableId={`${id}${index}`} index={index}>
      {provided => (
        <div
          className='draggable-list'
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          <Droppable droppableId={id.toString()} type="card">
            {(provided, snapshot) => (
              <Container isDraggingOver={snapshot.isDraggingOver}>
                <div className='cards-container'>
                  <h4>{title}</h4>
                  <div className='card-list' ref={provided.innerRef} {...provided.droppableProps}>
                    {cards.map((c, i) => (
                      <TrelloCard key={`${id}_${c.id}_${i}`} card={c} index={i} listId={id} />
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
                <TrelloActionButton handleAddElement={handleAddCard} listId={id} />
              </Container>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default TrelloList;
