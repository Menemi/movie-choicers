import styles from './App.module.css';

import React, { useState } from 'react';
import MainScreen from './modules/MainScreen/MainScreen';
import { GetMovieShortResponse, ScreenType } from './types';
import CollectionScreen from './modules/CollectionScreen/CollectionScreen';
import ScreenContainer from './modules/ScreenContainer/ScreenContainer';
import ViewScreen from './modules/ViewScreen/ViewScreen';
import FilmScreen from './modules/FilmScreen/FilmScreen';
import Results from './modules/ResultsScreen/Results';

export type ScreenProps = {
    film?: {
        filmIds: number[];
    };
    results?: {
        code: string;
        collectionFilms: GetMovieShortResponse[];
    };
};

const defaultScreenProps: ScreenProps = {
    film: {
        filmIds: [],
    },
    results: {
        code: '',
        collectionFilms: [],
    },
};

const App = () => {
    const [screen, setScreen] = useState<ScreenType>('main');
    const [screenProps, setScreenProps] = useState<ScreenProps>(defaultScreenProps);

    const handleChangeScreen = (screen: ScreenType, props?: ScreenProps) => {
        setScreen(screen);

        if (props) {
            setScreenProps(props);
        }
    };

    return (
        <div className={styles.container}>
            <ScreenContainer navigateTo={handleChangeScreen}>
                {screen === 'main' && <MainScreen navigateTo={handleChangeScreen} />}
                {screen === 'create' && <CollectionScreen navigateTo={handleChangeScreen} />}
                {screen === 'view' && <ViewScreen navigateTo={handleChangeScreen} />}
                {screen === 'film' && (
                    <FilmScreen filmIds={screenProps.film?.filmIds || []} navigateTo={handleChangeScreen} />
                )}
                {screen === 'results' && (
                    <Results
                        code={screenProps.results?.code || ''}
                        collectionFilms={screenProps.results?.collectionFilms || []}
                    />
                )}
            </ScreenContainer>
        </div>
    );
};

export default App;
