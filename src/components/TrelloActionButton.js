import React, { useState } from "react";
import Icon from "@material-ui/core/Icon";
import styled from "@emotion/styled";
import TextareaAutosize from "react-textarea-autosize";

const Container = styled.div`
  display: flex;
  align-items: center;
  height: fit-content;
  cursor: pointer;
  width: 100%;
  border-radius: 3px;
  padding: 7.5px;
  color: ${props => (props.isList ? "white" : "rgba(0,0,0,.5)")};
  background: ${props => (props.isList ? "rgba(0,0,0,.25)" : "transparent")};
  white-space: nowrap;
  font-size: ${props => (props.isList ? "16px" : "14px")};
  &:hover {
    background: ${props => (props.isList ? "rgba(0,0,0,.5)" : "rgba(0,0,0,.25)")};
    color: ${props => (props.isList ? "white" : "rgba(0,0,0,.75)")};
  }
  span {
    white-space: nowrap;
  }
  .add-icon {
    font-size: ${props => (props.isList ? "22px" : "20px")};
  }
`;

const InputWrapper = styled.div`
  textarea {
    resize: none;
    width: 100%;
    padding: 7.5px;
    border: none;
    outline: none;
    overflow: hidden;
    margin-bottom: 7.5px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
      "Helvetica Neue", sans-serif;
    font-size: 14px;
    border-radius: 3px;
  }
  .buttons-container {
    display: flex;
    align-items: center;
    button {
      background: #5aac44;
      padding: ${props => (props.isList ? "8px 10px" : "7.5px")};
      color: white;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
        "Helvetica Neue", sans-serif;
      font-size: ${props => (props.isList ? "16px" : "14px")};
      border-radius: 3px;
      border: none;
      width: fit-content;
      cursor: pointer;

      &:focus {
        outline: none;
      }
      &:disabled {
        opacity: 0.75;
        cursor: default;
      }
    }
    span {
      font-size: 28px;
      color: white;
      margin-left: 5px;
      cursor: pointer;
    }
  }
`;

const TrelloActionButton = ({ isList, listId, handleAddElement }) => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const handleAdd = () => {
    handleAddElement(text, listId);
    handleClose()
  };

  const handleClose = () => {
    setOpen(false);
    setText("");  
  }

  const handleKeyDown = event => {
    if (event.key === "Enter" && text.trim()) {
      handleAdd();
    }
  };

  const element = isList ? "list" : "card";

  return (
    <>
      {open ? (
        <InputWrapper isList={isList}>
          <TextareaAutosize
            value={text}
            placeholder={`Enter a title for this ${element}...`}
            onChange={e => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            minRows={2}
          />
          <div className='buttons-container'>
            <button disabled={!text.trim()} onClick={handleAdd}>
              Add {element}
            </button>
            <Icon onClick={handleClose}>close</Icon>
          </div>
        </InputWrapper>
      ) : (
        <Container isList={isList} onClick={() => setOpen(true)}>
          <Icon className="add-icon">add</Icon>
          <span>Add another {element}</span>
        </Container>
      )}
    </>
  );
};

export default TrelloActionButton;
