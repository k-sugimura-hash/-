import React from 'react';

const TamSamSomChart = ({ tam, sam, som }) => {
    // データがない場合のフォールバック
    const tamVal = tam || "---";
    const samVal = sam || "---";
    const somVal = som || "---";

    return (
        <div className="w-full bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
            <h3 className="text-2xl font-bold text-gray-800 text-center mb-10 font-sans tracking-tight">
                TAM - SAM - SOM Analysis
                <span className="block text-sm font-normal text-gray-400 mt-2 tracking-widest">Market Evaluation</span>
            </h3>

            <div className="relative w-full max-w-5xl flex flex-col md:flex-row items-stretch justify-center gap-8 md:gap-16">

                {/* Funnel Visual Area */}
                <div className="flex flex-col items-center w-full md:w-1/2 relative py-4">

                    {/* TAM Layer */}
                    <div className="relative w-full h-24 mb-1 z-30 flex flex-col items-center justify-center filter drop-shadow-md group">
                        <div className="absolute inset-0 bg-[#1e2a4a] clip-path-tam transition-transform group-hover:scale-[1.02] origin-top"></div>
                        <span className="relative z-10 text-white font-black text-2xl tracking-widest drop-shadow-lg">TAM</span>
                        <span className="relative z-10 text-blue-200 text-sm font-bold mt-1 tracking-tight">{tamVal}</span>

                        {/* Connecting Line */}
                        <div className="hidden md:block absolute right-[10%] top-1/2 w-[55%] h-[1px] border-t-2 border-dashed border-gray-300 opacity-50 z-0" style={{ transform: 'translateX(100%)' }}></div>
                    </div>

                    {/* SAM Layer */}
                    <div className="relative w-[80%] h-24 mb-1 z-20 flex flex-col items-center justify-center filter drop-shadow-md group">
                        <div className="absolute inset-0 bg-[#0ea5e9] clip-path-sam transition-transform group-hover:scale-[1.02] origin-top"></div>
                        <span className="relative z-10 text-white font-black text-2xl tracking-widest drop-shadow-lg">SAM</span>
                        <span className="relative z-10 text-sky-100 text-sm font-bold mt-1 tracking-tight">{samVal}</span>

                        {/* Connecting Line */}
                        <div className="hidden md:block absolute right-[10%] top-1/2 w-[70%] h-[1px] border-t-2 border-dashed border-gray-300 opacity-50 z-0" style={{ transform: 'translateX(100%)' }}></div>
                    </div>

                    {/* SOM Layer */}
                    <div className="relative w-[60%] h-24 z-10 flex flex-col items-center justify-center filter drop-shadow-md group">
                        <div className="absolute inset-0 bg-[#10b981] clip-path-som transition-transform group-hover:scale-[1.02] origin-top"></div>
                        <span className="relative z-10 text-white font-black text-2xl tracking-widest drop-shadow-lg">SOM</span>
                        <span className="relative z-10 text-emerald-100 text-sm font-bold mt-1 tracking-tight">{somVal}</span>

                        {/* Connecting Line */}
                        <div className="hidden md:block absolute right-[10%] top-1/2 w-[90%] h-[1px] border-t-2 border-dashed border-gray-300 opacity-50 z-0" style={{ transform: 'translateX(100%)' }}></div>
                    </div>
                </div>

                {/* Legend / Details Text Area (Right Side) */}
                <div className="flex flex-col justify-between w-full md:w-1/2 py-2 pl-4 border-gray-100 space-y-4 md:space-y-0">

                    {/* TAM Detail */}
                    <div className="flex flex-col justify-center p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                        <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-3xl font-extrabold text-[#1e2a4a]">{tamVal}</span>
                        </div>
                        <div className="text-[#1e2a4a] text-sm font-bold flex items-center gap-2">
                            Total Addressable Market <span className="text-[10px] bg-[#1e2a4a] text-white px-1.5 py-0.5 rounded">TAM</span>
                        </div>
                        <div className="text-xs text-gray-800 mt-2 leading-relaxed">
                            <span className="font-bold text-slate-700">最大の市場規模：</span>
                            貴社の製品・サービスが展開可能な最大の全体市場規模。将来的な成長のポテンシャルを示します。
                        </div>
                    </div>

                    {/* SAM Detail */}
                    <div className="flex flex-col justify-center p-3 rounded-lg hover:bg-sky-50 transition-colors border border-transparent hover:border-sky-100">
                        <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-3xl font-extrabold text-[#0ea5e9]">{samVal}</span>
                        </div>
                        <div className="text-[#0284c7] text-sm font-bold flex items-center gap-2">
                            Serviceable Available Market <span className="text-[10px] bg-[#0ea5e9] text-white px-1.5 py-0.5 rounded">SAM</span>
                        </div>
                        <div className="text-xs text-gray-800 mt-2 leading-relaxed">
                            <span className="font-bold text-sky-700">有効市場：</span>
                            ターゲットとする特定の顧客セグメントや地域における市場規模。ビジネスの主戦場となる範囲です。
                        </div>
                    </div>

                    {/* SOM Detail */}
                    <div className="flex flex-col justify-center p-3 rounded-lg hover:bg-emerald-50 transition-colors border border-transparent hover:border-emerald-100">
                        <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-3xl font-extrabold text-[#10b981]">{somVal}</span>
                        </div>
                        <div className="text-[#059669] text-sm font-bold flex items-center gap-2">
                            Serviceable Obtainable Market <span className="text-[10px] bg-[#10b981] text-white px-1.5 py-0.5 rounded">SOM</span>
                        </div>
                        <div className="text-xs text-gray-800 mt-2 leading-relaxed">
                            <span className="font-bold text-emerald-700">獲得目標市場：</span>
                            現在のリソースや競争環境に基づき、短中期的に実際に獲得可能なシェアの目標値です。
                        </div>
                    </div>

                </div>
            </div>

            <style>{`
                .clip-path-tam {
                    clip-path: polygon(0 0, 100% 0, 85% 100%, 15% 100%);
                }
                .clip-path-sam {
                    clip-path: polygon(0 0, 100% 0, 80% 100%, 20% 100%);
                }
                .clip-path-som {
                    clip-path: polygon(0 0, 100% 0, 75% 100%, 25% 100%);
                }
            `}</style>
        </div>
    );
};

export default TamSamSomChart;
