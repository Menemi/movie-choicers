import styles from './SkeletonBlock.module.css';

import React from 'react';

type SkeletonBlockProps = {
    width?: number | string;
    height?: number | string;
    borderRadius?: number | string;
};

const SkeletonBlock: React.FC<SkeletonBlockProps> = ({ width, height, borderRadius }) => {
    return <div className={styles.container} style={{ width, height, borderRadius }}></div>;
};

export default SkeletonBlock;
