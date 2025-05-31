import styles from './Film.module.css';

import React, { useState } from 'react';
import { GetMovieShortResponse } from '../../../types';
import { accurateRound } from '../../../helpers';
import cn from 'classnames';
import SkeletonBlock from '../../../components/SkeletonBlock/SkeletonBlock';

type FilmProps = {
    movieInfo?: GetMovieShortResponse;
    isLoading: boolean;
    error: Error | null;
};

const Film: React.FC<FilmProps> = ({ movieInfo, isLoading, error }) => {
    const [isPosterLoading, setIsPosterLoading] = useState<boolean>(false);
    const [isPosterError, setIsPosterError] = useState<boolean>(false);

    const renderSkeleton = <SkeletonBlock width="50%" height="50%" />;

    const renderError = <>error</>;

    const renderContent = (
        <div className={styles.subContainer}>
            {isPosterError ? (
                <div className={styles.posterError}>
                    <i className="bx bx-x bx-lg" />
                    <p className={styles.posterErrorText}>Не удалось загрузить постер</p>
                </div>
            ) : isPosterLoading ? (
                <SkeletonBlock width="20%" height="100%" borderRadius={16} />
            ) : undefined}
            <img
                src={movieInfo?.poster}
                alt={'poster'}
                className={cn(styles.posterContainer, (isPosterLoading || isPosterError) && styles.none)}
                onLoad={() => setIsPosterLoading(true)}
                onError={() => setIsPosterError(true)}
            />
            {!movieInfo ? null : (
                <div className={styles.movieInfoContainer}>
                    <h2 className={styles.title}>
                        {movieInfo.name} [{movieInfo.year}]
                    </h2>
                    <ul className={styles.list}>
                        <li className={cn(styles.listItem, styles.rating)}>
                            <i className="bx bxs-star bx-sm" style={{ color: 'rgb(255, 221, 45)' }} />{' '}
                            <b className={styles.highlight}>{accurateRound(movieInfo.rating, 1)} / 10</b>
                        </li>
                        <li className={styles.listItem}>
                            <b className={styles.highlight}>Жанры</b>: {movieInfo.genres.join(', ')}
                        </li>
                        <li className={styles.listItem}>
                            <b className={styles.highlight}>Актёры</b>: {movieInfo.persons.join(', ')}
                        </li>
                        <li className={styles.listItem}>
                            <b className={styles.highlight}>Описание</b>:
                            <br />
                            {movieInfo.description}
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );

    return isLoading ? renderSkeleton : error ? renderError : renderContent;
};

export default Film;
