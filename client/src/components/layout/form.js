/**
 * the function creates a empty task for TaskForm.js and EditForm.js
 * @returns empty task object
 */
export const form = () => {
  let taskForm = {
    id: null,
    desc: '',
    created: new Date(),
    status: '',
    alarm: null,
    tag: '',
  };
  return taskForm;
};
