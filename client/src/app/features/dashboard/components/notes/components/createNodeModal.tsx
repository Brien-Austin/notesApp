"use client";

import Modal from "@/app/(dashboard)/dashboard/modal";
import CreateNotes from "@/app/features/dashboard/components/notes/components/createNotes";

type CreateNoteModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CreateNoteModal({
  isOpen,
  onClose,
}: CreateNoteModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h1 className="text-2xl font-semibold text-[#626262] tracking-tight">
        Create New Note
      </h1>
      <p className="leading-tight text-sm font-normal text-[#414141] tracking-tight mb-4">
        Keep track of your thoughts — tag, search, and save effortlessly 📒
      </p>

      <CreateNotes onClose={onClose} />
    </Modal>
  );
}
