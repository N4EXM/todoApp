import React from 'react';

const CircularProgressBar = ({ progress = 0, size = 100, strokeWidth = 10 }) => {
    
    // SVG centers the stroke width on the radius, subtract out so circle fits in square
    const radius = (size - strokeWidth) / 2;

    // Arc length at 100% coverage is the circle circumference
    const circumference = radius * 2 * Math.PI;
    // Arc length at the current progress
    const strokeDashoffset = circumference - progress / 100 * circumference;

    return (
        <>
            <div style={{ width: size, height: size, position: 'relative' }} className='dark:hidden text-slate-900 font-semibold'>
                <svg width={size} height={size}>
                    {/* Background circle */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke="#cbd5e1"
                        strokeWidth={strokeWidth}
                    />
                    {/* Progress circle */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="#cbd5e1"
                        stroke="#34d399"
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap=""
                        transform={`rotate(-90 ${size / 2} ${size / 2})`}
                    />
                </svg>
                {/* Optional percentage text */}
                <div 
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        fontSize: size * 0.25,
                    }}
                >
                    {progress
                    ? `${progress}%`
                    : "0%"
                    }
                </div>
            </div>
            <div style={{ width: size, height: size, position: 'relative' }} className='hidden dark:block'>
                <svg width={size} height={size}>
                    {/* Background circle */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke="#111827"
                        strokeWidth={strokeWidth}
                    />
                    {/* Progress circle */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="#111827"
                        stroke="#34d399"
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap=""
                        transform={`rotate(-90 ${size / 2} ${size / 2})`}
                    />
                </svg>
                {/* Optional percentage text */}
                <div 
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        fontSize: size * 0.25,
                    }}
                    className='text-slate-200 font-semibold'
                >
                    {progress
                    ? `${progress}%`
                    : "0%"
                    }
                </div>
            </div>
        </>
    );
};

export default CircularProgressBar;