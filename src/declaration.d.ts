declare module '*.module.css';

declare module '*.svg' {
    const value: any;
    export default value;
}

declare module 'react-dom/client' {
    import { Root } from 'react-dom';

    export function createRoot(container: HTMLElement): Root;

    export { hydrate } from 'react-dom';
}
