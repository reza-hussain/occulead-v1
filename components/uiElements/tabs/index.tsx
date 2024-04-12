import React from "react";

interface TabProps {
  items: any[];
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
}

const Tabs: React.FC<TabProps> = ({ active, setActive, items }) => {
  return (
    <div className="w-full flex justify-start items-stretch shadow-[0_2px_0_0_#ccdfeb]">
      {items.map((item) => (
        <>
          <div
            className={`flex justify-center items-center p-[10px] text-black cursor-pointer ${
              active === item?.status || active === item
                ? "shadow-[0_2px_0_0_#11a1fd]"
                : "shadow-[0_1px_0_0_#ccdfeb]"
            }`}
            onClick={() => setActive(item?.status ?? item)}
          >
            <p>{item.name ?? item}</p>
          </div>
        </>
      ))}
    </div>
  );
};

export default Tabs;
