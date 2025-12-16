import classNames from "classnames";

export const inputClassName = classNames(
  "mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out focus:outline-none focus:border-blue-500"
);

export const submitClassName = classNames(
  "w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-150 ease-in-out cursor-pointer active:bg-blue-800"
);
export const submitClassNameDisabled = classNames(
  "w-full bg-blue-300 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-300 hover:shadow-lg transition duration-150 ease-in-out cursor-not-allowed active:bg-blue-300 "
);

export const pswIconClassName = classNames(
  "absolute right-3 top-3 text-xl cursor-pointer text-gray-600"
);
