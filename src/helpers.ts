import { GetMovieShortResponse, MovieDtoV1_4 } from './types';
import CryptoJS from 'crypto-js';
import { movie0, movie1, movie2, movie3 } from './ignored/mocks';
import axios from 'axios';

const SECRET_KEY = process.env.REACT_APP_SECRET_KEY || '';
const API_KEY = process.env.REACT_APP_API_KEY || '';
export const BASE_URL = 'https://api.kinopoisk.dev/v1.4';

export const accurateRound = (value: number | string, precision: number | string = 0): number => {
    const valueStr =
        typeof value === 'number'
            ? value.toLocaleString('en-US', { useGrouping: false, maximumFractionDigits: 20 })
            : value;
    const roundedPayload = Math.round(Number(`${valueStr}e${precision}`));
    return Number(`${roundedPayload}e-${precision}`);
};

export const copyToClipboard = (text: string, cb?: () => void) => {
    navigator.clipboard.writeText(text).then(cb);
};

export const pasteFromClipboard = (cb: (res: string) => void) => {
    navigator.clipboard.readText().then(cb);
};

export const encrypt = (text: string) => CryptoJS.AES.encrypt(text, SECRET_KEY).toString();

export const decrypt = (cipherText: string) => CryptoJS.AES.decrypt(cipherText, SECRET_KEY).toString(CryptoJS.enc.Utf8);

export const movieResponseToShort = (res: MovieDtoV1_4): GetMovieShortResponse => ({
    description: res.description || '',
    genres: res.genres.slice(0, 3).map((genre) => genre.name),
    id: res.id || 0,
    name: res.name || '',
    persons: res.persons?.slice(0, 3)?.map((person) => person.name || 'no name') || [],
    poster: res.poster?.url || '',
    rating: res.rating?.kp || 0,
    year: res.year || 0,
});

export const getRandomMockMovie = (): MovieDtoV1_4 => {
    const movieNum = Math.floor(Math.random() * 4);
    return movieNum === 0 ? movie0 : movieNum === 1 ? movie1 : movieNum === 2 ? movie2 : movie3;
};

export const fetchMovie = async (id: number, isFakeReq = false) => {
    if (isFakeReq) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        return movieResponseToShort(getRandomMockMovie());
    }

    const { data } = await axios.get<MovieDtoV1_4>(`${BASE_URL}/movie/${id}`, {
        headers: {
            Accept: 'application/json',
            'X-API-KEY': API_KEY,
        },
    });

    return movieResponseToShort(data);
};
