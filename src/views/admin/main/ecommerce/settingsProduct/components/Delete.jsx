import Card from "components/card";

const Delete = () => {
  return (
    <Card extra="gap-4 rounded-[20px] px-[28px] py-[50px]">
      <div className="ml-auto flex flex-col items-center gap-4 md:flex-row">
        <button className="rounded-xl border-2 border-red-500 bg-none px-10 py-2 text-base font-medium text-red-500 hover:bg-red-50">
          Delete Product
        </button>
        <button className="rounded-xl bg-brand-500 px-10 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
          Save Changes
        </button>
      </div>
    </Card>
  );
};

export default Delete;
