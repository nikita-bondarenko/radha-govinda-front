import React, { memo, ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
export type ModalProps = {
  isOpen: boolean;
  children: ReactNode;
};

export default memo(function Modal({ isOpen, children }: ModalProps) {
  const modalRoot = useRef<HTMLElement | null>(null);
  useEffect(() => {
    modalRoot.current = document.getElementById("modal-root");
  }, []);

  const modal = (
    <div className={clsx("modal", { open: isOpen })}>
      <div className="modal__wrapper">
        <div className="modal__window">{children}</div>
      </div>
    </div>
  );
  return modalRoot.current ? createPortal(modal, modalRoot.current) : null;
});
