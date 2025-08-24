import Card from "components/card";

const Delete = () => {
  return (
    <Card extra="!flex-row py-6 px-[30px] justify-between items-center w-full">
      <div>
        <h3 className="mb-px text-xl font-bold text-navy-700 dark:text-white">
          Delete this account
        </h3>
        <p className="text-base text-gray-600">
          Here you can permanently delete this account
        </p>
      </div>
      <button className="flex cursor-pointer items-center justify-center rounded-xl border-2 border-red-500 px-4 py-2 text-base font-medium text-red-500 transition duration-200 hover:bg-red-50 active:bg-red-100 dark:active:bg-red-50 dark:active:opacity-80">
        Delete account
      </button>
    </Card>
  );
};

export default Delete;
