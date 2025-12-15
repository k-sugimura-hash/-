import React from 'react';
import { MoveRight } from 'lucide-react';

export const ValuationBridgeChart = ({ current, projected, label }) => {
    // 単位: 千円 -> M (百万) 換算
    const currentM = current / 1000;
    const projectedM = projected / 1000;
    const diffM = projectedM - currentM;

    // Y軸のスケール計算
    // 現在価値のバーが変動しない(縮まない)ように、予めある程度の成長(例えば1.4倍)を見越したスケールを設定する
    const minScale = currentM * 2.5;
    const maxVal = Math.max(minScale, projectedM * 1.1); // 成長が1.4倍を超えたらスケール自動拡張
    const ticks = [0, maxVal * 0.25, maxVal * 0.5, maxVal * 0.75, maxVal].map(v => Math.round(v));

    // 高さ計算ヘルパー
    const getHeightPct = (val) => (val / maxVal) * 100;

    return (
        <div className="w-full pt-8 pb-4 px-4 bg-gray-900/50 rounded-xl mt-4">
            <div className="flex h-64 w-full">
                {/* Y-Axis Column */}
                <div className="flex flex-col justify-between h-full pr-3 border-r border-gray-600/50 text-right w-16 text-xs text-gray-400 font-mono">
                    <div className="relative h-full w-full">
                        {ticks.map((tick, i) => (
                            <div key={i} className="absolute right-0 flex items-center justify-end w-max" style={{ bottom: `${(tick / maxVal) * 100}%`, transform: 'translateY(50%)' }}>
                                <span>{tick.toLocaleString()}M</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chart Area */}
                <div className="flex-1 relative h-full ml-4">
                    {/* Horizontal Grid Lines */}
                    {ticks.map((tick, i) => (
                        <div key={i} className="absolute w-full border-t border-gray-700/30" style={{ bottom: `${(tick / maxVal) * 100}%` }}></div>
                    ))}

                    <div className="absolute inset-0 flex items-end justify-around">
                        {/* Current Bar */}
                        <div className="flex flex-col items-center w-1/4 group relative h-full justify-end">
                            <div className="w-full bg-slate-600 rounded-t-md transition-all hover:opacity-90 border border-slate-500 relative group-hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                                style={{ height: `${getHeightPct(currentM)}%` }}>
                                {/* Label above the bar, aligned left to avoid overlap */}
                                <div className="absolute -top-10 -left-2 min-w-max">
                                    <span className="inline-block bg-slate-800 text-white text-xs font-bold px-2 py-1 rounded border border-slate-600 shadow-md">
                                        {Math.round(currentM).toLocaleString()}M
                                    </span>
                                </div>
                            </div>
                            {/* Label below the chart */}
                            <div className="absolute -bottom-8 left-0 right-0">
                                <span className="text-xs text-gray-400 font-bold tracking-wider border-t border-gray-600 pt-1 w-full text-center block">現在</span>
                            </div>
                        </div>

                        {/* Bridge / Arrow Section */}
                        <div className="flex flex-col items-center justify-end w-1/4 h-full relative">
                            {/* Dashed connector from Current Top */}
                            <div className="absolute border-t-2 border-dashed border-gray-500/50 w-[150%] -left-[25%]"
                                style={{ bottom: `${getHeightPct(currentM)}%` }}></div>

                            {/* Arrow pointing up */}
                            <div className="h-full flex flex-col justify-end items-center absolute" style={{ height: `${getHeightPct(projectedM)}%` }}>
                                <div className="flex-1 border-l-2 border-emerald-500/30 border-dashed relative">
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-400 font-bold text-xs whitespace-nowrap bg-gray-900/90 px-2 py-0.5 rounded border border-emerald-500/30 z-20 shadow-lg backdrop-blur-sm">
                                        +{Math.round(diffM).toLocaleString()}M
                                    </div>
                                </div>
                            </div>
                            <MoveRight className="w-6 h-6 text-gray-400 absolute bottom-4" />
                            {/* Label below the chart */}
                            <div className="absolute -bottom-8 left-0 right-0">
                                <span className="text-xs text-emerald-400 font-bold block text-center">Grow</span>
                            </div>
                        </div>


                        {/* Projected Bar */}
                        <div className="flex flex-col items-center w-1/4 group relative h-full justify-end">
                            {/* Base part (Current level) - Optional visualization */}

                            {/* Full Height with Gradient */}
                            <div className="w-full bg-gradient-to-t from-indigo-800 to-indigo-500 rounded-t-md shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all hover:scale-[1.02] border border-indigo-400/50 relative overflow-hidden"
                                style={{ height: `${getHeightPct(projectedM)}%`, animation: 'growBar 1.5s ease-out' }}>

                                {/* Highlight the 'Added' portion visually if desired, or just simple gradient */}
                                <div className="absolute bottom-0 left-0 right-0 bg-white/5 h-[1px]" style={{ bottom: `${(currentM / projectedM) * 100}%` }}></div>
                                <div className="absolute bottom-0 left-0 right-0 top-auto border-t border-white/10 border-dashed" style={{ height: `${((projectedM - currentM) / projectedM) * 100}%` }}></div>

                                <div className="absolute -top-10 -right-2 w-max">
                                    <span className="inline-block text-sm font-extrabold text-white bg-indigo-600 px-3 py-1 rounded shadow-lg border border-indigo-400">
                                        {Math.round(projectedM).toLocaleString()}M
                                    </span>
                                </div>
                            </div>
                            {/* Label below the chart */}
                            <div className="absolute -bottom-8 left-0 right-0">
                                <span className="text-xs text-indigo-300 font-bold tracking-wider border-t border-gray-600 pt-1 w-full text-center block">成長後</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
