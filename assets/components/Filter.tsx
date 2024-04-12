import React from "react";

const Filter = ({ ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...rest}
    >
      <g clipPath="url(#clip0_406_4032)">
        <path
          d="M15.0001 24L9.00006 19.5V14.38L1.00006 5.38V3C1.00006 2.20435 1.31613 1.44129 1.87874 0.87868C2.44135 0.31607 3.20441 0 4.00006 0L20.0001 0C20.7957 0 21.5588 0.31607 22.1214 0.87868C22.684 1.44129 23.0001 2.20435 23.0001 3V5.38L15.0001 14.38V24Z"
          fill={rest.fill ?? "#fff"}
        />
      </g>
      <defs>
        <clipPath id="clip0_406_4032">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Filter;
