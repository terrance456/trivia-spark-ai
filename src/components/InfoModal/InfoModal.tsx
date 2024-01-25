import React, { ReactNode } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export interface InfoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  header?: ReactNode;
  content?: ReactNode;
  onClose?: () => void;
  preventBackdropClose?: boolean;
}

const InfoModal: React.FC<InfoModalProps> = ({ header, content, onClose, preventBackdropClose, ...props }: InfoModalProps) => {
  return (
    <Dialog {...props}>
      <DialogContent
        onInteractOutside={
          preventBackdropClose
            ? (e) => {
                e.preventDefault();
              }
            : undefined
        }
      >
        <DialogHeader>
          <DialogTitle>{header}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex justify-center">{<ExclamationTriangleIcon className="text-red-600 h-8 w-8" />}</div>
          <p className="text-muted-foreground text-center sm:text-start">{content || (props.open && "We apologize for the inconvenience. Please try again in awhile. Thank you for your patience.")}</p>
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" onClick={onClose}>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InfoModal;
