"use client";
import HeroText from "@/app/features/common/components/heroText";
import DashboardLayout from "../layout";
import { Button } from "@/app/features/common/components/button";
import { useState } from "react";
import Modal from "../modal";

export default function Notes() {
  const [open, setOpen] = useState(false);
  {
    return (
      <main>
        <div className="flex justify-between items-center">
          <HeroText content="Notes" />
          <Button onClick={() => setOpen(true)} variant="outline">
            Create Note
          </Button>
          <Modal isOpen={open} onClose={() => setOpen(false)}>
            <Button onClick={() => setOpen(false)} color="blue">
              Close
            </Button>
          </Modal>
        </div>
      </main>
    );
  }
}
