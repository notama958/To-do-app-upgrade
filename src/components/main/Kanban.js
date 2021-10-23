import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Navbar from '../layout/Navbar';
import DragItem from '../layout/DragItem';
import { loadTaskList, loadTagList, modifyTask } from '../../actions/dashboard';
import { setAlert, setLoading } from '../../actions/alert';
import Spinner from '../layout/Spinner';
import axios from 'axios';
// get onGoing list and Finished list
const getData = (list) => {
  // console.log(list);
  let onGoing = [],
    finished = [];
  onGoing = list.filter((el) => el.status === 'unchecked');
  finished = list.filter((el) => el.status === 'checked');
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
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1); // remove from source
  if (droppableDestination.droppableId === 'droppable-2') {
    removed.status = 'checked';
    console.log('checked them');
  } else if (droppableDestination.droppableId === 'droppable-1') {
    console.log('unchecked them');
    removed.status = 'unchecked';
  }
  modifyTask(removed.id, removed);
  destClone.splice(droppableDestination.index, 0, removed); // add to destination
  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;
  return result;
};

const Kanban = ({ modifyTask }) => {
  const [list, setList] = useState([]);
  const [onGoing, setOnGoing] = useState([]);
  const [finished, setFinished] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [isError, setIsError] = useState(false);
  // setLoading();
  useEffect(() => {
    const res = async () => {
      setIsError(false);
      setIsloading(true);
      try {
        const result = await axios('/list');
        setList(result.data);
        setOnGoing(getData(result.data).onGoing);
        setFinished(getData(result.data).finished);
      } catch (err) {
        setIsError(true);
        setAlert('SOMETHING WRONG', 'danger');
      }
      setIsloading(false);
    };
    res();
  }, []);
  const onDragEnd = (result) => {
    // console.log(result);
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
                    {isLoading || list.length === 0 ? (
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
                    {isLoading || list.length === 0 ? (
                      <Spinner />
                    ) : (
                      finished.map((item, index) => (
                        <DragItem
                          item={item}
                          index={index}
                          droppableId="ongoing"
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
};
const mapStateToProps = ({ dashboard }) => ({
  loading: dashboard.loading,
});
export default connect(mapStateToProps, {
  modifyTask,
})(Kanban);
