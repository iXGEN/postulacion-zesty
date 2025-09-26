import React from 'react';
import { IconName } from './icons';

interface IconProps {
    name: IconName;
    className?: string;
    size?: number;
}

export default function Icon({ name, className = '', size = 24 }: IconProps) {
    return (
        <img
            src={`/icons/${name}.svg`}
            alt={name}
            className={className}
            width={size}
            height={size}
            style={{ display: 'inline-block' }}
        />
    );
}
