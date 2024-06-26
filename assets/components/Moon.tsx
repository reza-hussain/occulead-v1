import React from "react";

const Moon = ({ ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...rest}
    >
      <g clip-path="url(#clip0_406_3936)">
        <path
          d="M14 24.0003C10.8184 23.9969 7.76816 22.7315 5.51847 20.4818C3.26878 18.2321 2.00339 15.1819 1.99995 12.0003C1.84695 3.04432 12.0309 -2.98468 19.791 1.50932L21.344 2.37132L19.801 3.25132C13.101 6.93932 13.5909 17.1213 20.601 20.1573L22.222 20.8883L20.7549 21.8943C18.7683 23.2638 16.4129 23.9981 14 24.0003Z"
          fill={rest.fill ?? "#fff"}
        />
      </g>
      <defs>
        <clipPath id="clip0_406_3936">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Moon;
