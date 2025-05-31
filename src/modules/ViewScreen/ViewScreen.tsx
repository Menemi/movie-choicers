import styles from './ViewScreen.module.css';

import React, { ChangeEvent, useState } from 'react';
import ScreenTitle from '../../components/ScreenTitle/ScreenTitle';
import Button from '../../components/Button/Button';
import { decrypt } from '../../helpers';
import { ScreenType } from '../../types';
import { ScreenProps } from '../../App';
import { useNotification } from '../Notification/NotificationProvider';

type ViewScreenProps = {
    navigateTo: (screen: ScreenType, props?: ScreenProps) => void;
};

const ViewScreen: React.FC<ViewScreenProps> = ({ navigateTo }) => {
    const { showNotification } = useNotification();
    const [inputValue, setInputValue] = useState<string>('');

    const handleClick = (e: PointerEvent) => {
        e.preventDefault();
        const decryptedValue = decrypt(inputValue);

        if (decryptedValue.includes('>')) {
            showNotification({
                title: 'Некорректный код подборки',
                message:
                    'Скорее всего, вы добавили сюда не тот код: это код результатов, а нужен код подборки, ' +
                    'созданной для выбора дальнейшего фильма',
                type: 'error',
            });
            setInputValue('');
            return;
        }

        const filmIds = decryptedValue.split(',').map((item) => Number(item));

        if (filmIds.length < 3) {
            showNotification({
                title: 'Некорректный код подборки',
                message: 'Подборка не может содержать меньше 3 фильмов',
                type: 'error',
            });
            setInputValue('');
            return;
        }

        navigateTo('film', { film: { filmIds: filmIds } });
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const curInputValue = e.target.value;
        setInputValue(curInputValue);
    };

    return (
        <div className={styles.container}>
            <div className={styles.subContainer}>
                <ScreenTitle marginBottom={4}>Поиск идеального фильма</ScreenTitle>
                <form className={styles.form}>
                    <input
                        type="text"
                        name="text"
                        value={inputValue}
                        placeholder="Код подборки (пример: 'U2Fsd...lS9K6')"
                        className={styles.input}
                        onChange={handleInputChange}
                    />
                    <Button onClick={handleClick} size="s" disabled={!inputValue}>
                        Готово!
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ViewScreen;
