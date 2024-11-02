import React from "react";
import "./page.css";

interface PageProps {
  children?: React.ReactNode;
}

// eslint-disable-next-line no-undef
function Page({ children }: PageProps): JSX.Element {
  return (
    <div className="middle-section">
      <div className="content">{children}</div>
    </div>
  );
}

export default Page;
