import React from 'react';

export const DonutChart = ({ value, total, color, label, subLabel, jpLabel }) => {
    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const percentage = Math.min(100, Math.max(0, (value / total) * 100));
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className="relative w-32 h-32">
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="64"
                        cy="64"
                        r={radius}
                        stroke="#f3f4f6"
                        strokeWidth="8"
                        fill="transparent"
                    />
                    <circle
                        cx="64"
                        cy="64"
                        r={radius}
                        stroke={color}
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                    />
                </svg>
                <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-gray-700">
                    <span className="text-xl font-bold">{label}</span>
                    <span className="text-xs text-gray-500 font-bold mt-1 tracking-tighter">{jpLabel}</span>
                </div>
            </div>
            <span className="text-sm font-bold text-gray-700 mt-[-8px]">{subLabel}</span>
        </div>
    );
};
