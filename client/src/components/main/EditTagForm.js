import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  modifyTag,
  toggleBackDrop,
  toggleEditTagForm,
} from '../../actions/dashboard';
import { setAlert, setLoading } from '../../actions/alert';
/**
 * This component renders the Edit Tag form
 * @param {*} store's props and functions to modify db at actions/dashboard
 * @returns
 */
const TagForm = ({
  modifyTag,
  toggleBackDrop,
  toggleEditTagForm,
  setAlert,
  setLoading,
  editTag,
  tasks,
}) => {
  const [tag, setTag] = useState(editTag.name); // hold tag value
  // submit form
  // first render spinner
  // then create a tag object with modified value
  // call modifyTag
  const onSubmit = () => {
    setLoading();
    if (tag !== '') {
      const tagObj = { id: editTag.id, name: tag };
      modifyTag(editTag.id, tagObj, editTag);
    } else {
      setLoading(false); // stop the forever spinner
      setAlert('EMPTY TAG NAME', 'danger'); // setAlert if sthin wrong
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
