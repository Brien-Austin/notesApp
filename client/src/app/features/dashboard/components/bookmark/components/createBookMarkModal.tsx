"use client";

import Modal from "@/app/(dashboard)/dashboard/modal";
import CreateBookMark from "@/app/features/dashboard/components/bookmark/components/createBookMark";

type CreateBookmarkModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CreateBookmarkModal({
  isOpen,
  onClose,
}: CreateBookmarkModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1 className="text-2xl font-semibold text-[#626262] tracking-tight">
        Save New Bookmark 📌
      </h1>
      <p className="leading-tight text-sm font-normal text-[#414141] tracking-tight mb-4">
        Bookmark what matters — organize your web, one link at a time 🔗
      </p>
      <CreateBookMark onClose={onClose} />
    </Modal>
  );
}
