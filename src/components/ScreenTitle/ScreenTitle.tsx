import styles from './ScreenTitle.module.css';

import React from 'react';

type ScreenTitleProps = {
    children: any;
    marginBottom?: number;
};

const ScreenTitle: React.FC<ScreenTitleProps> = ({ children, marginBottom }) => {
    return (
        <div className={styles.container} style={{ marginBottom }}>
            <h1 className={styles.title}>{children}</h1>
        </div>
    );
};

export default ScreenTitle;
