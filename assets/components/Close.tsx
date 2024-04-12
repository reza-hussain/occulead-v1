import React from "react";

const Close = ({ ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      {...rest}
    >
      <path
        d="M13.7068 1.70685L12.2928 0.292847L6.99985 5.58585L1.70685 0.292847L0.292847 1.70685L5.58585 6.99985L0.292847 12.2928L1.70685 13.7068L6.99985 8.41385L12.2928 13.7068L13.7068 12.2928L8.41385 6.99985L13.7068 1.70685Z"
        fill="#fff"
        {...rest}
      />
    </svg>
  );
};

export default Close;
