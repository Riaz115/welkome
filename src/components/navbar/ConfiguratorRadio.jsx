import Radio from "components/radio";
export default function HeaderLinks(props) {
  return (
    <button
      onClick={props.onClick}
      className={`flex h-max w-full flex-col rounded-2xl border-[1px] border-gray-200 py-3 px-3 hover:bg-white hover:shadow-[0px_18px_40px_rgba(112,_144,_176,_0.22)] 
      focus:bg-white focus:shadow-[0px_18px_40px_rgba(112,_144,_176,_0.22)] active:bg-[#F7F9FF] active:shadow-[0px_18px_40px_rgba(112,_144,_176,_0.22)]
      dark:border-white/20 dark:hover:bg-navy-700 dark:hover:shadow-[unset] dark:focus:bg-navy-700
      dark:focus:shadow-[unset] dark:active:bg-white/10 dark:active:shadow-[unset] ${
        props.active ? "bg-white dark:bg-navy-700" : "bg-[transparent]"
      } ${
        props.active
          ? "shadow-[0px_18px_40px_rgba(112,_144,_176,_0.22)] dark:shadow-[unset]"
          : "bg-[transparent]"
      } `}
    >
      <div className="mb-2.5 flex w-full justify-between">
        {props.label}
        <Radio checked={props.active} />
      </div>
      {props.children}
    </button>
  );
}
