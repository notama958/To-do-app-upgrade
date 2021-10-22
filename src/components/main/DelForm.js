import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setLoading } from '../../actions/alert';
import {
  toggleDelForm,
  toggleBackDrop,
  loadTagList,
  loadTaskList,
} from '../../actions/dashboard';
import Moment from 'react-moment';
const DelForm = ({
  toggleDelForm,
  toggleBackDrop,
  delItem,
  type,
  setLoading,
  delFunc,
  tasks,
}) => {
  const [isTask, setIsTask] = useState(type === 'task' ? true : false);
  const [isTag, setIsTag] = useState(type === 'tag' ? true : false);
  const [id, setId] = useState(delItem.item.id);

  return (
    <div className="tag-form">
      <div className="modal__header">
        <label>⚠️Delete this item⚠️</label>
      </div>
      <div className=" modal__layout">
        <label>❌Action cannot be undone❌</label>
        {isTask ? (
          <p
            style={{
              overflowY: 'scroll',
              width: '100%',
              overflowWrap: 'break-word',
              height: '50px',
            }}
          >
            {delItem.item.desc},{' '}
            <small>
              created on{' '}
              <Moment format="DD/MM/YYYY hh:mm A">
                {delItem.item.created}
              </Moment>
            </small>
          </p>
        ) : (
          ''
        )}
        {isTag ? (
          <p
            style={{
              overflowY: 'scroll',
              width: '100%',
              overflowWrap: 'break-word',
              height: '50px',
            }}
          >
            Delete this <small>{delItem.item.name}</small> means{' '}
            {tasks.filter((e) => e.tag === delItem.item.name).length} (tasks)
            will be changed to normal
          </p>
        ) : (
          ''
        )}
      </div>
      <div className=" modal__actions">
        <button
          className="btn btn-primary"
          onClick={(e) => {
            toggleDelForm(false, null);
            toggleBackDrop();
          }}
        >
          Cancel
        </button>
        <button
          className="btn btn-danger"
          onClick={(e) => {
            setLoading();
            delFunc(delItem.item);
            toggleDelForm(false, null);
            toggleBackDrop();
            loadTagList();
          }}
        >
          I'm Sure
        </button>
      </div>
    </div>
  );
};
DelForm.propTypes = {
  toggleDelForm: PropTypes.func.isRequired,
  delFunc: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  toggleBackDrop: PropTypes.func.isRequired,
};
const mapStateToProps = ({ dashboard }) => ({
  loading: dashboard.loading,
  del_form: dashboard.del_form,
  delItem: dashboard.delItem,
  tasks: dashboard.tasks,
});
export default connect(mapStateToProps, {
  toggleDelForm,
  toggleBackDrop,
  setLoading,
})(DelForm);
