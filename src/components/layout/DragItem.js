import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import { loadTaskList, loadTagList } from '../../actions/dashboard';

const getItemStyle = (isDragging, draggableStyle, droppableId) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: '10px',
  margin: `5px`,
  marginBottom: '10px',
  border: ' thin solid black',
  textDecoration: droppableId === 'finished' ? 'line-through' : 'none',
  // change background colour if dragging
  background: isDragging ? '#fec5bb' : '#F3F3F4',
  borderRadius: '0.5em',
  // styles we need to apply on draggables
  ...draggableStyle,
});

const DragItem = ({ item, index, droppableId, loadTaskList, loadTagList }) => {
  useEffect(() => {
    loadTaskList('all');
    loadTagList();
  }, []);
  // console.log(list);
  return (
    <Draggable
      key={item.id}
      draggableId={item.id}
      index={index}
      droppableId={droppableId}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style,
            droppableId
          )}
        >
          {item.desc}
        </div>
      )}
    </Draggable>
  );
};

DragItem.propTypes = {
  loadTagList: PropTypes.func.isRequired,
  loadTaskList: PropTypes.func.isRequired,
};
const mapStateToProps = ({ dashboard }) => ({
  tasks: dashboard.tasks,
  currentTag: dashboard.currentTag,
});
export default connect(mapStateToProps, { loadTagList, loadTaskList })(
  DragItem
);
