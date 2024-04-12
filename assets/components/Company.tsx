import React from "react";

const Company = ({ ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...rest}
    >
      <g clipPath="url(#clip0_403_3728)">
        <path
          d="M4 13H7V15H4V13ZM9 15H12V13H9V15ZM4 19H7V17H4V19ZM9 19H12V17H9V19ZM4 7H7V5H4V7ZM9 7H12V5H9V7ZM4 11H7V9H4V11ZM9 11H12V9H9V11ZM24 8V24H0V3C0 2.20435 0.31607 1.44129 0.87868 0.87868C1.44129 0.31607 2.20435 0 3 0L13 0C13.7956 0 14.5587 0.31607 15.1213 0.87868C15.6839 1.44129 16 2.20435 16 3V5H21C21.7956 5 22.5587 5.31607 23.1213 5.87868C23.6839 6.44129 24 7.20435 24 8ZM14 3C14 2.73478 13.8946 2.48043 13.7071 2.29289C13.5196 2.10536 13.2652 2 13 2H3C2.73478 2 2.48043 2.10536 2.29289 2.29289C2.10536 2.48043 2 2.73478 2 3V22H14V3ZM22 8C22 7.73478 21.8946 7.48043 21.7071 7.29289C21.5196 7.10536 21.2652 7 21 7H16V22H22V8ZM18 15H20V13H18V15ZM18 19H20V17H18V19ZM18 11H20V9H18V11Z"
          fill="#fff"
          {...rest}
        />
      </g>
      <defs>
        <clipPath id="clip0_403_3728">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Company;
