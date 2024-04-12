import React, { useEffect, useState } from "react";

// constants
import { packages } from "constants/packages";

// services
import { createPayment, getStripeProducts } from "services/stripe";

// assets
import Tick from "assets/components/Tick";

const ClinicPackages = () => {
  const [prices, setPrices] = useState(packages);

  const fetchPrices = async () => {
    const { response, error } = await getStripeProducts();

    if (error) {
      console.log({ error });
      return error;
    }

    if (response) {
      const newData = [...prices];

      response?.data?.prices?.map((item: any, idx: number) => {
        return (newData[idx] = {
          ...newData[idx],
          price: item.unit_amount / 100,
          id: item.id
        });
      });

      setPrices(newData);
      return;
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  return (
    <div className="w-full max-w-[70%] min-h-[calc(100vh-64px)] m-auto bg-white py-[24px] mt-[52px] dflex-center flex-col text-black gap-[24px]">
      <h2 className="text-[32px] font-[600]">Choose a package</h2>

      <div className="w-full dflex-between items-stretch">
        {prices.map((item) => (
          <Packages key={item.price} item={item} />
        ))}
      </div>
    </div>
  );
};

const Packages = ({ item }: { item: any }) => {
  const handleSubscription = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const { response, error } = await createPayment({
        priceId: item.id
      });

      if (error) {
        return error;
      }

      const url = response?.data?.url;

      window.location.href = url;
    } catch (err) {
      console.log({ err });
    }

    // window.location.assign(data);
  };
  return (
    <div className="w-full flex basis-[32%] flex-col justify-start items-start py-[24px] px-[16px] gap-[12px]">
      <h4 className="text-[24px] font-[500] w-full text-left">{item.name}</h4>
      <h3 className="text-[32px] font-[500] w-full text-left">${item.price}</h3>
      <p className="text-[14px] text-gray-600 font-[400] w-full text-left">
        per month, billed annually
      </p>
      <button
        onClick={handleSubscription}
        className="w-full flex justify-center items-center bg-blue-700 text-white py-[8px] px-[12px] rounded-md shadow-sm cursor-pointer"
      >
        Upgrade to {item?.name}
      </button>
      <p className="font-[500] text-[18px]">{item.desc}</p>
      <ul className="flex flex-col justify-start items-start gap-[5px]">
        {item.features?.map((list: any, index: number) => (
          <li
            key={index}
            className="flex justify-center items-center gap-[12px] font-[400] text-[14px] text-gray-500 ml-[5px]"
          >
            <Tick />
            <p>{list.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClinicPackages;
