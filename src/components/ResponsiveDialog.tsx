'use client';

import { useIsMobile } from '@/hooks/useIsMobile';
import { BottomSheet } from './BottomSheet';
import { Modal } from './Modal';

type ResponsiveDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
};

export const ResponsiveDialog = ({
  isOpen,
  onClose,
  children,
  className,
}: ResponsiveDialogProps) => {
  const isMobile = useIsMobile();

  return isMobile ? (
    <BottomSheet isOpen={isOpen} onClose={onClose} className={className}>
      {children}
    </BottomSheet>
  ) : (
    <Modal isOpen={isOpen} onClose={onClose}>
      {children}
    </Modal>
  );
};
