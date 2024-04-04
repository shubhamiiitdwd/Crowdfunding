import React from "react";

function CustomButton({ btnType, handleClick, styles, title, disabled }) {
  return (
    <button
      type={btnType}
      className={`font-epilogue font-semibold text-white min-h-[52px] px-4 rounded-[10px] ${styles}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
}

export default CustomButton;
