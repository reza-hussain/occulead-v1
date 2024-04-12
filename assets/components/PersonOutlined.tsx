const PersonOutlined = ({ ...rest }) => {
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
        d="M18 24.0006H16V18.9576C15.9992 18.1736 15.6874 17.4219 15.133 16.8676C14.5787 16.3132 13.827 16.0014 13.043 16.0006H4.95699C4.17299 16.0014 3.42133 16.3132 2.86695 16.8676C2.31258 17.4219 2.00079 18.1736 1.99999 18.9576V24.0006H-7.62939e-06V18.9576C0.0015802 17.6434 0.524344 16.3835 1.45362 15.4542C2.38289 14.525 3.6428 14.0022 4.95699 14.0006H13.043C14.3572 14.0022 15.6171 14.525 16.5464 15.4542C17.4756 16.3835 17.9984 17.6434 18 18.9576V24.0006Z"
        fill={rest.fill ?? "#fff"}
      />
      <path
        d="M8.99994 11.9999C7.81325 11.9999 6.65321 11.648 5.66651 10.9888C4.67982 10.3295 3.91078 9.3924 3.45666 8.29604C3.00253 7.19969 2.88371 5.99329 3.11522 4.8294C3.34673 3.66551 3.91818 2.59642 4.75729 1.7573C5.59641 0.918186 6.66551 0.346741 7.82939 0.11523C8.99328 -0.116281 10.1997 0.00253868 11.296 0.456664C12.3924 0.91079 13.3295 1.67983 13.9888 2.66652C14.648 3.65321 14.9999 4.81325 14.9999 5.99994C14.9983 7.59075 14.3657 9.11595 13.2408 10.2408C12.1159 11.3657 10.5907 11.9984 8.99994 11.9999ZM8.99994 1.99994C8.20881 1.99994 7.43545 2.23454 6.77765 2.67406C6.11986 3.11359 5.60717 3.7383 5.30442 4.46921C5.00167 5.20011 4.92245 6.00438 5.07679 6.7803C5.23113 7.55623 5.6121 8.26896 6.17151 8.82837C6.73092 9.38778 7.44365 9.76874 8.21957 9.92308C8.9955 10.0774 9.79976 9.99821 10.5307 9.69546C11.2616 9.39271 11.8863 8.88002 12.3258 8.22222C12.7653 7.56443 12.9999 6.79107 12.9999 5.99994C12.9999 4.93908 12.5785 3.92166 11.8284 3.17151C11.0782 2.42137 10.0608 1.99994 8.99994 1.99994Z"
        fill={rest.fill ?? "#fff"}
      />
    </svg>
  );
};

export default PersonOutlined;