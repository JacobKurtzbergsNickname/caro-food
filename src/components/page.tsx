import React from 'react';
import './page.css';

interface PageProps {
    children?: React.ReactNode;
}

function Page({children}:PageProps): JSX.Element {
    return (
        <div className="middle-section">
            <div className="content">
                {children}
            </div>
        </div>
    );
};

export default Page;