import React from "react";

const Person = ({ ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="24"
      viewBox="0 0 18 24"
      fill="none"
      {...rest}
    >
      <path
        d="M9 12C12.3137 12 15 9.31371 15 6C15 2.68629 12.3137 0 9 0C5.68629 0 3 2.68629 3 6C3 9.31371 5.68629 12 9 12Z"
        fill="#fff"
        {...rest}
      />
      <path
        d="M9 13.9991C4.03172 14.0046 0.00553125 18.0308 0 22.9991C0 23.5514 0.447703 23.9991 0.999984 23.9991H17C17.5522 23.9991 18 23.5514 18 22.9991C17.9945 18.0308 13.9683 14.0046 9 13.9991Z"
        fill="#fff"
        {...rest}
      />
    </svg>
  );
};

export default Person;
