import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
//components
import Navbar from '../layout/Navbar';
import DragItem from '../layout/DragItem';
import Spinner from '../layout/Spinner';
//actions
import { modifyTask } from '../../actions/dashboard';
import { setAlert, taskLoading } from '../../actions/alert';

// get onGoing list and Finished list
const getData = (list) => {
  let onGoing = [],
    finished = [];
  onGoing = list.filter((el) => el.status === 0);
  finished = list.filter((el) => el.status === 1);
  return { onGoing: onGoing, finished: finished };
};
// styling for drag container
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'grey' : 'whitesmoke',
  padding: '5px',
  width: '100%',
  margin: 'auto',
  position: 'relative',
  height: '300px',
  overflowY: 'scroll',
});
// reorder within droppable container
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};
// move between droppable container
const move = (
  source,
  destination,
  droppableSource,
  droppableDestination,
  modifyTask
) => {
  const sourceClone = Array.from(source); // clone source arr
  const destClone = Array.from(destination); // clone destination arr
  const [removed] = sourceClone.splice(droppableSource.index, 1); // remove from source
  if (droppableDestination.droppableId === 'droppable-2') {
    removed.status = 1;
  } else if (droppableDestination.droppableId === 'droppable-1') {
    removed.status = 0;
  }
  modifyTask(removed);
  destClone.splice(droppableDestination.index, 0, removed); // add to destination
  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;
  return result;
};

/**
 * This component renders sided-by-side table for all tasks,
 * user can quickly switch the status of the task by drag and drop
 * between the 2 tables
 * @param {*} store's props and functions to modify db at actions/dashboard
 * @returns
 */
const Kanban = ({ modifyTask, task_loading, taskLoading, tasks }) => {
  const [list, setList] = useState([]); // hodl current list
  const [onGoing, setOnGoing] = useState([]); // hold on-going list
  const [finished, setFinished] = useState([]); // hold completed list
  const [isError, setIsError] = useState(false); // if sthing wrong happens
  useEffect(() => {
    // calling all tasks
    // divide into on-going and finished
    //
    const res = async () => {
      setIsError(false);
      taskLoading();
      try {
        const result = await axios('/api/list/me');
        setList(result.data);
        setOnGoing(getData(result.data).onGoing);
        setFinished(getData(result.data).finished);
      } catch (err) {
        setIsError(true);
        setAlert('SOMETHING WRONG', 'danger');
      }
      taskLoading(false);
    };
    res();
  }, [tasks, taskLoading]);
  // When the Drag action ends
  // Case 1: user drag outside droppable container
  // Case 2: Drop within the initial droppable  container
  // Case 3: Drop between the droppable containers
  const onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    // drop within the container
    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        source.droppableId === 'droppable-1' ? onGoing : finished,
        source.index,
        destination.index
      );
      destination.droppableId === 'droppable-1'
        ? setOnGoing(items)
        : setFinished(items);
    } else {
      // drop between the containers
      const result = move(
        source.droppableId === 'droppable-1' ? onGoing : finished,
        destination.droppableId === 'droppable-1' ? onGoing : finished,
        source,
        destination,
        modifyTask
      );
      Object.keys(result).forEach((key) => {
        key === 'droppable-1'
          ? setOnGoing(result[key])
          : setFinished(result[key]);
      });
    }
  };
  return (
    <div className="kanban-container">
      <Navbar />
      <section className="kanban">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="to-do">
            <div className="kanban-header">
              <label>On-going</label>
            </div>
            <div className="kanban-content">
              <Droppable droppableId="droppable-1" key="droppable-1">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    {task_loading || list.length === 0 ? (
                      <Spinner />
                    ) : (
                      onGoing.map((item, index) => (
                        <DragItem
                          item={item}
                          index={index}
                          droppableId="ongoing"
                          key={index}
                        />
                      ))
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>

          <div className="completed">
            <div className="kanban-header">
              <label>Completed</label>
            </div>
            <div className="kanban-content">
              <Droppable droppableId="droppable-2" key="droppable-2">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    {task_loading || list.length === 0 ? (
                      <Spinner />
                    ) : (
                      finished.map((item, index) => (
                        <DragItem
                          item={item}
                          index={index}
                          droppableId="finished"
                          key={index}
                        />
                      ))
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>{' '}
            </div>
          </div>
        </DragDropContext>
      </section>
    </div>
  );
};
Kanban.propTypes = {
  modifyTask: PropTypes.func.isRequired,
  taskLoading: PropTypes.func.isRequired,
};
const mapStateToProps = ({ dashboard }) => ({
  task_loading: dashboard.task_loading,
  tasks: dashboard.tasks,
});
export default connect(mapStateToProps, {
  modifyTask,
  taskLoading,
})(Kanban);
