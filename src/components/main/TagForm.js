import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { addTag, toggleBackDrop, toggleTagForm } from '../../actions/dashboard';
import { setAlert } from '../../actions/alert';
const TagForm = ({ addTag, toggleBackDrop, toggleTagForm, setAlert }) => {
  const [tag, setTag] = useState();
  const onSubmit = () => {
    if (tag !== '') {
      let tagObj = { id: uuidv4(), name: tag };
      addTag(tagObj);
    } else {
      setAlert('EMPTY TAG NAME', 'danger');
    }
  };
  return (
    <div className="tag-form">
      <div className="modal__header">
        <label>New Tag</label>
      </div>
      <div className="modal__layout">
        <label>Tag</label>
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
            toggleTagForm();
            toggleBackDrop();
          }}
        >
          Cancel
        </button>
        <button
          className="btn btn-success"
          onClick={(e) => {
            onSubmit(e);
            toggleTagForm();
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
  addTag: PropTypes.func.isRequired,
  toggleBackDrop: PropTypes.func.isRequired,
  toggleTagForm: PropTypes.func.isRequired,
};

export default connect(null, { addTag, toggleBackDrop, toggleTagForm })(
  TagForm
);
