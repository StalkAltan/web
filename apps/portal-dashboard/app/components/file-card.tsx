import { FolderIcon, MoreIcon, RecentIcon } from "./icons";

export enum FileTypes {
  Folder = "FOLDER",
  Document = "DOCUMENT",
  Image = "IMAGE",
}

interface FileCardProps {
  type: FileTypes;
  fileName: string;
  createdAt: string;
  size: string;
}

export const FileCardList = ({ children }: React.PropsWithChildren<{}>) => {
  return <div className="flex flex-row gap-x-8">{children}</div>;
};

export const FileCard = ({ type, fileName, createdAt, size }: FileCardProps) => {
  return (
    <div className="border-1 rounded-lg p-4 w-[calc((100%/4))]">
      <div className="flex justify-end">
        <MoreIcon className="text-ring/50" />
      </div>
      <FolderIcon className="text-ring" />
      <span className="block font-semibold my-4">{fileName}</span>
      <div className="flex justify-between items-center">
        <span className="text-primary-2 font-semibold text-sm">{size}</span>
        <div className="flex items-center space-x-2 text-primary-2">
          <RecentIcon />
          <span className="font-semibold text-sm">{createdAt}</span>
        </div>
      </div>
    </div>
  );
};
