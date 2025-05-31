import styles from './ScreenContainer.module.css';

import React from 'react';
import { ScreenType } from '../../types';
import { ScreenProps } from '../../App';

type ScreenContainerProps = {
    children: React.ReactNode;
    navigateTo: (screen: ScreenType, props?: ScreenProps) => void;
};

const ScreenContainer: React.FC<ScreenContainerProps> = ({ children, navigateTo }) => {
    return (
        <>
            <div onClick={() => navigateTo('main')} className={styles.logo}>
                <h1>Movie Choicer</h1>
            </div>
            {children}
        </>
    );
};

export default ScreenContainer;
