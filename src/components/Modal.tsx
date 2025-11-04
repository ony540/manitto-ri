'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PlusIcon from '@/assets/icon/plus.svg';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const portalRoot = typeof window !== 'undefined' ? document.body : null;

  // 스크롤 방지
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!portalRoot) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="relative bg-background rounded-xl shadow-lg p-6 w-full flex flex-col items-center max-w-md">
              {children}

              <button
                type="button"
                onClick={onClose}
                className="rotate-45 absolute right-3 top-2.5 bg-gray-200 rounded-full p-0.5 "
              >
                <PlusIcon className=" w-[20px] h-[20px] " />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    portalRoot
  );
};
