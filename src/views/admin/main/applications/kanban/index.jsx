import { IoMdAdd } from "react-icons/io";
import { useMemo, useState } from "react";
import ColumnContainer from "./components/ColumnContainer";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
import avatar4 from "assets/img/avatars/avatar4.png";
import kanban1 from "assets/img/applications/kanban1.png";
import kanban2 from "assets/img/applications/kanban2.png";
import { Scrollbars } from "react-custom-scrollbars-2";
import {
  kanbanRenderThumb,
  kanbanRenderTrack,
  kanbanRenderView,
} from "components/scrollbar/Scrollbar";
import {
  DndContext,
  // DragEndEvent,
  // DragOverEvent,
  DragOverlay,
  // DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./components/TaskCard";

const defaultCols = [
  {
    id: "todo",
    title: "Todo",
  },
  {
    id: "doing",
    title: "Work in progress",
  },
  {
    id: "done",
    title: "Done",
  },
];

const defaultTasks = [
  {
    id: 1,
    columnId: "todo",
    title: 'Option to "use local/server version" feature',
    desc: "It usually displays this message when you close an unsaved page when you do it on purpose, and it's getting frustrated to see this every time.",
    status: "UPDATES",
    members: [avatar2, avatar3],
  },
  {
    id: 2,
    columnId: "todo",
    image: kanban1,
    members: [avatar2, avatar3, avatar4],
    status: "PENDING",
    title: "Add/modify your own CSS-Selectors",
    desc: "Website Design: The ability to add/modify your own CSS-Selectors like its done in Venus.",
    attachements: "3",
  },
  {
    id: 3,
    columnId: "todo",
    title: "Shortcode for templates to display correctly",
    members: [avatar2],
    desc: "When you save some sections as a template and then paste a shortcode to a new page, the layout is broken, some styles are missing - in the editor.",
    status: "ERRORS",
  },
  {
    id: 4,
    columnId: "doing",
    title: "General ideas to improve 'Edit' workflow",
    desc: "Currently, I have a few templates in the Local Library and when I want to add them I'm always presented (by default).",
    members: [avatar2, avatar3, avatar4],
    status: "PENDING",
    attachements: "2",
  },
  {
    id: 5,
    columnId: "doing",
    title: "Shortcode for templates to display correctly",
    desc: "When you save some sections as a template and then paste a shortcode to a new page, the layout is broken, some styles are missing - in the editor.",
    status: "UPDATES",
    members: [avatar2],
  },
  {
    id: 6,
    columnId: "doing",
    image: kanban2,
    members: [avatar2, avatar3],
    status: "ERRORS",
    title: "[UX Design] - Set the default Library tab",
    desc: "I want to be able to set the default Library tab (or a way to remember the last active tab), especially when I already...",
  },
  {
    id: 7,
    columnId: "done",
    title: "Copy/Paste elements between pages",
    desc: "We can only copy/paste elements (or group of elements) in the same page, which is quite limited.",
    status: "DONE",
    members: [avatar2],
  },
  {
    id: 8,
    columnId: "done",
    title: "Remove Extra DIV for each container added",
    desc: "I still hope there won't have an extra div for each container we added. It should be something for better styling...",
    status: "DONE",
    members: [avatar2, avatar3, avatar4],
  },
  {
    id: 9,
    columnId: "done",
    title: "Add Figma files for the Library design blocks",
    desc: "I want to present my clients the Figma files first, so it would be great if you add those as well, more manual downloads...",
    status: "DONE",
    members: [avatar2, avatar3],
  },
];

function KanbanBoard() {
  const [columns, setColumns] = useState(defaultCols);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const [tasks, setTasks] = useState(defaultTasks);

  const [activeColumn, setActiveColumn] = useState(null);

  const [activeTask, setActiveTask] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  return (
    <div className="mt-20 flex flex-col overflow-hidden rounded-md xl:mt-3">
      <div className="max-w-full">
        <Scrollbars
          autoHide
          renderTrackHorizontal={kanbanRenderTrack}
          renderThumbHorizontal={kanbanRenderThumb}
          renderView={kanbanRenderView}
        >
          <DndContext
            sensors={sensors}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
          >
            <div className="m-auto flex gap-4">
              <div className="flex gap-4">
                <SortableContext items={columnsId}>
                  {columns.map((col) => (
                    <ColumnContainer
                      key={col.id}
                      column={col}
                      deleteColumn={deleteColumn}
                      updateColumn={updateColumn}
                      createTask={createTask}
                      deleteTask={deleteTask}
                      updateTask={updateTask}
                      updateTaskTitle={updateTaskTitle}
                      tasks={tasks.filter((task) => task.columnId === col.id)}
                    />
                  ))}
                </SortableContext>
              </div>
              <button
                onClick={() => {
                  createNewColumn();
                }}
                className="bg-mainBackgroundColor border-columnBackgroundColor ring-rose-500 flex h-[60px] w-[350px] min-w-[350px] cursor-pointer gap-2 rounded-lg border-2 p-4 hover:ring-2"
              >
                <IoMdAdd />
                Add Column
              </button>
            </div>

            {createPortal(
              <DragOverlay>
                {activeColumn && (
                  <ColumnContainer
                    column={activeColumn}
                    deleteColumn={deleteColumn}
                    updateColumn={updateColumn}
                    createTask={createTask}
                    deleteTask={deleteTask}
                    updateTask={updateTask}
                    updateTaskTitle={updateTaskTitle}
                    tasks={tasks.filter(
                      (task) => task.columnId === activeColumn.id
                    )}
                  />
                )}
                {activeTask && (
                  <TaskCard
                    task={activeTask}
                    deleteTask={deleteTask}
                    updateTask={updateTask}
                    updateTaskTitle={updateTaskTitle}
                  />
                )}
              </DragOverlay>,
              document.body
            )}
          </DndContext>
        </Scrollbars>
      </div>
    </div>
  );

  function createTask(columnId) {
    const newTask = {
      id: generateId(),
      columnId,
      title: `Task ${tasks.length + 1}`,
      desc: `Task ${tasks.length + 1}`,
    };

    setTasks([...tasks, newTask]);
  }

  function deleteTask(id) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  function updateTask(id, desc) {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, desc };
    });

    setTasks(newTasks);
  }

  function updateTaskTitle(id, title) {
    const newTasks = tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, title };
    });

    setTasks(newTasks);
  }

  function createNewColumn() {
    const columnToAdd = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };

    setColumns([...columns, columnToAdd]);
  }

  function deleteColumn(id) {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);

    const newTasks = tasks.filter((t) => t.columnId !== id);
    setTasks(newTasks);
  }

  function updateColumn(id, title) {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title };
    });

    setColumns(newColumns);
  }

  function onDragStart(event) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;

    console.log("DRAG END");

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
          // Fix introduced after video recording
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        tasks[activeIndex].columnId = overId;
        console.log("DROPPING TASK OVER COLUMN", { activeIndex });
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }
}

function generateId() {
  /* Generate a random number between 0 and 10000 */
  return Math.floor(Math.random() * 10001);
}

export default KanbanBoard;
