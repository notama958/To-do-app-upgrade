import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import Moment from 'react-moment';
/**
 * To apply style before and while dragging items
 * @param {Boolean} isDragging
 * @param {Object} draggableStyle
 * @param {String} droppableId
 * @returns Object
 */
const getItemStyle = (isDragging, draggableStyle, droppableId) => ({
  userSelect: 'none',
  padding: '10px',
  margin: `5px`,
  marginBottom: '10px',
  border: ' thin solid black',
  textDecoration: droppableId === 'finished' ? 'line-through' : 'none',
  // change background colour if dragging
  background: isDragging ? 'gold' : 'white',
  borderRadius: '0.5em',
  // styles we need to apply on draggables
  ...draggableStyle,
});
/**
 *
 * This child component renders one draggable item
 *
 */
const DragItem = ({ item, index, droppableId }) => {
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
          {item.desc} <small>- {item.tag}</small>
          <p>
            <i>
              created on{' '}
              <Moment format="DD/MM/YYYY hh:mm A">{item.created}</Moment>
            </i>
          </p>
        </div>
      )}
    </Draggable>
  );
};

const mapStateToProps = ({ dashboard }) => ({
  tasks: dashboard.tasks,
  currentTag: dashboard.currentTag,
});
export default connect(mapStateToProps)(DragItem);
