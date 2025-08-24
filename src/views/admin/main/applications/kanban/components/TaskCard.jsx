import { useState } from "react";
// import { IoMdTrash } from "react-icons/io"; 
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MdEdit, MdDeleteOutline } from "react-icons/md";

 

function TaskCard({ task, deleteTask, updateTask, updateTaskTitle } ) {
  // eslint-disable-next-line
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editModeTitle, setEditModeTitle] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };
  const toggleEditModeTitle = () => {
    setEditModeTitle((prev) => !prev);
    setMouseIsOver(false);
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="relative flex h-[100px] min-h-[250px] w-full cursor-grab items-center rounded-xl border-2 bg-gray-500 p-2.5 text-left opacity-30"
      />
    );
  }

  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        onMouseEnter={() => {
          setMouseIsOver(true);
        }}
        onMouseLeave={() => {
          setMouseIsOver(false);
        }}
        className="task flex w-[470px] max-w-full flex-col rounded-2xl border-gray-200 bg-white p-[25px] shadow-3xl shadow-shadow-100 dark:!bg-navy-700 dark:!shadow-none"
      >
        <div className="mb-[20px] flex items-center justify-between">
          <p className="text-lg font-bold text-navy-700 dark:text-white">
            {task.title}
          </p>
          <div className="flex w-max flex-row items-center">
            <div
              onClick={() => {
                deleteTask(task.id);
              }}
              className="h-fit w-fit cursor-pointer"
            >
              <div className="text-lg text-gray-600">
                <MdDeleteOutline />
              </div>
            </div>
            <div
              className="h-fit w-fit cursor-pointer"
              onClick={toggleEditMode}
            >
              <div className="text-lg text-gray-600">
                <MdEdit />
              </div>
            </div>
          </div>
        </div>
        {task.image ? (
          <img
            src={task.image}
            className="mb-4 h-[284px] w-[420px] rounded-2xl"
            alt=""
          />
        ) : null}

        <textarea
          className="h-[100%] min-h-[100px] w-full resize-none rounded border-none bg-[transparent] text-base font-normal text-gray-600 focus:outline-none"
          value={task.desc}
          autoFocus
          placeholder="Task content here"
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) {
              toggleEditMode();
            }
          }}
          onChange={(e) => updateTask(task.id, e.target.value)}
        />

        <div className="mt-[20px] flex w-full items-center justify-between">
          <div className="flex items-center">
            {task.members
              ? task.members.map((member, index) => {
                  let membersNumber = task.members.length;
                  console.log(membersNumber);
                  return (
                    <img
                      src={member}
                      className={`${
                        index && index !== 0 ? "-ml-3" : ""
                      } h-9 w-9 rounded-full border border-white dark:!border-navy-700`}
                      alt=""
                    />
                  );
                })
              : null}
          </div>
          {task.status ? (
            <div
              className={`flex h-7 w-[94px] items-center justify-center rounded-[8px] text-sm font-bold tracking-wide text-white ${
                task.status === "ERRORS"
                  ? " bg-red-500"
                  : task.status === "PENDING"
                  ? " bg-yellow-500"
                  : task.status === "DONE"
                  ? " bg-green-500"
                  : task.status === "UPDATES"
                  ? " bg-[#3965FF]"
                  : " bg-teal-400"
              } `}
            >
              {task.status}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
  if (editModeTitle) {
    return (
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        onMouseEnter={() => {
          setMouseIsOver(true);
        }}
        onMouseLeave={() => {
          setMouseIsOver(false);
        }}
        className="task flex w-[470px] max-w-full flex-col rounded-2xl border-gray-200 bg-white p-[25px] shadow-3xl shadow-shadow-100 dark:!bg-navy-700 dark:!shadow-none"
      >
        <div className="mb-[20px] flex items-center justify-between">
          <textarea
            className="h-[100%] min-h-[30px] w-full resize-none rounded border-none bg-[transparent] text-lg font-bold text-navy-700 focus:outline-none dark:text-white"
            value={task.title}
            autoFocus
            placeholder="Task content here"
            onBlur={toggleEditModeTitle}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.shiftKey) {
                toggleEditModeTitle();
              }
            }}
            onChange={(e) => updateTaskTitle(task.id, e.target.value)}
          />
          <div className="flex w-max flex-row items-center">
            <div
              onClick={() => {
                deleteTask(task.id);
              }}
              className="h-fit w-fit cursor-pointer"
            >
              <div className="text-lg text-gray-600">
                <MdDeleteOutline />
              </div>
            </div>
            <div
              className="h-fit w-fit cursor-pointer"
              onClick={toggleEditMode}
            >
              <div className="text-lg text-gray-600">
                <MdEdit />
              </div>
            </div>
          </div>
        </div>
        {task.image ? (
          <img
            src={task.image}
            className="mb-4 h-[284px] w-[420px] rounded-2xl"
            alt=""
          />
        ) : null}

        <p
          className="text-base font-normal text-gray-600"
          onClick={toggleEditMode}
        >
          {" "}
          {task.desc}{" "}
        </p>

        <div className="mt-[20px] flex w-full items-center justify-between">
          <div className="flex items-center">
            {task.members
              ? task.members.map((member, index) => {
                  let membersNumber = task.members.length;
                  console.log(membersNumber);
                  return (
                    <img
                      src={member}
                      // className={`${
                      //   index && index !== 0
                      //     ? "-ml-" + (membersNumber - index) * 3
                      //     : ""
                      // } h-9 w-9 rounded-full border border-white dark:!border-navy-700`}
                      className={`${
                        index && index !== 0 ? "-ml-3" : ""
                      } h-9 w-9 rounded-full border border-white dark:!border-navy-700`}
                      alt=""
                    />
                  );
                })
              : null}
          </div>
          {task.status ? (
            <div
              className={`flex h-7 w-[94px] items-center justify-center rounded-[8px] text-sm font-bold tracking-wide text-white ${
                task.status === "ERRORS"
                  ? " bg-red-500"
                  : task.status === "PENDING"
                  ? " bg-yellow-500"
                  : task.status === "DONE"
                  ? " bg-green-500"
                  : task.status === "UPDATES"
                  ? " bg-[#3965FF]"
                  : " bg-teal-400"
              } `}
            >
              {task.status}
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
      className="task flex w-[calc(100vw_-_40px)] max-w-full flex-col rounded-2xl bg-white p-[25px] shadow-3xl shadow-shadow-100 dark:!bg-navy-700 dark:shadow-none md:w-[470px]"
    >
      <div className="mb-[20px] flex items-center justify-between">
        <p
          className="text-lg font-bold text-navy-700 dark:text-white"
          onClick={toggleEditModeTitle}
        >
          {task.title}
        </p>
        <div className="flex w-max flex-row items-center">
          <div
            onClick={() => {
              deleteTask(task.id);
            }}
            className="h-fit w-fit cursor-pointer"
          >
            <div className="text-lg text-gray-600">
              <MdDeleteOutline />
            </div>
          </div>
          <div className="h-fit w-fit cursor-pointer" onClick={toggleEditMode}>
            <div className="text-lg text-gray-600">
              <MdEdit />
            </div>
          </div>
        </div>
      </div>
      {task.image ? (
        <img
          src={task.image}
          className="mb-4 h-[284px] w-[420px] rounded-2xl"
          alt=""
        />
      ) : null}

      <p
        className="text-base font-normal text-gray-600"
        onClick={toggleEditMode}
      >
        {" "}
        {task.desc}{" "}
      </p>

      <div className="mt-[20px] flex w-full items-center justify-between">
        <div className="flex items-center">
          {task.members
            ? task.members.map((member, index) => {
                let membersNumber = task.members.length;
                console.log(membersNumber);
                return (
                  <img
                    src={member}
                    // className={`${
                    //   index && index !== 0
                    //     ? "-ml-" + (membersNumber - index) * 3
                    //     : ""
                    // } h-9 w-9 rounded-full border border-white dark:!border-navy-700`}
                    className={`${
                      index && index !== 0 ? "-ml-3" : ""
                    } h-9 w-9 rounded-full border border-white dark:!border-navy-700`}
                    alt=""
                  />
                );
              })
            : null}
        </div>
        {task.status ? (
          <div
            className={`flex h-7 w-[94px] items-center justify-center rounded-[8px] text-sm font-bold tracking-wide text-white ${
              task.status === "ERRORS"
                ? " bg-red-500"
                : task.status === "PENDING"
                ? " bg-yellow-500"
                : task.status === "DONE"
                ? " bg-green-500"
                : task.status === "UPDATES"
                ? " bg-[#3965FF]"
                : " bg-teal-400"
            } `}
          >
            {task.status}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default TaskCard;
