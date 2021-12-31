/**
 * the function creates a empty task for TaskForm.js and EditForm.js
 * @returns empty task object
 */
export const form = () => {
  let taskForm = {
    task_id: null,
    desc: '',
    created: new Date(),
    status: 0,
    alarm: null,
    tag_id: null,
    tagname: null,
  };
  return taskForm;
};
