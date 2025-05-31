import styles from './FilmScreen.module.css';

import React, { useEffect, useRef, useState } from 'react';
import Film from './Film/Film';
import cn from 'classnames';
import { encrypt, fetchMovie } from '../../helpers';
import { useQuery } from '@tanstack/react-query';
import { GetMovieShortResponse, ScreenType } from '../../types';
import { ScreenProps } from '../../App';

type FilmScreenProps = {
    filmIds: number[];
    navigateTo: (screen: ScreenType, props?: ScreenProps) => void;
};

const FilmScreen: React.FC<FilmScreenProps> = ({ filmIds, navigateTo }) => {
    const [curFilmIndex, setCurFilmIndex] = useState<number>(0);
    const rating = useRef(new Map<number, boolean>());
    const collection = useRef<GetMovieShortResponse[]>([]);

    const handleRateButtonClick = (isLike: boolean) => {
        const ratingToStr = () => {
            const result: string[] = [];
            rating.current.forEach((isLike, filmId) => result.push(`${filmId}>${Number(isLike)}`));
            return result.join(',');
        };

        rating.current.set(filmIds[curFilmIndex], isLike);
        if (curFilmIndex + 1 >= filmIds.length) {
            navigateTo('results', { results: { code: encrypt(ratingToStr()), collectionFilms: collection.current } });
        }

        setCurFilmIndex((q) => q + 1);
    };

    const {
        data: movieInfo,
        isLoading,
        isRefetching,
        error,
        refetch,
    } = useQuery({
        queryKey: ['fetchMovie'],
        queryFn: async () => {
            const movie = await fetchMovie(filmIds[curFilmIndex]);
            collection.current.push(movie);
            return movie;
        },
        refetchOnMount: false,
    });

    useEffect(() => {
        if (curFilmIndex) {
            refetch();
        }
    }, [curFilmIndex]);

    return (
        <div className={styles.container}>
            <Film movieInfo={movieInfo} isLoading={isLoading || isRefetching} error={error} />
            <div className={styles.buttonsContainer}>
                <i
                    className={cn(styles.rateBtn, styles.like, 'bx bxs-like bx-lg')}
                    onClick={() => handleRateButtonClick(true)}
                />
                <i
                    className={cn(styles.rateBtn, styles.dislike, 'bx bxs-dislike bx-lg')}
                    onClick={() => handleRateButtonClick(false)}
                />
            </div>
        </div>
    );
};

export default FilmScreen;
