"use client"
import { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from './modal.module.css'
import CrossIcon from "../svg/cross-icon";

interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
    isTrailer?: boolean;
    isOpen: boolean;
}


const Modal: React.FC<ModalProps> = ({ onClose, children, isTrailer, isOpen }) => {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.code === `Escape`) {
                onClose();
            }
        };
        window.addEventListener("keydown", handleEscape);
        return () => {
            window.removeEventListener("keydown", handleEscape);
        };
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const handleClose = (e: React.MouseEvent<HTMLElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return createPortal(
        <div className={styles.backdrop} onClick={handleClose}>
            <div style={{ transform: 'translate(-50% -50%)' }} className={styles.modalContainer} >
                {!isTrailer && <button onClick={handleClose} type="button">
                    <CrossIcon className={`${styles.closeModal} w-[16px] h-[16px] cursor-pointer`} />
                </button>}
                {children}
            </div>
        </div>,
        document.querySelector("body")!
    );
};

export default Modal;