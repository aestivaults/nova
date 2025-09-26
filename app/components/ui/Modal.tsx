// Modal Component
"use client";

import React, {
  ButtonHTMLAttributes,
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from "react";
import { UseOutsideClick } from "@/app/hooks/useOutsideClick";
import { X } from "lucide-react";

interface ModalContextType {
  open: (name: string) => void;
  modalName: string;
  close: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export default function Modal({ children }: { children: ReactNode }) {
  const [modalName, setModalName] = useState("");
  const open = (name: string) => setModalName(name);
  const close = () => setModalName("");
  return (
    <ModalContext.Provider value={{ open, modalName, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({
  children,
  name,
}: {
  children: ReactElement<ButtonHTMLAttributes<HTMLButtonElement>>;
  name: string;
}) {
  const { open } = UseModal();
  return React.cloneElement(children, { onClick: () => open(name) });
}

function Window({
  children,
  name,
  title,
  footerContent,
  size = "medium",
  className,
}: {
  children: ReactNode;
  name: string;
  title: string;
  footerContent?: ReactNode;
  size?: "medium" | "small" | "large" | "xlarge" | "xxlarge" | "fullscreen";
  className?: string;
}) {
  const { modalName, close } = UseModal();
  const { handleBackdropClick, modalRef } = UseOutsideClick(close);
  if (name !== modalName) return null;

  const sizeClasses = {
    small: "max-w-sm",
    medium: "max-w-md",
    large: "max-w-lg",
    xlarge: "max-w-xl",
    xxlarge: "max-w-2xl",
    fullscreen: "max-w-none w-[90vw] h-[90vh]",
  };

  return (
    <div className={`modal-backdrop show`} onClick={handleBackdropClick}>
      <div
        ref={modalRef}
        className={`modal-container glass-card ${sizeClasses[size]} ${className}`}
      >
        {title && (
          <div className="modal-header">
            <h3 className="text-lg font-bold">{title}</h3>

            <button
              className="btn-icon bg-transparent text-light/70 hover:text-light hover:bg-light/10"
              onClick={close}
            >
              <X />
            </button>
          </div>
        )}

        <div className="modal-body">{children}</div>

        {footerContent && <div className="modal-footer">{footerContent}</div>}
      </div>
    </div>
  );
}

Modal.Window = Window;
Modal.Open = Open;

export function UseModal() {
  const context = useContext(ModalContext);
  if (context === null)
    throw new Error("modal context cannot be access outside its provider");
  return context;
}
