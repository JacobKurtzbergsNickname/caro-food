import "./editing-modal.css";
import { useState } from "react";

interface EditingModalProps {
  initialItemName: string;
  saveItemName: (itemName: string) => void;
}

export function EditingModal({
  initialItemName,
  saveItemName,
}: EditingModalProps): React.JSX.Element {
  const [itemName, setItemName] = useState<string>(initialItemName);

  function handleSave() {
    saveItemName(itemName);
  }
  return (
    <div>
      <h2>Edit Food Item</h2>
      <div className="modal-form">
        <input
          type="text"
          className="edit-input"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <button className="btn btn-primary" onClick={() => handleSave()}>
          Save
        </button>
      </div>
    </div>
  );
}
