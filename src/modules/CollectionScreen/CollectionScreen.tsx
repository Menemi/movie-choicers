import styles from './CollectionScreen.module.css';

import React, { useRef, useState } from 'react';
import ScreenTitle from '../../components/ScreenTitle/ScreenTitle';
import Button from '../../components/Button/Button';
import CollectionItem from './CollectionItem/CollectionItem';
import { copyToClipboard, encrypt, fetchMovie } from 'helpers';
import { GetMovieShortResponse, ScreenType } from '../../types';
import { ScreenProps } from '../../App';
import { useNotification } from '../Notification/NotificationProvider';

type CollectionScreenProps = {
    navigateTo: (screen: ScreenType, props?: ScreenProps) => void;
};

const CollectionScreen: React.FC<CollectionScreenProps> = ({ navigateTo }) => {
    const { showNotification } = useNotification();
    const [movieCollection, setMovieCollection] = useState<GetMovieShortResponse[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const idCollection = movieCollection.map((movie) => movie.id);

    const validateInputUrl = (
        url: string,
    ): {
        valid: boolean;
        error?: string;
        filmId?: string;
    } => {
        try {
            if (url.length === 0) {
                return { valid: false, error: 'Поле ввода не может быть пустым' };
            }
            new URL(url);

            const pattern = /^https:\/\/www\.kinopoisk\.ru\/\w+\/(\d+)\/?$/;
            const match = url.match(pattern);

            if (!match) {
                return {
                    valid: false,
                    error: "URL не соответствует паттерну 'https://www.kinopoisk.ru/{film/series/etc}/{id}'",
                };
            }

            const filmId = match[1];

            if (idCollection.includes(Number(filmId))) {
                return { valid: false, error: 'Этот фильм есть в подборке' };
            }

            return { valid: true, filmId };
        } catch (e) {
            return { valid: false, error: 'Некорректный URL фильма' };
        }
    };

    const handleAddItem = async (e: PointerEvent) => {
        e.preventDefault();
        const input = inputRef.current;

        if (!input) {
            showNotification({
                message: 'Некорректный URL фильма',
                type: 'error',
            });
            return;
        }

        const primaryValidatedValue = input.value.split('?')[0];
        const validateResult = validateInputUrl(primaryValidatedValue);

        if (validateResult.valid && validateResult.filmId) {
            const { filmId } = validateResult;
            const movie = await fetchMovie(Number(filmId));
            setMovieCollection((prev) => [...prev, movie]);
            input.value = '';
        } else {
            showNotification({
                message: validateResult.error || 'Некорректный URL фильма',
                type: 'error',
            });
        }
    };

    const handleRemoveItem = (filmId: number) => {
        setMovieCollection((prev) => prev.filter((movie) => movie.id !== filmId));
    };

    const handleFinish = (e: PointerEvent) => {
        e.preventDefault();
        const collectionStr = idCollection.join(',');
        const encrypted = encrypt(collectionStr);

        copyToClipboard(encrypted, () => {
            showNotification({
                title: 'Код вашей подборки скопирован в буфер обмена',
                message: encrypted,
                type: 'success',
            });
            navigateTo('main');
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.subContainer}>
                <ScreenTitle marginBottom={4}>Создание подборки</ScreenTitle>
                <form className={styles.form}>
                    <input
                        type="url"
                        name="url"
                        placeholder="https://www.kinopoisk.ru/..."
                        pattern="https://www.kinopoisk.ru/.*"
                        className={styles.input}
                        ref={inputRef}
                    />
                    <Button onClick={handleAddItem} theme="outline" size="s">
                        Добавить
                    </Button>
                    {movieCollection.length >= 3 ? (
                        <Button onClick={handleFinish} size="s">
                            Завершить
                        </Button>
                    ) : null}
                </form>
                {Boolean(movieCollection.length > 0 && movieCollection.length < 3) && (
                    <p className={styles.disclaimer}>Для создания подборки нужно добавить в неё минимум 3 элемента</p>
                )}
                {Boolean(movieCollection.length) && (
                    <div className={styles.collectionContainer}>
                        {movieCollection.map((movie) => (
                            <CollectionItem
                                key={movie.id}
                                movieInfo={{
                                    id: movie.id,
                                    name: movie.name,
                                    year: movie.year,
                                }}
                                onRemove={handleRemoveItem}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CollectionScreen;
