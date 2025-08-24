import { MdChevronRight } from "react-icons/md";

const Buttons = () => {
  return (
    <div className="dark:bg items-left flex w-full flex-col justify-center rounded-[20px] bg-white dark:!bg-navy-900 md:py-12 lg:py-28 3xl:py-10">
      {/* Default Buttons */}
      <div className="flex flex-row flex-wrap items-center gap-3">
        <h1 className="font-bold text-navy-700 dark:text-white">Default</h1>
        <button className="rounded-xl bg-brand-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
          Default
        </button>
        <button className="rounded-xl bg-gray-100 px-5 py-3 text-base font-medium text-navy-700 transition duration-200 hover:bg-gray-200 active:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30">
          Secondary
        </button>
        <button className="rounded-xl bg-navy-700 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-navy-800 active:bg-navy-900 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30">
          Dark
        </button>
        <button className="rounded-xl bg-blue-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-blue-600 active:bg-blue-700 dark:bg-blue-400 dark:text-white dark:hover:bg-blue-300 dark:active:bg-blue-200">
          Blue
        </button>
        <button className="rounded-xl bg-red-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-red-600 active:bg-red-700 dark:bg-red-400 dark:text-white dark:hover:bg-red-300 dark:active:bg-red-200">
          Red
        </button>
        <button className="rounded-xl bg-green-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-green-600 active:bg-green-700 dark:bg-green-400 dark:text-white dark:hover:bg-green-300 dark:active:bg-green-200">
          Green
        </button>
        <button className="rounded-xl bg-purple-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-purple-600 active:bg-purple-700 dark:bg-purple-400 dark:text-white dark:hover:bg-purple-300 dark:active:bg-purple-200">
          Purple
        </button>
        <button className="rounded-xl bg-yellow-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-yellow-600 active:bg-yellow-700 dark:bg-yellow-400 dark:text-white dark:hover:bg-yellow-300 dark:active:bg-yellow-200">
          Yellow
        </button>
        <button className="rounded-xl bg-orange-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-orange-600 active:bg-orange-700 dark:bg-orange-400 dark:text-white dark:hover:bg-orange-300 dark:active:bg-orange-200">
          Orange
        </button>
      </div>
      {/* Pills Buttons */}
      <div className="mt-20 flex flex-row flex-wrap items-center gap-3">
        <h1 className="font-bold text-navy-700 dark:text-white">Pills</h1>
        <button className="rounded-full bg-brand-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
          Default
        </button>
        <button className="rounded-full bg-gray-100 px-5 py-3 text-base font-medium text-navy-700 transition duration-200 hover:bg-gray-200 active:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30">
          Secondary
        </button>
        <button className="rounded-full bg-navy-700 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-navy-800 active:bg-navy-900 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30">
          Dark
        </button>
        <button className="rounded-full bg-blue-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-blue-600 active:bg-blue-700 dark:bg-blue-400 dark:text-white dark:hover:bg-blue-300 dark:active:bg-blue-200">
          Blue
        </button>
        <button className="rounded-full bg-red-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-red-600 active:bg-red-700 dark:bg-red-400 dark:text-white dark:hover:bg-red-300 dark:active:bg-red-200">
          Red
        </button>
        <button className="rounded-full bg-green-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-green-600 active:bg-green-700 dark:bg-green-400 dark:text-white dark:hover:bg-green-300 dark:active:bg-green-200">
          Green
        </button>
        <button className="rounded-full bg-purple-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-purple-600 active:bg-purple-700 dark:bg-purple-400 dark:text-white dark:hover:bg-purple-300 dark:active:bg-purple-200">
          Purple
        </button>
        <button className="rounded-full bg-yellow-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-yellow-600 active:bg-yellow-700 dark:bg-yellow-400 dark:text-white dark:hover:bg-yellow-300 dark:active:bg-yellow-200">
          Yellow
        </button>
        <button className="rounded-full bg-orange-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-orange-600 active:bg-orange-700 dark:bg-orange-400 dark:text-white dark:hover:bg-orange-300 dark:active:bg-orange-200">
          Orange
        </button>
      </div>
      {/* Outlined Buttons */}
      <div className="mt-20 flex flex-row flex-wrap items-center gap-3">
        <h1 className="font-bold text-navy-700 dark:text-white">Outlined</h1>
        <button className="rounded-xl border-2 border-brand-500 px-5 py-3 text-base font-medium text-brand-500 transition duration-200 hover:bg-brand-600/5 active:bg-brand-700/5 dark:border-brand-400 dark:bg-brand-400/10 dark:text-white dark:hover:bg-brand-300/10 dark:active:bg-brand-200/10">
          Default
        </button>
        <button className="rounded-xl border-2 border-gray-200 px-5 py-3 text-base font-medium text-navy-700 transition duration-200 hover:bg-gray-200/10 active:bg-gray-300/10 dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20">
          Secondary
        </button>
        <button className="rounded-xl border-2 border-navy-700 px-5 py-3 text-base font-medium text-navy-700 transition duration-200 hover:bg-navy-800/5 active:bg-navy-900/5 dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20">
          Dark
        </button>
        <button className="rounded-xl border-2 border-blue-500 px-5 py-3 text-base font-medium text-blue-500 transition duration-200 hover:bg-blue-600/5 active:bg-blue-700/5 dark:border-blue-400 dark:bg-blue-400/10 dark:text-white dark:hover:bg-blue-300/10 dark:active:bg-blue-200/10">
          Blue
        </button>
        <button className="rounded-xl border-2 border-red-500 px-5 py-3 text-base font-medium text-red-500 transition duration-200 hover:bg-red-600/5 active:bg-red-700/5 dark:border-red-400 dark:bg-red-400/10 dark:text-white dark:hover:bg-red-300/10 dark:active:bg-red-200/10">
          Red
        </button>
        <button className="rounded-xl border-2 border-green-500 px-5 py-3 text-base font-medium text-green-500 transition duration-200 hover:bg-green-600/5 active:bg-green-700/5 dark:border-green-400 dark:bg-green-400/10 dark:text-white dark:hover:bg-green-300/10 dark:active:bg-green-200/10">
          Green
        </button>
        <button className="rounded-xl border-2 border-purple-500 px-5 py-3 text-base font-medium text-purple-500 transition duration-200 hover:bg-purple-600/5 active:bg-purple-700/5 dark:border-purple-400 dark:bg-purple-400/10 dark:text-white dark:hover:bg-purple-300/10 dark:active:bg-purple-200/10">
          Purple
        </button>
        <button className="rounded-xl border-2 border-yellow-500 px-5 py-3 text-base font-medium text-yellow-500 transition duration-200 hover:bg-yellow-600/5 active:bg-yellow-700/5 dark:border-yellow-400 dark:bg-yellow-400/10 dark:text-white dark:hover:bg-yellow-300/10 dark:active:bg-yellow-200/10">
          Yellow
        </button>
        <button className="rounded-xl border-2 border-orange-500 px-5 py-3 text-base font-medium text-orange-500 transition duration-200 hover:bg-orange-600/5 active:bg-orange-700/5 dark:border-orange-400 dark:bg-orange-400/10 dark:text-white dark:hover:bg-orange-300/10 dark:active:bg-orange-200/10">
          Orange
        </button>
      </div>
      {/* Gradient Buttons */}
      <div className="mt-20 flex flex-row flex-wrap items-center gap-3">
        <h1 className="font-bold text-navy-700 dark:text-white">Gradient</h1>
        <button className="from-brandto-blueSecondary rounded-xl bg-gradient-to-br px-5 py-3 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-blueSecondary/50">
          Button 1
        </button>
        <button className="rounded-xl bg-gradient-to-br from-[#4481EB] to-[#04BEFE] px-5 py-3 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#4481EB]/50">
          Button 2
        </button>
        <button className="rounded-xl bg-gradient-to-br from-[#00DBDE] to-[#FC00FF] px-5 py-3 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#FC00FF]/50">
          Button 3
        </button>
        <button className="rounded-xl bg-gradient-to-br from-[#0083FE] to-[#00FFF0] px-5 py-3 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#0083FE]/50">
          Button 4
        </button>
        <button className="rounded-xl bg-gradient-to-br from-[#0ED2F7] to-[#B2FEFA] px-5 py-3 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#0ED2F7]/50">
          Button 5
        </button>
        <button className="rounded-xl bg-gradient-to-br from-[#00C9FF] to-[#92FE9D] px-5 py-3 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#00C9FF]/50">
          Button 6
        </button>
        <button className="rounded-xl bg-gradient-to-br from-[#FDFC47] to-[#24FE41] px-5 py-3 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#FDFC47]/50">
          Button 7
        </button>
        <button className="rounded-xl bg-gradient-to-br from-[#6AFE24] to-[#FEDB24] px-5 py-3 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#6AFE24]/50">
          Button 8
        </button>
        <button className="rounded-xl bg-gradient-to-br from-[#FFC837] to-[#FF6108] px-5 py-3 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#FFC837]/50">
          Button 9
        </button>
        <button className="rounded-xl bg-gradient-to-br from-[#FF9966] to-[#FF5E62] px-5 py-3 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#FF9966]/50">
          Button 10
        </button>
        <button className="rounded-xl bg-gradient-to-br from-[#FF416C] to-[#FF4B2B] px-5 py-3 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#FF416C]/50">
          Button 11
        </button>
        <button className="rounded-xl bg-gradient-to-br from-[#F64F59] via-[#C471ED] to-[#12C2E9] px-5 py-3 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#C471ED]/50">
          Button 12
        </button>
        <button className="rounded-xl bg-gradient-to-br from-[#F857A6] to-[#FF5858] px-5 py-3 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#F857A6]/50">
          Button 13
        </button>
        <button className="rounded-xl bg-gradient-to-br from-[#EC008C] to-[#FC6767] px-5 py-3 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#EC008C]/50">
          Button 14
        </button>
        <button className="rounded-xl bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] px-5 py-3 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#FD1D1D]/50">
          Button 15
        </button>
        <button className="rounded-xl bg-gradient-to-br from-[#6025F5] to-[#FF5555] px-5 py-3 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#6025F5]/50">
          Button 16
        </button>
        <button className="rounded-xl bg-gradient-to-br from-[#7F00FF] to-[#E100FF] px-5 py-3 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#7F00FF]/50">
          Button 17
        </button>
        <button className="rounded-xl bg-gradient-to-br from-[#29E9F5] via-[#7A64FF] to-[#FF508B] px-5 py-3 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#7A64FF]/50">
          Button 18
        </button>
        <button className="rounded-xl bg-gradient-to-br from-[#FC00FF] via-[#504CF3] to-[#02FFD1] px-5 py-3 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#504CF3]/50">
          Button 19
        </button>
        <button className="rounded-xl bg-gradient-to-br from-[#3C0066] via-[#EC38BC] to-[#FDEFF9] px-5 py-3 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#EC38BC]/50">
          Button 20
        </button>
        <button className="rounded-xl bg-gradient-to-br from-[#EA52F8] to-[#0066FF] px-5 py-3 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#0066FF]/25">
          Button 21
        </button>
      </div>
      {/* Gradient + Shadow Buttons
      <div className="mt-20 flex flex-row flex-wrap items-center gap-3">
        <h1 className="font-bold text-navy-700 dark:text-white">
          Shadow Buttons
        </h1>
        <button className="rounded-xl bg-gradient-to-br from-brandto-blueSecondary px-5 py-3 text-base font-medium text-white shadow-xl shadow-blueSecondary/50 transition duration-200 hover:bg-gradient-to-l">
          Button 1
        </button>
        <button className="rounded-xl bg-gradient-to-br from-[#4481EB] to-[#04BEFE] px-5 py-3 text-base font-medium text-white shadow-xl shadow-[#4481EB]/50 transition duration-200 hover:bg-gradient-to-l">
          Button 2
        </button>
        <button className="rounded-xl bg-gradient-to-br from-[#00DBDE] to-[#FC00FF] px-5 py-3 text-base font-medium text-white shadow-xl shadow-[#FC00FF]/50 transition duration-200 hover:bg-gradient-to-l">
          Button 3
        </button>
        <button className="rounded-xl bg-gradient-to-br from-[#0083FE] to-[#00FFF0] px-5 py-3 text-base font-medium text-white shadow-xl shadow-[#0083FE]/50 transition duration-200 hover:bg-gradient-to-l">
          Button 4
        </button>
        <button className="rounded-xl bg-gradient-to-br from-[#0ED2F7] to-[#B2FEFA] px-5 py-3 text-base font-medium text-white shadow-xl shadow-[#0ED2F7]/50 transition duration-200 hover:bg-gradient-to-l">
          Button 5
        </button>
        <button className="rounded-xl bg-gradient-to-br from-[#00C9FF] to-[#92FE9D] px-5 py-3 text-base font-medium text-white shadow-xl shadow-[#00C9FF]/50 transition duration-200 hover:bg-gradient-to-l">
          Button 6
        </button>
        <button className="rounded-xl bg-gradient-to-br from-[#FDFC47] to-[#24FE41] px-5 py-3 text-base font-medium text-white shadow-xl shadow-[#FDFC47]/50 transition duration-200 hover:bg-gradient-to-l">
          Button 7
        </button>
        <button className="rounded-xl bg-gradient-to-br from-[#6AFE24] to-[#FEDB24] px-5 py-3 text-base font-medium text-white shadow-xl shadow-[#6AFE24]/50 transition duration-200 hover:bg-gradient-to-l">
          Button 8
        </button>
        <button className="rounded-xl bg-gradient-to-br from-[#FFC837] to-[#FF6108] px-5 py-3 text-base font-medium text-white shadow-xl shadow-[#FFC837]/50 transition duration-200 hover:bg-gradient-to-l">
          Button 9
        </button>
        <button className="rounded-xl bg-gradient-to-br from-[#FF9966] to-[#FF5E62] px-5 py-3 text-base font-medium text-white shadow-xl shadow-[#FF9966]/50 transition duration-200 hover:bg-gradient-to-l">
          Button 10
        </button>
        <button className="rounded-xl bg-gradient-to-br from-[#FF416C] to-[#FF4B2B] px-5 py-3 text-base font-medium text-white shadow-xl shadow-[#FF416C]/50 transition duration-200 hover:bg-gradient-to-l">
          Button 11
        </button>
        <button className="rounded-xl bg-gradient-to-br from-[#F64F59] via-[#C471ED] to-[#12C2E9] px-5 py-3 text-base font-medium text-white shadow-xl shadow-[#C471ED]/50 transition duration-200 hover:bg-gradient-to-l">
          Button 12
        </button>
        <button className="rounded-xl bg-gradient-to-br from-[#F857A6] to-[#FF5858] px-5 py-3 text-base font-medium text-white shadow-xl shadow-[#F857A6]/50 transition duration-200 hover:bg-gradient-to-l">
          Button 13
        </button>
        <button className="rounded-xl bg-gradient-to-br from-[#EC008C] to-[#FC6767] px-5 py-3 text-base font-medium text-white shadow-xl shadow-[#EC008C]/50 transition duration-200 hover:bg-gradient-to-l">
          Button 14
        </button>
        <button className="rounded-xl bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] px-5 py-3 text-base font-medium text-white shadow-xl shadow-[#FD1D1D]/50 transition duration-200 hover:bg-gradient-to-l">
          Button 15
        </button>
        <button className="rounded-xl bg-gradient-to-br from-[#6025F5] to-[#FF5555] px-5 py-3 text-base font-medium text-white shadow-xl shadow-[#6025F5]/50 transition duration-200 hover:bg-gradient-to-l">
          Button 16
        </button>
        <button className="rounded-xl bg-gradient-to-br from-[#7F00FF] to-[#E100FF] px-5 py-3 text-base font-medium text-white shadow-xl shadow-[#7F00FF]/50 transition duration-200 hover:bg-gradient-to-l">
          Button 17
        </button>
        <button className="rounded-xl bg-gradient-to-br from-[#29E9F5] via-[#7A64FF] to-[#FF508B] px-5 py-3 text-base font-medium text-white shadow-xl shadow-[#7A64FF]/50 transition duration-200 hover:bg-gradient-to-l">
          Button 18
        </button>
        <button className="rounded-xl bg-gradient-to-br from-[#FC00FF] via-[#504CF3] to-[#02FFD1] px-5 py-3 text-base font-medium text-white shadow-xl shadow-[#504CF3]/50 transition duration-200 hover:bg-gradient-to-l">
          Button 19
        </button>
        <button className="rounded-xl bg-gradient-to-br from-[#3C0066] via-[#EC38BC] to-[#FDEFF9] px-5 py-3 text-base font-medium text-white shadow-xl shadow-[#EC38BC]/50 transition duration-200 hover:bg-gradient-to-l">
          Button 20
        </button>
        <button className="rounded-xl bg-gradient-to-br from-[#EA52F8] to-[#0066FF] px-5 py-3 text-base font-medium text-white shadow-xl shadow-[#0066FF]/25 transition duration-200 hover:bg-gradient-to-l">
          Button 21
        </button>
      </div> */}
      {/* Sizes Buttons */}
      <div className="mt-20 flex flex-row flex-wrap items-center gap-3">
        <h1 className="font-bold text-navy-700 dark:text-white">Sizes</h1>
        <button className="rounded-lg bg-brand-500 p-2 text-xs font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
          Extra Small
        </button>
        <button className="rounded-lg bg-brand-500 px-3 py-2.5 text-sm font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
          Small Button
        </button>
        <button className="rounded-xl bg-brand-500 px-4 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
          Medium
        </button>
        <button className="rounded-xl bg-brand-500 px-5 py-4 text-lg font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
          Large
        </button>
        <button className="rounded-xl bg-brand-500 px-10 py-8 text-xl font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
          Extra Large
        </button>
      </div>
      {/* Icon Buttons */}
      <div className="mt-20 flex flex-row flex-wrap items-center gap-3">
        <h1 className="font-bold text-navy-700 dark:text-white">
          Icon Buttons
        </h1>
        <button className="flex items-center justify-center rounded-full bg-brand-500 p-2 text-3xl text-white transition duration-200 hover:cursor-pointer hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
          <MdChevronRight />
        </button>
        <button className="flex items-center justify-center rounded-xl bg-brand-500 p-2 text-3xl text-white transition duration-200 hover:cursor-pointer hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
          <MdChevronRight />
        </button>
        <button className="flex items-center justify-center rounded-full border-2 border-brand-500 p-2 text-3xl text-white transition duration-200 hover:cursor-pointer hover:bg-brand-600/10 active:bg-brand-700/10 dark:border-brand-400 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20">
          <MdChevronRight className="text-brand-500 dark:text-white" />
        </button>
        <button className="flex items-center justify-center rounded-xl border-2 border-brand-500 p-2 text-3xl text-white transition duration-200 hover:cursor-pointer hover:bg-brand-600/10 active:bg-brand-700/10 dark:border-brand-400 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20">
          <MdChevronRight className="text-brand-500 dark:text-white" />
        </button>
      </div>
      {/* Buttons with Icon */}
      <div className="mt-20 flex flex-row flex-wrap items-center gap-3">
        <h1 className="font-bold text-navy-700 dark:text-white">With Icon</h1>
        <button className="flex flex-row items-center rounded-xl bg-brand-500 px-4 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
          Default <MdChevronRight className="text-lg" />
        </button>
        <button className="flex flex-row items-center rounded-xl bg-gray-100 px-4 py-3 text-base font-medium text-navy-700 transition duration-200 hover:bg-gray-200 active:bg-gray-300 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30">
          Secondary <MdChevronRight className="text-lg" />
        </button>
        <button className="flex flex-row items-center rounded-xl bg-navy-700 px-4 py-3 text-base font-medium text-white transition duration-200 hover:bg-navy-800 active:bg-navy-900 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/30">
          Dark <MdChevronRight className="text-lg" />
        </button>
        <button className="flex flex-row items-center rounded-xl bg-blue-500 px-4 py-3 text-base font-medium text-white transition duration-200 hover:bg-blue-600 active:bg-blue-700 dark:bg-blue-400 dark:text-white dark:hover:bg-blue-300 dark:active:bg-blue-200">
          Blue <MdChevronRight className="text-lg" />
        </button>
        <button className="flex flex-row items-center rounded-xl bg-red-500 px-4 py-3 text-base font-medium text-white transition duration-200 hover:bg-red-600 active:bg-red-700 dark:bg-red-400 dark:text-white dark:hover:bg-red-300 dark:active:bg-red-200">
          Red <MdChevronRight className="text-lg" />
        </button>
        <button className="flex flex-row items-center rounded-xl bg-green-500 px-4 py-3 text-base font-medium text-white transition duration-200 hover:bg-green-600 active:bg-green-700 dark:bg-green-400 dark:text-white dark:hover:bg-green-300 dark:active:bg-green-200">
          Green <MdChevronRight className="text-lg" />
        </button>
        <button className="flex flex-row items-center rounded-xl bg-purple-500 px-4 py-3 text-base font-medium text-white transition duration-200 hover:bg-purple-600 active:bg-purple-700 dark:bg-purple-400 dark:text-white dark:hover:bg-purple-300 dark:active:bg-purple-200">
          Purple <MdChevronRight className="text-lg" />
        </button>
        <button className="flex flex-row items-center rounded-xl bg-yellow-500 px-4 py-3 text-base font-medium text-white transition duration-200 hover:bg-yellow-600 active:bg-yellow-700 dark:bg-yellow-400 dark:text-white dark:hover:bg-yellow-300 dark:active:bg-yellow-200">
          Yellow <MdChevronRight className="text-lg" />
        </button>
        <button className="flex flex-row items-center rounded-xl bg-orange-500 px-4 py-3 text-base font-medium text-white transition duration-200 hover:bg-orange-600 active:bg-orange-700 dark:bg-orange-400 dark:text-white dark:hover:bg-orange-300 dark:active:bg-orange-200">
          Orange <MdChevronRight className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default Buttons;
