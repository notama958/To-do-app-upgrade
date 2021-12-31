import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//actions
import {
  modifyTag,
  toggleBackDrop,
  toggleEditTagForm,
} from '../../actions/dashboard';
import { setAlert, tagLoading } from '../../actions/alert';

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
  tagLoading,
  editTag,
  tasks,
}) => {
  const [tag, setTag] = useState(editTag.tagname); // hold tag value
  // submit form
  // first render spinner
  // then create a tag object with modified value
  // call modifyTag
  const onSubmit = () => {
    tagLoading();
    if (tag !== '') {
      const tagObj = { tagname: tag };
      modifyTag(editTag.tag_id, tagObj);
    } else {
      tagLoading(false); // stop the forever spinner
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
          There are {tasks.filter((e) => e.tagname === editTag.tagname).length}{' '}
          task(s) under this
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
  tagLoading: PropTypes.func.isRequired,
  editTag: PropTypes.object.isRequired,
};
const mapStateToProps = ({ dashboard }) => ({
  backdrop: dashboard.backdrop,
  tag_loading: dashboard.tag_loading,
  edit_tag_form: dashboard.edit_tag_form,
  editTag: dashboard.editTag,
  tasks: dashboard.tasks,
});
export default connect(mapStateToProps, {
  modifyTag,
  toggleBackDrop,
  toggleEditTagForm,
  setAlert,
  tagLoading,
})(TagForm);
