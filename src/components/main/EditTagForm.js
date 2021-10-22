import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import {
  modifyTag,
  toggleBackDrop,
  toggleEditTagForm,
} from '../../actions/dashboard';
import { setAlert, setLoading } from '../../actions/alert';
const TagForm = ({
  modifyTag,
  toggleBackDrop,
  toggleEditTagForm,
  setAlert,
  setLoading,
  editTag,
  tasks,
}) => {
  const [tag, setTag] = useState(editTag.name);
  const onSubmit = () => {
    setLoading();
    if (tag !== '') {
      const tagObj = { id: editTag.id, name: tag };
      modifyTag(editTag.id, tagObj, editTag);
    } else {
      setAlert('EMPTY TAG NAME', 'danger');
    }
  };
  return (
    <div className="tag-form">
      <div className="modal__header">
        <label>Modify Tag</label>
      </div>
      <div className="modal__layout">
        <label>
          There are {tasks.filter((e) => e.tag === editTag.name).length} task(s)
          under this
        </label>
        <input
          type="text"
          name="tag-title"
          value={tag}
          placeholder="enter your tag"
          onChange={(e) => setTag(e.target.value)}
        />
      </div>
      <div className="modal__actions">
        <button
          className="btn btn-primary"
          onClick={(e) => {
            toggleEditTagForm();
            toggleBackDrop();
          }}
        >
          Cancel
        </button>
        <button
          className="btn btn-success"
          onClick={(e) => {
            onSubmit(e);
            toggleEditTagForm();
            toggleBackDrop();
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

TagForm.propTypes = {
  modifyTag: PropTypes.func.isRequired,
  toggleBackDrop: PropTypes.func.isRequired,
  toggleEditTagForm: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  editTag: PropTypes.object.isRequired,
};
const mapStateToProps = ({ dashboard }) => ({
  backdrop: dashboard.backdrop,
  loading: dashboard.loading,
  edit_tag_form: dashboard.edit_tag_form,
  editTag: dashboard.editTag,
  tasks: dashboard.tasks,
});
export default connect(mapStateToProps, {
  modifyTag,
  toggleBackDrop,
  toggleEditTagForm,
  setAlert,
  setLoading,
})(TagForm);
