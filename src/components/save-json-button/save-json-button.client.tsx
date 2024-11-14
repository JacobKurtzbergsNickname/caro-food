import React from "react";
import { saveJSON } from "./save-json.client";

function SaveJSONButton(): React.JSX.Element {
  return (
    <button className="btn btn-primary" onClick={saveJSON}>
      Save JSON
    </button>
  );
}

export default SaveJSONButton;
