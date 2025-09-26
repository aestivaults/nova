import { ReactElement } from "react";
import Button from "./button";
import Modal, { UseModal } from "./Modal";
import {
  CheckCircle,
  Info,
  TriangleAlert,
  TriangleAlertIcon,
} from "lucide-react";

export default function Dialog({
  name,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  type = "info", // info, success, warning, danger
  icon,
  confirmButtonVariant = "primary",
}: {
  name: string;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  type: "info" | "success" | "warning" | "danger";
  icon?: ReactElement;
  confirmButtonVariant?:
    | "primary"
    | "secondary"
    | "outline"
    | "text"
    | "success"
    | "danger";
}) {
  const { close } = UseModal();
  const iconMap = {
    info: <Info className="text-primary-400 text-3xl" />,
    success: <CheckCircle className="text-green-500 text-3xl" />,
    warning: <TriangleAlert className="text-yellow-500 text-3xl" />,
    danger: <TriangleAlertIcon className=" text-red-500 text-3xl" />,
  };

  const footerContent = (
    <>
      <Button variant="secondary" onClick={close}>
        {cancelText}
      </Button>
      <Button
        variant={confirmButtonVariant}
        onClick={() => {
          onConfirm();
          close();
        }}
      >
        {confirmText}
      </Button>
    </>
  );

  return (
    <Modal.Window
      name={name}
      title={title}
      size="small"
      footerContent={footerContent}
    >
      <div className="flex flex-col items-center text-center mb-4">
        <div className="mb-4">{icon || iconMap[type]}</div>
        <p>{message}</p>
      </div>
    </Modal.Window>
  );
}
