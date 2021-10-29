/**
 * the function creates a empty task for TaskForm.js and EditForm.js
 * @returns empty task object
 */
export const form = () => {
  let taskForm = {
    id: null,
    desc: '',
    created: null,
    status: '',
    alarm: null,
    tag: '',
  };
  return taskForm;
};
