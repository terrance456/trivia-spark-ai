import React, { ReactNode } from "react";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button, ButtonProps } from "../ui/button";

export type ConfirmModalContent = Omit<ConfirmModalProps, "onOpenChange">;

export interface ConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  header?: ReactNode;
  content?: ReactNode;
  closeBtn?: ButtonProps;
  confirmBtn?: ButtonProps;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ header, content, closeBtn, confirmBtn, ...props }: ConfirmModalProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>{header}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p className="text-sm text-slate-600 dark:text-slate-300 text-center sm:text-start">{content}</p>
        </div>
        <DialogFooter className="justify-between flex-row sm:justify-end">
          <DialogClose asChild>
            <Button className="w-full sm:w-auto mr-5" type="button" variant="secondary" {...closeBtn}>
              {closeBtn?.children || "Close"}
            </Button>
          </DialogClose>
          <Button className="w-full sm:w-auto" type="button" {...confirmBtn}>
            {confirmBtn?.children || "Proceed"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmModal;
