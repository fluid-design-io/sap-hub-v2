import * as React from 'react';
import { SVGProps } from 'react';

const HealthIcon = ({
    children,
    ...props
}: SVGProps<SVGSVGElement> & { children: React.ReactNode }) => (
    <div className="relative flex size-11 items-center justify-center">
        <span className="text-stroke absolute z-[2] font-lapsus text-4xl font-bold text-white">
            {children}
        </span>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 25 24"
            fill="none"
            width={'100%'}
            height={'100%'}
            {...props}
        >
            <path
                fill="#FE0000"
                stroke="#000"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M11.682 21.744c-1.884-1.112-4.362-2.759-6.438-4.788-2.094-2.048-3.64-4.352-3.928-6.768C.504 3.365 7.188 0 11.275 2.996a1.25 1.25 0 0 0 1.478 0c4.087-2.996 10.771.37 9.959 7.192-.288 2.416-1.834 4.72-3.928 6.768-2.075 2.03-4.554 3.676-6.438 4.788a.649.649 0 0 1-.664 0Z"
            />
        </svg>
    </div>
);
export default HealthIcon;
