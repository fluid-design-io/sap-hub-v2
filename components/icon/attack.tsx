import * as React from 'react';
import { SVGProps } from 'react';

const AttackIcon = ({
    children,
    ...props
}: SVGProps<SVGSVGElement> & { children: React.ReactNode }) => (
    <div className="relative flex size-11 items-center justify-center">
        <span className="text-stroke absolute z-[2] ml-0.5 mt-[1px] font-lapsus text-4xl font-bold text-white">
            {children}
        </span>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 26 26"
            fill="none"
            width={'100%'}
            height={'100%'}
            {...props}
        >
            <path
                fill="#696969"
                stroke="#000"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M8.91 23.884h12.181C22.061 22.006 24 17.012 24 12.067c0-6.181-3.636-6.181-4-6.363-1.09-2.545-3.636-2.545-4-2.363-2.544-2.364-5.453-.546-5.999-.728-3.927-.581-4.545 3.879-4.363 6.182-.424-.122-1.563-.073-2.727 1.09-1.163 1.164-.97 3.515-.727 4.545l6.727 7.818v1.636Z"
            />
        </svg>
    </div>
);
export default AttackIcon;
