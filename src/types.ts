export type ScreenType = 'main' | 'create' | 'view' | 'film' | 'results';

export type ShowNotificationProps = {
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    title?: string;
    hasAcceptBtn?: true;
    duration?: number;
};

export type PosterLoadingStatus = 'loading' | 'loaded' | 'error';

type ExternalId = {
    imdb?: string;
    tmdb?: number;
    kpHD?: string;
};

type Names = {
    name: string;
    language?: string;
    type?: string;
};

type MovieType = 'movie' | 'tv-series' | 'cartoon' | 'anime' | 'animated-series' | 'tv-show';
type MovieTypeNumber = 1 | 2 | 3 | 4 | 5 | 6;

type MovieStatus = 'filming' | 'pre-production' | 'completed' | 'announced' | 'post-production';

type Fact = {
    value: string;
    type?: string;
    spoiler?: boolean;
};

type Rating = {
    kp?: number;
    imdb?: number;
    tmdb?: number;
    filmCritics?: number;
    russianFilmCritics?: number;
    await?: number;
};

type Votes = {
    kp?: number;
    imdb?: number;
    tmdb?: number;
    filmCritics?: number;
    russianFilmCritics?: number;
    await?: number;
};

type Logo = {
    url?: string;
};

type Poster = Logo & {
    previewUrl?: string;
};

type Backdrop = Poster;

type Trailer = {
    url?: string;
    name?: string;
    site?: string;
    size?: number;
    type?: string;
};

type Videos = {
    trailers?: Trailer[];
};

type Genres = {
    name: string;
};

type Countries = Genres;

type Person = {
    id: number;
    photo?: string;
    name?: string;
    enName?: string;
    description?: string | null;
    profession?: string;
    enProfession?: string;
};

type ReviewInfo = {
    count?: number;
    positiveCount?: number;
    percentage?: string;
};

type SeasonInfo = {
    number?: number;
    episodesCount?: number;
};

type Budget = {
    value?: number;
    currency?: string;
};

type Fees = {
    world?: Budget;
    russia?: Budget;
    usa?: Budget;
};

type Premiere = {
    country?: string;
    world?: string;
    russia?: string;
    digital?: string | null;
    cinema?: string;
    bluray?: string;
    dvd?: string;
};

export type LinkedMovieV1_4 = {
    id: number;
    name?: string;
    enName?: string;
    alternativeName?: string;
    type?: string;
    poster?: Poster;
    rating?: Rating;
    year: number;
};

type WatchabilityItem = {
    name?: string;
    logo: Logo;
    url: string;
};

type Watchability = {
    items?: WatchabilityItem[];
};

type ReleaseYears = {
    start?: number;
    end?: number;
};

type Audience = {
    count?: number;
    country?: number;
};

type NetworkItem = {
    name?: string;
    logo?: Logo;
};

type Networks = {
    items?: NetworkItem[];
};

export type MovieDtoV1_4 = {
    id?: number;
    externalId?: ExternalId;
    name?: string;
    alternativeName?: string;
    enName?: string;
    names?: Names[];
    type?: MovieType;
    typeNumber?: MovieTypeNumber;
    year?: number;
    description?: string;
    shortDescription?: string;
    slogan?: string;
    status?: MovieStatus;
    facts?: Fact[];
    rating?: Rating;
    votes?: Votes;
    movieLength?: number;
    ratingMpaa?: string;
    ageRating?: number;
    logo?: Logo;
    poster?: Poster;
    backdrop?: Backdrop;
    videos?: Videos;
    genres: Genres[];
    countries: Countries[];
    persons?: Person[];
    reviewInfo?: ReviewInfo;
    seasonsInfo?: SeasonInfo[];
    budget?: Budget;
    fees?: Fees;
    premiere?: Premiere;
    similarMovies?: LinkedMovieV1_4[];
    sequelsAndPrequels?: LinkedMovieV1_4[];
    watchability?: Watchability;
    releaseYears?: ReleaseYears[];
    top10?: number;
    top250?: number;
    ticketsOnSale?: boolean;
    totalSeriesLength?: number;
    seriesLength?: number;
    isSeries?: boolean;
    audience?: Audience[];
    lists?: string[];
    networks?: Networks;
    updatedAt?: string;
    createdAt?: string;
};

/*
 * data.id: id
 * data.name: название
 * data.year: год
 * data.description: полное описание
 * data.rating.kp: рейтинг кинопоиска
 * data.genres: жанры [первые 3]
 * data.poster.url: ссылка на постер
 * data.persons: актеры [первые 3]
 *
 * */
export type GetMovieShortResponse = {
    id: number;
    name: string;
    year: number;
    description: string;
    rating: number;
    genres: string[];
    poster: string;
    persons: string[];
};

export type LikesMap = Record<string, 1 | 0>;
