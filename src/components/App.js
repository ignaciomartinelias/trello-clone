import React, { useEffect, useRef } from "react";
import TrelloList from "./TrelloList";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import TrelloActionButton from "./TrelloActionButton";
import store from "../store";
import { addList, updateList, setLists } from "../actions/listActions";
import initialData from "../seeds";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import "../index.scss";

const AppContainer = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
    "Helvetica Neue", sans-serif;
  background: #2a484f;
  height: 100vh;
  width: 100%;
  & * {
    box-sizing: border-box;
  }
  h1 {
    margin: 0;
    height: 10vh;
    padding: 0 20px;
    display: flex;
    font-size: 28px;
    color: white;
    align-items: center;
  }
`;

const ListsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  overflow-x: auto;
  padding: 0 20px;
  height: calc(90vh - 10px);
  width: 100%;
  .list-list {
    display: flex;
  align-items: flex-start;
  }
  .add-list-container {
    display: flex;
    flex-direction: column;
    width: 270px;
    min-width: 270px;
    padding-right: 10px;
  }
  &::-webkit-scrollbar {
    height: 10px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.15);
    border-radius: 12px;
    margin: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.25);
    border-radius: 12px;
  }
`;

function App() {
  const lists = useSelector(state => state.listsReducer.lists);
  const listRef = useRef(null);

  const handleAddList = title => {
    const newList = { id: lists.length, title, cards: [] };
    store.dispatch(addList(newList)).then(() => {
      listRef.current.scrollLeft = listRef.current.scrollWidth;
    });
  };

  const handleAddCard = (text, listId) => {
    const list = lists.find(l => l.id === listId);
    list.cards.push({ id: list.cards.length, text });
    store.dispatch(updateList(list));
  };

  const onDragEnd = result => {
    const { destination, source, type } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    type === 'card' ? onCardDrop(source, destination) : onListDrop(source, destination)
  };

  const onCardDrop = (source, destination) => {
    const sourceList = lists.find(l => l.id == source.droppableId);
    const destinationList = lists.find(l => l.id == destination.droppableId);
    const sourceCards = Array.from(sourceList.cards);
    const destinationCards = Array.from(destinationList.cards);
    const card = sourceCards[source.index];
    sourceCards.splice(source.index, 1);
    if (sourceList.id === destinationList.id) {
      sourceCards.splice(destination.index, 0, card);
    } else {
      destinationCards.splice(destination.index, 0, card);
      store.dispatch(updateList({ ...destinationList, cards: destinationCards }));
    }
    store.dispatch(updateList({ ...sourceList, cards: sourceCards }));
  }

  const onListDrop = (source, destination) => {
    const updatedLists = Array.from(lists);
    const list = updatedLists[source.index]
    updatedLists.splice(source.index, 1);
    updatedLists.splice(destination.index, 0, list);
    store.dispatch(setLists(updatedLists));
  }

  useEffect(() => {
    if(localStorage.getItem('trello-clone-lists')) {
      const localData = JSON.parse(localStorage.getItem('trello-clone-lists'));
      store.dispatch(setLists(localData.lists));
    } else {
      store.dispatch(setLists(initialData.lists));
    }
  }, []);

  return (
    <AppContainer>
      <h1>Trello Clone</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={"all-lists"} direction="horizontal" type="list">
          {(provided, snapshot) => (
            <ListsContainer ref={listRef} isDraggingOver={snapshot.isDraggingOver}>
              <div className='list-list' ref={provided.innerRef} {...provided.droppableProps}>
                {lists.map?.((l, i) => (
                  <TrelloList handleAddCard={handleAddCard} key={l.id} list={l} index={i} />
                ))}
                {provided.placeholder}
              </div>
              <div className='add-list-container'>
                <TrelloActionButton isList handleAddElement={handleAddList} />
              </div>
            </ListsContainer>
          )}
        </Droppable>
      </DragDropContext>
    </AppContainer>
  );
}

export default App;
