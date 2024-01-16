"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";
import { Button } from "./button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

export const ImageUpload = ({
  disabled,
  onChange,
  onRemove,
  value,
}: ImageUploadProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) return null;

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div
            key={url}
            className="rounded-md overflow-hidden h-[200px] relative w-[200px]"
          >
            <div className="z-10 absolute top-2 right-0">
              <Button
                size="icon"
                variant="destructive"
                onClick={() => onRemove(url)}
                type="button"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image fill src={url} alt="Image" className="object-cover" />
          </div>
        ))}
      </div>
      <CldUploadWidget uploadPreset="zwr083vx" onUpload={onUpload}>
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
              type="button"
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};
