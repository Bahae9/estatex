import { Loader2, Trash } from "lucide-react";
import React, { ChangeEvent, useState } from "react";
import { Card } from "../ui/card";
import { toast } from "../ui/use-toast";
import { cn } from "@/lib/utils";

interface MultiImageUploadProps {
  value: {
    publicId: string;
    url: string;
  }[];
  isLoading: boolean;
  setValue: React.Dispatch<
    React.SetStateAction<
      {
        publicId: string;
        url: string;
      }[]
    >
  >;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const MultiImageUpload: React.FC<MultiImageUploadProps> = ({
  value,
  isLoading,
  setIsLoading,
  setValue,
}) => {
  const [message, setMessage] = useState<string | undefined>();

  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    setMessage("");
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) {
      toast({
        description: "Please select an image.",
        variant: "destructive",
      });
      return;
    }
    if (fileList.length > 1) {
      toast({
        description: "Please select only one image.",
        variant: "destructive",
      });
      return;
    }
    const file = fileList[0];
    const formData = new FormData();
    formData.append("file", file);

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/images/upload", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        setValue([
          ...value,
          { publicId: data.public_id, url: data.secure_url },
        ]);
      } else {
        toast({
          description: "Failed to upload image.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        description: "Failed to upload image.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const removeImage = async (publicId: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:8080/api/images/delete/${publicId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setValue(value.filter((image) => image.publicId !== publicId));
      } else {
        toast({
          description: "Failed to delete image.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        description: "Failed to delete image.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card>
        <div className="m-4">
          <span className="flex justify-center items-center text-base font-semibold mb-1 text-destructive">
            {message}
          </span>
          <div className="flex items-center justify-center w-full relative">
            <label
              className="flex cursor-pointer flex-col h-32 border-2 rounded-md border-dashed hover:bg-gray-100 hover:border-gray-300"
              style={{ width: "100%" }}
            >
              <div className="flex flex-col items-center justify-center h-full w-full">
                {isLoading ? (
                  <div className="opacity-60 flex gap-2">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    Please wait
                  </div>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-12 h-12 text-muted-foreground"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="pt-1 text-sm tracking-wider text-muted-foreground">
                      Select a photo
                    </p>
                  </>
                )}
              </div>
              <input
                type="file"
                onChange={handleFile}
                className="opacity-0 hidden"
                multiple={false}
                disabled={isLoading}
              />
            </label>
          </div>
          {value && value.length > 0 && (
            <div className="flex flex-col justify-center gap-6 mt-4">
              {value.map((imageUrl, index) => (
                <div
                  key={index}
                  className={cn(
                    "overflow-hidden relative",
                    isLoading && "opacity-60"
                  )}
                >
                  <button
                    className="absolute top-0 right-0 p-4 text-white hover:text-destructive transition-colors bg-foreground/80"
                    onClick={() => {
                      if (isLoading) return;
                      removeImage(imageUrl.publicId);
                    }}
                    disabled={isLoading}
                    type="button"
                  >
                    <Trash size={20} />
                  </button>
                  <img
                    src={imageUrl.url}
                    alt=""
                    className="h-[300px] md:h-[400px] object-cover w-full rounded-md"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </>
  );
};

export default MultiImageUpload;
