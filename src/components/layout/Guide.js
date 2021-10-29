import React from 'react';
import task from '../../img/task.PNG';
import kanban from '../../img/kanban.PNG';
import taskform from '../../img/taskform.PNG';
import marked from '../../img/marked.PNG';
import tags from '../../img/tags.PNG';
import view from '../../img/view.PNG';
import alarm from '../../img/alarm.PNG';
import normal from '../../img/normal.PNG';
import kanban2 from '../../img/kanban-2.PNG';
/**
 * This child component renders the instruction panel at Home.js
 *
 */
const Guide = () => {
  return (
    <div className="guide">
      <h1>Usage Instruction</h1>
      <div className="tip">
        <img src={task} className="x1" />
        <p>Add task button</p>
        <img src={kanban} className="x1" />
        <p>Go to kanban page</p>
      </div>
      <div className="tip">
        <div className="tip-child">
          <img src={taskform} className="x2" />
          <p>
            Add form with text field, tag selection and reminder(optional) when
            when you completed the task mark it as "Mark as done". Reminder
            helps user to add deadline to finish the task, first choose the date
            then choose the time (hh:mm)
          </p>
        </div>
        <div className="tip-child">
          <img src={tags} className="x2" />
          <p>
            User can add new tag, there are some default tags: priority, normal
            and important. Only user created tags are editable and removable.
            User can view tasks grouped by tag or "show all of them"
          </p>
        </div>
      </div>
      <div className="tip">
        <img src={view} className="x2" />
        <p>
          Main watcher for tasks, user can filter by description, sort by time
          created, delete/edit individual task. There is a quickly add bar at
          the bottom to add new task instantly. Newly added task are put in the
          front. Notice!! at "All" view, using quickly add bar means task will
          have "normal" tag.
        </p>
      </div>
      <div className="tip">
        <div className="tip-child">
          <img src={normal} className="x1-2" />
          <p>One normal task looks like this</p>
        </div>
        <div className="tip-child">
          <img src={marked} className="x1-2" />
          <p>Completed item looks like this</p>
        </div>
        <div className="tip-child">
          <img src={alarm} className="x1-2" />
          <p>Task reached reminder time looks like this</p>
        </div>
      </div>
      <div className="tip">
        <img src={kanban2} className="xX" />
        <p>
          At kanban view, user can view all task progress, reorder them within
          group and mark items instantly by drag items between "On-going" and
          "Completed"
        </p>
      </div>
      <h3>Wallpaper credit: https://wallpapercave.com/wp/wp7063308.jpg</h3>
      <h3>Author: yen.o.tran@tuni.fi</h3>
    </div>
  );
};

export default Guide;
