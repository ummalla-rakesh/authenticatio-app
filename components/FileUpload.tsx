"use client";

import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/dropzone";
import { useSupabaseUpload } from "@/hooks/use-supabase-upload";
import { FC } from "react";
interface FileUploadProps {
  onUploadComplete?: (urls: string[]) => void;
  bucketName: string;
  path: string;
  maxFiles?: number;
}
const FileUpload: FC<FileUploadProps> = ({
  onUploadComplete,
  bucketName,
  path,
  maxFiles = 1,
}) => {
  const props = useSupabaseUpload({
    bucketName,
    path,
    allowedMimeTypes: ["image/*"],
    maxFiles,
    maxFileSize: 1000 * 1000 * 10, // 10MB,
    onUploadComplete,
  });

  return (
    <div className="w-full">
      <Dropzone {...props}>
        <DropzoneEmptyState />
        <DropzoneContent />
      </Dropzone>
    </div>
  );
};

export { FileUpload };
