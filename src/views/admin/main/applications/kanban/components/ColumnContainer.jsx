import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import TaskCard from "./TaskCard";
import Card from "components/card";

function ColumnContainer({
  column,
  // deleteColumn,
  // updateColumn,
  createTask,
  tasks,
  deleteTask,
  updateTask,
  updateTaskTitle,
}) {
  const [editMode, setEditMode] = useState(false);

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="flex h-[500px] max-h-[500px] w-full flex-col rounded-md border-2 bg-gray-500 opacity-40 xl:w-[450px]"
      ></div>
    );
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      extra="flex w-full flex-col max-w-[90vw] rounded-md font-bold px-4 py-4 react-kanban-column"
    >
      {/* Column title */}
      <div
        {...attributes}
        {...listeners}
        onClick={() => {
          setEditMode(true);
        }}
        className="mb-[20px] flex items-center justify-between"
      >
        <p className="ml-1 mt-1 text-xl text-navy-700 dark:text-white">
          {column.title}
        </p>
        <button
          onClick={() => {
            createTask(column.id);
          }}
          className="linear flex items-center justify-center rounded-md bg-lightPrimary px-8 py-1 text-lg text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:!bg-navy-700 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20"
        >
          <AiOutlinePlus />
        </button>
        {/* DELETE TASK */}
        {/* <button
          onClick={() => {
            deleteColumn(column.id);
          }}
          className="
        hover:bg-columnBackgroundColor
        rounded
        stroke-gray-500
        px-1
        py-2
        hover:stroke-white
        "
        >
          <IoMdTrash />
        </button> */}
      </div>

      {/* Column task container */}
      <div className="flex max-w-full flex-grow flex-col gap-2 overflow-y-auto p-2">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
              updateTaskTitle={updateTaskTitle}
            />
          ))}
        </SortableContext>
      </div>
    </Card>
  );
}

export default ColumnContainer;
