// types
import Button from "components/uiElements/button";
import { OnboardingFormValues } from "types/containers/onboarding/formTypes";

interface ComponentType {
  formValues: OnboardingFormValues;
  setFormValues: React.Dispatch<React.SetStateAction<OnboardingFormValues>>;
  handleNext: () => void;
}

const UserType: React.FC<ComponentType> = ({
  formValues,
  setFormValues,
  handleNext
}) => {
  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value as OnboardingFormValues["userType"];
    setFormValues({
      ...formValues,
      userType: value
    });
  };

  return (
    <form className="w-[60%] flex flex-col justify-center items-center gap-[24px] text-gray-200">
      <label
        htmlFor="clinic"
        className={`w-full flex flex-col justify-start items-start bg-white border ${formValues?.userType === "clinic" ? "border-blue-400" : "border-gray-400"} px-[16px] py-[8px] rounded-md cursor-pointer`}
      >
        <input
          type="checkbox"
          id="clinic"
          className="hidden"
          value="clinic"
          onChange={handleCheckbox}
        />
        <h2
          className={`w-full text-[24px] font-[700] ${formValues?.userType === "clinic" ? "text-blue-500" : "text-gray-700"}`}
        >
          Clinic
        </h2>
        <p
          className={`w-full text-[16px] font-[500] ${formValues?.userType === "clinic" ? "text-blue-400" : "text-gray-400"}`}
        >
          Find powerful features to manage your clinic appointments
        </p>
      </label>

      <label
        htmlFor="company"
        className={`w-full flex flex-col justify-start items-start bg-white border ${formValues?.userType === "company" ? "border-blue-400" : "border-gray-400"} px-[16px] py-[8px] rounded-md cursor-pointer`}
      >
        <input
          type="checkbox"
          id="company"
          className="hidden"
          value="company"
          onChange={handleCheckbox}
        />
        <h2
          className={`w-full text-[24px] font-[700] ${formValues?.userType === "company" ? "text-blue-500" : "text-gray-700"}`}
        >
          Company
        </h2>
        <p
          className={`w-full text-[16px] font-[500] ${formValues?.userType === "company" ? "text-blue-400" : "text-gray-400"}`}
        >
          Make it easy to manage medical appointments for your employees
        </p>
      </label>

      <div className="w-full dflex-end items-center text-black pt-[20px]">
        <Button
          id="onboarding-next"
          onClick={(e) => {
            e.preventDefault();
            handleNext();
          }}
          label="Next"
        />
      </div>
    </form>
  );
};

export default UserType;
