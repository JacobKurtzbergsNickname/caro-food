import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import type { FoodItemInput } from "src/types/FoodItem.client";
import Modal from "../modal/modal";
import { EditingModal } from "../modal/editing-modal/editing-modal";

interface EditButtonProps {
  item: FoodItemInput;
}

export function EditButton({ item }: EditButtonProps): React.JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditFoodItem = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        className="btn btn-primary food-list-button"
        onClick={handleEditFoodItem}
      >
        <FaEdit />
      </button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <EditingModal initialItemName={item.name} />
      </Modal>
    </>
  );
}
