"use client"
import React, { memo, ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import styles from './Modal.module.css'
export type ModalProps = {
  isOpen: boolean;
  children: ReactNode;
  className?: string
};

export default memo(function Modal({ isOpen, children, className }: ModalProps) {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null)
  useEffect(() => {
   const modalRoot = document.getElementById("modal-root");
   setModalRoot(modalRoot)
  }, []);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = 'auto'

    }
      }, [isOpen])
  const modal = (
    <div className={clsx(styles["modal"],  isOpen && styles["open"], className)}>
      <div className={styles["modal__wrapper"]}>
        <div className={styles["modal__window"]}>{children}</div>
      </div>
    </div>
  );
  return modalRoot ? createPortal(modal, modalRoot) : null;
});
