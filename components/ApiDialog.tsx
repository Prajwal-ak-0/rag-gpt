"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";

interface ApiDialogProps {
  hasApiKey: boolean;
}

const ApiDialog: React.FC<ApiDialogProps> = ({ hasApiKey }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(!hasApiKey);
  }, [hasApiKey]);
  return (
    <div>
      <Dialog open={hasApiKey}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter your OpenAI API Key</DialogTitle>
            <DialogDescription>
              To use our service, you need to provide your OpenAI API key. This
              key will be used to make requests to the OpenAI API on your
              behalf. Please ensure that you keep this key secure and do not
              share it with anyone.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApiDialog;
