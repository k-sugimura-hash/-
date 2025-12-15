import React from 'react';

export const SectionHeader = ({ icon: Icon, title, colorClass = "text-blue-600" }) => (
    <div className="flex items-center gap-2 mb-4 border-b pb-2">
        <Icon className={`w-6 h-6 ${colorClass}`} />
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
    </div>
);

export const Card = ({ children, className = "" }) => (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 ${className}`}>
        {children}
    </div>
);

export const ListSection = ({ title, items, type = "neutral" }) => {
    if (!items || items.length === 0) return null;
    let bulletColor = "bg-gray-400";
    if (type === "positive") bulletColor = "bg-green-500";
    if (type === "negative") bulletColor = "bg-red-500";
    return (
        <div className="mb-4">
            <h3 className="font-semibold text-gray-700 mb-2">{title}</h3>
            <ul className="space-y-2">
                {items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${bulletColor}`} />
                        <span>{item}</span>
                    </li>
                ))}

            </ul>
        </div>
    );
};
