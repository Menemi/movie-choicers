import styles from './MainScreen.module.css';

import React from 'react';
import TextCircle from 'modules/TextCircle/TextCircle';
import Button from '../../components/Button/Button';
import { ScreenType } from '../../types';
import ScreenTitle from '../../components/ScreenTitle/ScreenTitle';
import { ScreenProps } from '../../App';

type MainScreenProps = {
    navigateTo: (screen: ScreenType, props?: ScreenProps) => void;
};

const MainScreen: React.FC<MainScreenProps> = ({ navigateTo }) => {
    return (
        <div className={styles.container}>
            <ScreenTitle>Трудно выбрать фильм?</ScreenTitle>
            <h2 className={styles.subHeader}>Давай подберём тот, который понравится обоим!</h2>
            <div className={styles.circlesContainer}>
                <TextCircle
                    circle={{
                        color: 'var(--semiLight)',
                        borderColor: 'var(--dark)',
                        borderWidth: 2,
                    }}
                    midText={{
                        text: '1',
                        size: 36,
                        color: 'var(--dark)',
                        bold: true,
                    }}
                    mainText={{
                        text: 'Создай подборку',
                        color: 'var(--text)',
                        bold: true,
                    }}
                />
                <TextCircle
                    circle={{
                        color: 'var(--semiLight)',
                        borderColor: 'var(--dark)',
                        borderWidth: 2,
                    }}
                    midText={{
                        text: '2',
                        size: 36,
                        color: 'var(--dark)',
                        bold: true,
                    }}
                    mainText={{
                        text: 'Поделись ей',
                        color: 'var(--text)',
                        bold: true,
                    }}
                />
                <TextCircle
                    circle={{
                        color: 'var(--semiLight)',
                        borderColor: 'var(--dark)',
                        borderWidth: 2,
                    }}
                    midText={{
                        text: '3',
                        size: 36,
                        color: 'var(--dark)',
                        bold: true,
                    }}
                    mainText={{
                        text: 'Найдите идеальный фильм вместе',
                        color: 'var(--text)',
                        bold: true,
                    }}
                />
            </div>
            <div className={styles.buttonsContainer}>
                <Button onClick={() => navigateTo('create')}>Создать подборку</Button>
                <Button onClick={() => navigateTo('view')} theme="outline">
                    Начать поиск идеального фильма
                </Button>
            </div>
        </div>
    );
};

export default MainScreen;
