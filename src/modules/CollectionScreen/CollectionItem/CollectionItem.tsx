import styles from './CollectionItem.module.css';

import React from 'react';

type CollectionItemProps = {
    movieInfo: {
        id: number;
        name?: string;
        year?: number;
    };
    onRemove: (id: number) => void;
};

const CollectionItem: React.FC<CollectionItemProps> = ({ movieInfo, onRemove }) => {
    const skeleton = <>skeleton</>;

    const content = (
        <div onClick={() => onRemove(movieInfo.id)} className={styles.item}>
            <i className="bx bx-x bx-sm" />
            <p className={styles.text}>
                {movieInfo?.name}, {movieInfo?.year}г.
            </p>
        </div>
    );

    return <div className={styles.container}>{!movieInfo.name || !movieInfo.year ? skeleton : content}</div>;
};

export default CollectionItem;
