import React from 'react';

type TextCircleProps = {
    circle?: {
        color?: string;
        borderColor?: string;
        borderWidth?: number;
    };
    mainText?: {
        text: string;
        size?: number;
        color?: string;
        bold?: boolean;
    };
    midText?: {
        text: string;
        size?: number;
        color?: string;
        bold?: boolean;
    };
};

const TextCircle: React.FC<TextCircleProps> = ({
    circle = { color: 'lightgray' },
    mainText = { text: '', size: 20, color: 'black', bold: false },
    midText = { text: '', size: 24, color: 'black', bold: true },
}) => {
    const CIRCLE_SIZE = 200;

    return (
        <svg width={CIRCLE_SIZE} height={CIRCLE_SIZE} viewBox={`0 0 ${CIRCLE_SIZE} ${CIRCLE_SIZE}`}>
            <defs>
                <path
                    id="innerCirclePath"
                    d="M 100, 100
                    m -85, 0
                    a 85,85 0 1,1 170,0
                    a 85,85 0 1,1 -170,0"
                />
            </defs>
            <circle
                cx={CIRCLE_SIZE / 2}
                cy={CIRCLE_SIZE / 2}
                r={CIRCLE_SIZE / 2.5}
                fill={circle.color}
                stroke={circle.borderColor}
                strokeWidth={circle.borderWidth}
            />
            <text fontSize={mainText.size} fontWeight={mainText.bold ? 'bold' : 'normal'} fill={mainText.color}>
                <textPath href="#innerCirclePath" startOffset="25%" textAnchor="middle" spacing="auto">
                    {mainText.text}
                </textPath>
            </text>
            <text
                x={CIRCLE_SIZE / 2}
                y={CIRCLE_SIZE / 2 + (midText.size || 24) / 4}
                fontSize={midText.size}
                fontWeight={midText.bold ? 'bold' : 'normal'}
                textAnchor="middle"
                fill={midText.color}
            >
                {midText.text}
            </text>
        </svg>
    );
};

export default TextCircle;
