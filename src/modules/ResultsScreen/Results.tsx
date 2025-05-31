import styles from './Results.module.css';

import React, { useState } from 'react';
import { accurateRound, copyToClipboard, decrypt, pasteFromClipboard } from '../../helpers';
import { GetMovieShortResponse, LikesMap } from '../../types';
import Button from '../../components/Button/Button';
import cn from 'classnames';
import { useNotification } from '../Notification/NotificationProvider';
import { validatePartnerResultsCode } from './helpers';

type ResultsProps = {
    code: string;
    collectionFilms: GetMovieShortResponse[];
};

const Results: React.FC<ResultsProps> = ({ code, collectionFilms }) => {
    const { showNotification } = useNotification();
    const [secondUserCode, setSecondUserCode] = useState<string>();
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

    const getUserLikesCollectionByUserCode = (userCode?: string): LikesMap => {
        if (!userCode) {
            return {};
        }

        const decryptedValue = decrypt(userCode);
        const validatedResult = validatePartnerResultsCode(decryptedValue);

        if (validatedResult) {
            showNotification(validatedResult);
            return {};
        }

        const subResults = decryptedValue.split(',');
        const results: LikesMap = {};

        subResults.forEach((item) => {
            const { 0: id, 1: isLike } = item.split('>');
            results[id] = isLike === '1' ? 1 : 0;
        });

        return results;
    };

    const sortedMoviesCollection = collectionFilms.sort((first, second) => second.rating - first.rating);
    const firstUserLikes = getUserLikesCollectionByUserCode(code);
    const secondUserLikes = getUserLikesCollectionByUserCode(secondUserCode);

    function getTopMovies({
        sortedMoviesCollection,
        firstUserLikes,
        secondUserLikes,
        topN = 3,
    }: {
        sortedMoviesCollection: GetMovieShortResponse[];
        firstUserLikes: LikesMap;
        secondUserLikes: LikesMap;
        topN?: number;
    }): GetMovieShortResponse[] {
        const bothLiked: GetMovieShortResponse[] = [];
        const oneLiked: GetMovieShortResponse[] = [];
        const noLikes: GetMovieShortResponse[] = [];

        for (const movie of sortedMoviesCollection) {
            const like1 = firstUserLikes[movie.id] ?? 0;
            const like2 = secondUserLikes[movie.id] ?? 0;

            if (like1 === 1 && like2 === 1) {
                bothLiked.push(movie);
            } else if (like1 === 1 || like2 === 1) {
                oneLiked.push(movie);
            } else {
                noLikes.push(movie);
            }
        }

        return [...bothLiked, ...oneLiked, ...noLikes].slice(0, topN);
    }

    const handleAddSecondUserResultsClick = () => {
        pasteFromClipboard((res) => setSecondUserCode(res));
    };

    const handleUserCollectionCodeClick = () => {
        copyToClipboard(code, () =>
            showNotification({
                title: 'Код ваших результатов скопирован в буфер обмена',
                message: code,
                type: 'success',
            }),
        );
    };

    const getUserContentByCode = (collectionCode: string) => (
        <ol>
            {getTopMovies({
                sortedMoviesCollection,
                firstUserLikes: getUserLikesCollectionByUserCode(collectionCode),
                secondUserLikes: getUserLikesCollectionByUserCode(collectionCode),
            }).map((film, index) => (
                <li key={film.id} className={styles.listItem}>
                    {index + 1}. {film.name} – {film.year}
                </li>
            ))}
        </ol>
    );

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    const getPedestalItem = (movie: GetMovieShortResponse, place: 1 | 2 | 3) => {
        return (
            <div className={styles.pedestalItem}>
                <a
                    href={`https://www.kinopoisk.ru/film/${movie.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.pedestalImageLink}
                >
                    <img
                        src={movie.poster}
                        alt="poster"
                        className={cn(
                            styles.pedestalImg,
                            place === 1 ? styles.first : place === 2 ? styles.second : styles.third,
                        )}
                    />
                </a>
                <div className={styles.pedestalMovieInfoContainer}>
                    <div className={styles.movieInfoContainer}>
                        <p className={styles.movieInfo}>
                            {movie.name} – {movie.year}
                        </p>
                        <p>{accurateRound(movie.rating || 0, 1)} / 10</p>
                    </div>
                    <p
                        className={cn(
                            styles.pedestalMoviePlace,
                            place === 1 ? styles.first : place === 2 ? styles.second : styles.third,
                        )}
                    >
                        {place}
                    </p>
                </div>
            </div>
        );
    };

    const getPedestalMovies = () => {
        if (!secondUserCode) {
            return <>ОКАК...</>;
        }

        const top3Movies = getTopMovies({ sortedMoviesCollection, firstUserLikes, secondUserLikes });

        return top3Movies.length === 3 ? (
            [getPedestalItem(top3Movies[1], 2), getPedestalItem(top3Movies[0], 1), getPedestalItem(top3Movies[2], 3)]
        ) : (
            <>ОКАК...</>
        );
    };

    const popup = (
        <div className={styles.popupContainer} onClick={handleClosePopup}>
            <div
                className={styles.popupMainBlock}
                onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
            >
                <div className={styles.popupCloseButton} onClick={handleClosePopup}>
                    <i className="bx bx-x bx-sm" />
                </div>
                <div className={styles.pedestalContainer}>{getPedestalMovies()}</div>
            </div>
        </div>
    );

    return (
        <>
            {isPopupOpen && popup}
            <div className={cn(styles.container, isPopupOpen && styles.blurred)}>
                <div className={styles.userCollection}>{getUserContentByCode(code)}</div>
                <div className={styles.userCollection}>
                    {!secondUserCode ? (
                        <div>
                            <Button onClick={handleAddSecondUserResultsClick} size="m">
                                Вставить результаты партнера
                            </Button>
                        </div>
                    ) : (
                        getUserContentByCode(secondUserCode)
                    )}
                </div>
                <div className={styles.bottomFixedBlock}>
                    {!secondUserCode ? (
                        <>
                            <div onClick={handleUserCollectionCodeClick} className={styles.userCollectionCodeContainer}>
                                <p className={styles.userCollectionCode}>{code}</p>
                                <i className="bx bx-copy bx-sm" />
                            </div>
                            <p className={styles.description}>Скопировать свой код результатов</p>
                        </>
                    ) : (
                        <Button onClick={() => setIsPopupOpen(true)}>Открыть результаты</Button>
                    )}
                </div>
            </div>
        </>
    );
};

export default Results;
