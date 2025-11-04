'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

type BottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
};

export const BottomSheet = ({ isOpen, onClose, children, className }: BottomSheetProps) => {
  const portalRoot = typeof window !== 'undefined' ? document.body : null;

  // 스크롤 방지
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

  if (!portalRoot) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 배경 */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* 바텀시트 */}
          <motion.div
            className={`fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-2xl shadow-lg p-4 pt-6 max-h-[80vh] overflow-y-auto flex flex-col items-center  ${className}`}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    portalRoot
  );
};
