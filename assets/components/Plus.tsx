import React from "react";

const Plus = ({ ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...rest}
    >
      <path
        d="M13 11V6H11V11H6V13H11V18H13V13H18V11H13Z"
        fill={rest.fill ?? "#fff"}
      />
    </svg>
  );
};

export default Plus;
