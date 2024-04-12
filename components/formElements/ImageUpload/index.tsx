import React, { ChangeEvent, HTMLProps } from "react";
import Image from "next/image";

// assets
import Upload from "assets/components/Upload";
import Trash from "assets/components/Trash";

interface ImageUploadProps extends HTMLProps<HTMLInputElement> {
  classNames?: string;
  id: string;
  setFile?: (url: string) => void;
  file: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  classNames,
  id,
  setFile = () => {},
  file = ""
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];

    if (file) {
      const pic = URL.createObjectURL(file) ?? "";

      setFile(pic);
    }
  };
  return file?.length ? (
    <div
      className={`${classNames} w-full flex flex-col gap-[12px] cursor-pointer justify-center items-center border border-gray-200 rounded-md p-[20px]`}
    >
      <div className="dflex-center w-[160px] h-[160px] border border-gray-200 rounded-full overflow-hidden relative group">
        <div className="w-full h-full opacity-0 group-hover:opacity-100 transition-all duration-300 ease-linear absolute z-[2] bg-[rgba(0,0,0,0.5)]"></div>
        <Trash
          width={40}
          height={40}
          className="z-[3] opacity-0 group-hover:opacity-100 absolute transition-all duration-300 ease-linears bg-blue-950 p-[10px] rounded-full cursor-pointer"
          fill="#fff"
          onClick={() => setFile("")}
        />
        <Image
          src={file}
          width={160}
          height={160}
          alt="profile"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  ) : (
    <label
      htmlFor={id}
      className={`${classNames} w-full flex flex-col gap-[12px] cursor-pointer justify-center items-center border border-gray-200 rounded-md p-[20px]`}
    >
      <input
        type="file"
        id={id}
        accept="image/png, image/jpeg"
        className="hidden"
        onChange={handleChange}
      />
      <Upload fill="rgb(23 37 84)" />
      <p className="text-[14px] text-gray-400">Upload File</p>
    </label>
  );
};

export default ImageUpload;
