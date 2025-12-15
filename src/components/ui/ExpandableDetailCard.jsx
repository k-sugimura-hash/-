import React, { useState } from 'react';
import { ChevronDown, Info } from 'lucide-react';

export const ExpandableDetailCard = ({ title, icon: Icon, children, colorClass = "text-gray-800", bgColorClass = "bg-white", borderColorClass = "border-gray-100" }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div
            className={`relative rounded-xl border ${borderColorClass} ${bgColorClass} shadow-sm transition-all duration-300 cursor-pointer overflow-hidden ${isOpen ? 'ring-2 ring-indigo-100 scale-[1.01] z-10 shadow-md' : 'hover:shadow-md'
                }`}
            onClick={() => setIsOpen(!isOpen)}
        >
            <div className="p-4 flex justify-between items-center">
                <h4 className={`flex items-center gap-2 font-bold text-sm ${colorClass}`}>
                    {Icon && <Icon className="w-4 h-4" />}
                    {title}
                </h4>
                <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
            </div>

            <div className={`px-4 text-xs text-gray-600 transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100 pb-4' : 'max-h-12 opacity-80 overflow-hidden pb-0'}`}>
                <div className={!isOpen ? "line-clamp-1" : ""}>
                    {children}
                </div>
                {!isOpen && (
                    <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
                )}
            </div>
            {!isOpen && (
                <div className="absolute bottom-1 right-4 text-[10px] text-indigo-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    <Info className="w-3 h-3" /> 詳細を見る
                </div>
            )}
        </div>
    );
};
