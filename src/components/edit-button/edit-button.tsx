import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import type { FoodItemInput } from "src/types/FoodItem.client";
import Modal from "../modal/modal";
import { EditingModal } from "../modal/editing-modal/editing-modal";

interface EditButtonProps {
  item: FoodItemInput;
  saveFunction: (id: number, item: Partial<FoodItemInput>) => void;
}

export function EditButton({
  item,
  saveFunction,
}: EditButtonProps): React.JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedItemName, setEditedItemName] = useState(item.name);

  useEffect(() => {
    saveFunction(item.localID, { ...item, name: editedItemName });
    handleCloseModal();
  }, [editedItemName]);

  const handleEditFoodItem = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  function saveItemName(itemName: string) {
    setEditedItemName(itemName);
  }

  return (
    <>
      <button
        className="btn btn-primary food-list-button"
        onClick={handleEditFoodItem}
      >
        <FaEdit />
      </button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <EditingModal initialItemName={item.name} saveItemName={saveItemName} />
      </Modal>
    </>
  );
}
