import { cn } from "@/utils/cn";
import { Button, Image, Spinner } from "@heroui/react";
import { ChangeEvent, useEffect, useId, useRef } from "react";
import { CiSaveUp2, CiTrash } from "react-icons/ci";

interface PropTypes {
  name: string;
  isDropable?: boolean;
  className?: string;
  onUpload?: (files: FileList) => void;
  onDelete?: () => void;
  isUploading?: boolean;
  isInvalid?: boolean;
  isDeleting?: boolean;
  errorMessage?: string;
  preview?: string;
}

const InputFile = (props: PropTypes) => {
  const {
    name,
    isDropable = false,
    className,
    isInvalid,
    errorMessage,
    onDelete,
    onUpload,
    isUploading,
    isDeleting,
    preview,
  } = props;
  const drop = useRef<HTMLLabelElement>(null);
  const dropzoneId = useId();

  const handleDragOver = (e: DragEvent) => {
    if (isDropable) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer?.files;
    if (files && onUpload) {
      onUpload(files);
    }
  };

  useEffect(() => {
    const dropCurrent = drop.current;
    if (dropCurrent) {
      dropCurrent.addEventListener("dragover", handleDragOver);
      dropCurrent.addEventListener("drop", handleDrop);

      return () => {
        dropCurrent.removeEventListener("dragover", handleDragOver);
        dropCurrent.removeEventListener("drop", handleDrop);
      };
    }
  });

  const handleOnUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && onUpload) {
      onUpload(files);
    }
  };

  return (
    <div>
      <label
        ref={drop}
        htmlFor={`dropzone-file-${dropzoneId}`}
        className={cn(
          `
    relative
    block
    w-full
    cursor-pointer
    rounded-lg
    border-2
    border-dashed
    border-gray-400
    bg-gray-200
    transition
    hover:bg-gray-300
    ${onUpload ? "p-4" : "h-40"}
  `,
          className,
          {
            "border-danger-500": isInvalid,
          }
        )}
      >
        {preview && (
          <div className="relative flex w-full flex-col items-center gap-3">
            <Image
              src={preview}
              alt="preview"
              className="max-h-64 w-auto object-contain"
            />
            <Button
              isIconOnly
              onPress={onDelete}
              disabled={isDeleting}
              className="absolute right-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded bg-danger-100"
            >
              {isDeleting ? (
                <Spinner size="sm" color="danger" />
              ) : (
                <CiTrash className="h-5 w-5 text-danger-500" />
              )}
            </Button>
          </div>
        )}

        {!preview && !isUploading && (
          <div className="flex h-full flex-col items-center justify-center p-5">
            <CiSaveUp2 className="mb-2 h-10 w-10 text-gray-400" />
            <p className="text-center text-sm font-semibold text-gray-500">
              {isDropable
                ? "Drag and drop or click to upload file here"
                : "Click to upload file here"}
            </p>
          </div>
        )}
        {isUploading && (
          <div className="flex flex-col items-center justify-center p-5">
            <Spinner color="danger" />
          </div>
        )}
        <input
          name={name}
          type="file"
          className="hidden"
          accept="image/*"
          id={`dropzone-file-${dropzoneId}`}
          onChange={handleOnUpload}
          disabled={!!preview}
          onClick={(e) => {
            e.currentTarget.value = "";
            e.target.dispatchEvent(new Event("Change", { bubbles: true }));
          }}
        ></input>
      </label>
      {isInvalid && (
        <p className="p-1 text-xs text-danger-500">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputFile;
