import React from 'react';

import { Heading, Text } from '@ui/typography';

type PageHeaderProps = {
    title: string;
    subtitle?: string;
};

export const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
    const calculatePosition = (index: number, total: number) => {
        const totalDegrees = 35; // Total angle for the arc
        // Angle for each character to create the arc effect
        const anglePerChar = index - (total - 1) / 2;
        const rotation = (totalDegrees / (total - 1)) * anglePerChar; // Calculate vertical offset
        // Characters closer to the center have a higher offset
        const offsetFactor = 0.2; // Adjust this value to control the height of the arc
        const middleIndex = (total - 1) / 2;
        const distanceFromMiddle = Math.abs(index - middleIndex);
        const verticalOffset =
            (1 - distanceFromMiddle / middleIndex) * offsetFactor;

        return { rotation, verticalOffset };
    };

    // Split the title into characters and transform each one
    const titleArr = title.split('');
    let titleChars = null;

    if (titleArr.length > 3 && titleArr.length < 12) {
        titleChars = titleArr.map((char, index) => {
            const { rotation, verticalOffset } = calculatePosition(
                index,
                title.length,
            );
            return (
                <span
                    key={index}
                    style={{
                        display: 'inline-block',
                        transform: `rotate(${rotation}deg) translateY(-${verticalOffset}em)`,
                        transformOrigin: 'bottom center',
                    }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </span>
            );
        });
    } else {
        titleChars = title;
    }
    return (
        <div className="mt-[env(safe-area-inset-top)] pb-12 text-center sm:pt-8">
            <Heading className="header text-secondary">
                <div className="inline-block text-balance">{titleChars}</div>
            </Heading>
            {subtitle ? (
                <Text className="subtitle !text-2xl">{subtitle}</Text>
            ) : null}
        </div>
    );
};
