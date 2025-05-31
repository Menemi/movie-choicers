import styles from './Button.module.css';

import React from 'react';
import cn from 'classnames';

type Theme = 'primary' | 'outline';

type Size = 'xs' | 's' | 'm' | 'l';

type ButtonProps = {
    theme?: Theme;
    size?: Size;
    wide?: true;
    disabled?: boolean;
    onClick?: (params: any) => any;
    children: any;
};

const Button: React.FC<ButtonProps> = ({
    theme = 'primary',
    size = 'm',
    wide = false,
    disabled = false,
    onClick,
    children,
}) => {
    const THEME_MAP: Record<Extract<Theme, string>, any> = {
        primary: styles.primary,
        outline: styles.outline,
    };

    const SIZE_MAP: Record<Extract<Size, string>, any> = {
        xs: styles.xs,
        s: styles.s,
        m: styles.m,
        l: styles.l,
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={cn(
                styles.button,
                THEME_MAP[theme],
                SIZE_MAP[size],
                wide && styles.wide,
                disabled && styles.disabled,
            )}
        >
            {children}
        </button>
    );
};

export default Button;
