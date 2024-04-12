import Image from "next/image";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  icon?: string;
  showIcon?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label = "Submit",
  icon = "",
  showIcon = false,
  disabled = false,
  ...props
}) => {
  return (
    <button
      className={`dflex-center gap-3 py-2 px-3 rounded-[0.25rem] border-none cursor-pointer bg-themeSidebarBlue text-white ${disabled ? "opacity-60 pointer-events-none cursor-default" : ""}`}
      {...props}
    >
      <p>{label}</p>
      {showIcon && icon && <Image src={icon} alt="close" />}
    </button>
  );
};

export default Button;
