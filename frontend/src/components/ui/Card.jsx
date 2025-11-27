import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Card = ({ className, children, ...props }) => {
    return (
        <div
            className={twMerge(clsx(
                'bg-white rounded-lg border border-neutral-200 shadow-sm overflow-hidden',
                className
            ))}
            {...props}
        >
            {children}
        </div>
    );
};

export const CardHeader = ({ className, children, ...props }) => {
    return (
        <div
            className={twMerge(clsx('px-6 py-4 border-b border-neutral-100', className))}
            {...props}
        >
            {children}
        </div>
    );
};

export const CardBody = ({ className, children, ...props }) => {
    return (
        <div className={twMerge(clsx('p-6', className))} {...props}>
            {children}
        </div>
    );
};

export const CardFooter = ({ className, children, ...props }) => {
    return (
        <div
            className={twMerge(clsx('px-6 py-4 bg-neutral-50 border-t border-neutral-100', className))}
            {...props}
        >
            {children}
        </div>
    );
};
