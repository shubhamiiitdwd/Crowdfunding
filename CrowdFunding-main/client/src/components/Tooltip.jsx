import React from "react";

function Tooltip({ children, message, isHide }) {
  return (
    <div className="group relative flex">
      {children}
      {!isHide ? (
        <span className="absolute -top-2 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100 w-max left-12">
          {message}
        </span>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Tooltip;
