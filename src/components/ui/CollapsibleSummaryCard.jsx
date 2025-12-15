import React, { useState } from 'react';
import { FileText, ChevronDown, ChevronUp } from 'lucide-react';

export const CollapsibleSummaryCard = ({ summary }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <div
            className={`group relative mb-8 rounded-xl border-l-4 border-l-indigo-600 bg-white shadow-sm border-y border-r border-gray-100 transition-all duration-300 hover:shadow-md cursor-pointer overflow-hidden`}
            onClick={() => setIsExpanded(!isExpanded)}
        >
            {/* Header Area */}
            <div className="flex justify-between items-start p-6 pb-2">
                <h3 className="text-sm font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-5 h-5 text-indigo-600" />
                    Executive Summary (要約)
                </h3>
                <div className="flex items-center gap-2 text-indigo-400 group-hover:text-indigo-600 transition-colors">
                    <span className="text-xs font-medium">
                        {isExpanded ? '閉じる' : '詳細を見る'}
                    </span>
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
            </div>

            {/* Content Area */}
            <div className="px-6 relative">
                <div
                    className={`text-gray-700 leading-relaxed text-lg transition-all duration-500 ease-in-out ${isExpanded ?
                        'max-h-[1000px] opacity-100 pb-6' : 'max-h-[3.6rem] opacity-70 overflow-hidden pb-0'
                        }`}
                >
                    {summary}
                </div>

                {/* Fade overlay when collapsed */}
                {!isExpanded && (
                    <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
                )}
            </div>
        </div>
    );
};
