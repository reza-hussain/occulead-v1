import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const SidebarItem: React.FC<SidebarItemProps> = ({
  isOpen,
  icon,
  title,
  children,
  url
}) => {
  const [expandChildren, setExpandChildren] = useState(false);
  const router = useRouter();

  const handleClick = (url: string | undefined) => {
    if (!url) {
      setExpandChildren((prev) => !prev);
    } else {
      router.push(url);
    }
  };

  useEffect(() => {
    !isOpen && setExpandChildren(false);
  }, [isOpen]);

  return isOpen ? (
    <>
      <div
        onClick={() => handleClick(url)}
        className="w-full grid grid-cols-[20%_80%] p-[4px_0px] rounded-md text-white hover:bg-[rgba(255,255,255,0.1)] cursor-pointer"
      >
        <div className="dflex-center w-[32px] h-[32px]">{icon ?? <></>}</div>
        <div className="w-full hidden group-hover:dflex-between">
          <p>{title}</p>
        </div>
      </div>
      <div
        className={`w-full ${expandChildren ? "dflex-start" : "hidden"} flex-col gap-[24px] overflow-hidden cursor-pointer`}
      >
        {children?.map((child) => (
          <SidebarItem key={child.title} {...child} isOpen={expandChildren} />
        ))}
      </div>
    </>
  ) : (
    <div className="w-full dflex-start p-[4px_0px] rounded-md cursor-pointer">
      <div className="dflex-center w-[32px] h-[32px]">{icon ?? <></>}</div>
    </div>
  );
};

export default SidebarItem;
