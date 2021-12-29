import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import { addTag, toggleBackDrop, toggleTagForm } from '../../actions/dashboard';
import { setAlert, setLoading } from '../../actions/alert';
/**
 * This component renders tag form for Add new tag function
 * @param {*} store's props and functions to modify db at actions/dashboard
 * @returns
 */
const TagForm = ({
  tags,
  addTag,
  toggleBackDrop,
  toggleTagForm,
  setAlert,
  setLoading,
}) => {
  const [tag, setTag] = useState(''); // hold user input
  // submit form
  // first load spinner
  // create new object
  // call toggleTagForm to add new tag
  const onSubmit = () => {
    setLoading();
    try {
      if (tags.filter((e) => e.name === tag).length > 0) {
        throw 'DUPLICATE TAG NAME';
      }
      if (tag !== '') {
        let tagObj = { id: uuidv4(), name: tag };
        addTag(tagObj);
        toggleTagForm();
        toggleBackDrop();
      } else {
        throw 'EMPTY TAG NAME';
      }
    } catch (e) {
      setAlert(e, 'danger');
      setLoading(false);
      toggleTagForm();
      toggleBackDrop();
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
  setAlert: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};
const mapStateToProps = ({ dashboard }) => ({
  tags: dashboard.tags,
});
export default connect(mapStateToProps, {
  addTag,
  toggleBackDrop,
  toggleTagForm,
  setAlert,
  setLoading,
})(TagForm);