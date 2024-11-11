import { useState } from "react";

interface EditingModalProps {
  initialItemName: string;
}

export function EditingModal({
  initialItemName,
}: EditingModalProps): React.JSX.Element {
  const [itemName, setItemName] = useState<string>(initialItemName);
  return (
    <div>
      <h2>Edit Food Item</h2>
      <div className="modal-form">
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <button className="btn btn-primary">Save</button>
      </div>
    </div>
  );
}
