import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Input = React.forwardRef(({
    className,
    label,
    error,
    ...props
}, ref) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                    {label}
                </label>
            )}
            <input
                ref={ref}
                className={twMerge(clsx(
                    'block w-full rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 placeholder-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 sm:text-sm transition-colors',
                    error && 'border-error focus:border-error focus:ring-error',
                    className
                ))}
                {...props}
            />
            {error && (
                <p className="mt-1 text-sm text-error">{error}</p>
            )}
        </div>
    );
});

Input.displayName = 'Input';
