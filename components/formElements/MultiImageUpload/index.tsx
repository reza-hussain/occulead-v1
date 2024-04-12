import React, { ChangeEvent, HTMLProps } from "react";
import Image from "next/image";

// assets
import Upload from "assets/components/Upload";
import Trash from "assets/components/Trash";

interface ImageUploadProps extends HTMLProps<HTMLInputElement> {
  classNames?: string;
  id: string;
  setFiles?: React.Dispatch<React.SetStateAction<string[]>>;
  files: string[];
}

const MultiImageUpload: React.FC<ImageUploadProps> = ({
  classNames,
  id,
  setFiles,
  files = []
}) => {
  const onMultipleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const filesArr: FileList | null = e.target.files;

    if (filesArr?.length) {
      Array.from(filesArr).map((file: File) => {
        const image = URL.createObjectURL(file);
        setFiles?.((prev: string[]) => [...prev, image]);
      });
    }
  };

  const handleFileDelete = (file: string) => {
    setFiles?.((prev) => prev?.filter((item) => item !== file));
  };

  return files?.length ? (
    <div className="dflex-start w-full basis-[100%] border border-gray-200 rounded-md p-[12px] gap-[12px]">
      {files?.map((file) => (
        <div
          key={file}
          className="dflex-center relative transition-all duration-300 ease-linear w-[150px] h-[100px] overflow-hidden group rounded-md"
        >
          <div className="w-full h-full opacity-0 group-hover:opacity-100 transition-all duration-300 ease-linear absolute z-[2] bg-[rgba(0,0,0,0.5)]"></div>
          <Trash
            width={20}
            height={20}
            className="z-[3] opacity-0 group-hover:opacity-100 absolute transition-all duration-300 ease-linears bg-blue-950 p-[5px] rounded-full cursor-pointer"
            fill="#fff"
            onClick={() => handleFileDelete(file)}
          />
          <Image
            src={file}
            alt=""
            width={150}
            height={150}
            className="object-cover"
          />
        </div>
      ))}
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
        onChange={onMultipleImageUpload}
      />
      <Upload fill="rgb(23 37 84)" />
      <p className="text-[14px] text-gray-400">Upload File</p>
    </label>
  );
};

export default MultiImageUpload;
