import Close from "assets/components/Close";

interface FormModalProps {
  children: React.ReactNode;
  title: string;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  id: string | undefined;
  buttonText?: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data?: any[];
}

const FormModal: React.FC<FormModalProps> = ({
  children,
  title,
  id,
  buttonText,
  onSubmit,
  isOpen = false,
  setIsOpen
}) => {
  return (
    isOpen && (
      <div
        onClick={() => {
          setIsOpen(false);
        }}
        className="w-screen flex justify-center items-center min-h-screen z-[999] bg-[rgba(0,0,0,0.2)] fixed top-0 left-0"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full basis-[35%] flex flex-col justify-start items-start bg-white text-black max-h-[70vh] rounded-lg pb-[20px] relative"
        >
          <h3 className="text-blue-950 font-[600] text-[20px] p-[16px] border-b border-b-gray-200 w-full ">
            {title}
          </h3>
          <Close
            onClick={() => setIsOpen(false)}
            className="absolute top-[25px] right-[15px] fill-gray-300 cursor-pointer"
          />
          <form
            onSubmit={onSubmit}
            className="w-full flex flex-col justify-start items-center gap-[20px] p-[16px]"
          >
            {children}
            <div className="w-full flex justify-between items-center">
              <button
                onClick={() => {
                  setIsOpen(false);
                }}
                className="w-full basis-[48%] flex justify-center items-center p-[12px] bg-transparent border border-gray-200 text-blue-950 rounded-md"
              >
                Cancel
              </button>
              <button className="w-full basis-[48%] flex justify-center items-center p-[12px] bg-blue-950 text-white rounded-md">
                {buttonText ?? "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default FormModal;
