import React, { useState, useEffect } from 'react';
import { Target, TrendingUp, CheckSquare, Zap, DollarSign, Activity, MoveRight, ArrowUpRight } from 'lucide-react';
import { ValuationBridgeChart } from '../charts/ValuationBridgeChart';
import { Card } from '../ui/BasicComponents';

export const GrowthPlanSection = ({ plan, loading, currentFinancials, currentYears }) => {
    const [selectedValuationPlans, setSelectedValuationPlans] = useState(new Set());
    const [selectedProfitPlans, setSelectedProfitPlans] = useState(new Set());

    useEffect(() => {
        setSelectedValuationPlans(new Set());
        setSelectedProfitPlans(new Set());
    }, [plan]);
    if (loading) {
        return (
            <Card className="mt-8 border-yellow-200 bg-yellow-50/20 animate-pulse">
                <div className="flex flex-col items-center justify-center py-8">
                    {/* RefreshCw is not imported, using simple text or replacing with another icon */}
                    <div className="w-8 h-8 text-yellow-600 border-b-2 border-yellow-600 rounded-full animate-spin mb-4" />
                    <p className="text-yellow-800 font-semibold">AIが成長プランを策定中...</p>
                </div>
            </Card>
        );
    }

    if (!plan) return null;

    const toggleValuationPlan = (idx) => {
        const newSet = new Set(selectedValuationPlans);
        if (newSet.has(idx)) newSet.delete(idx); else newSet.add(idx);
        setSelectedValuationPlans(newSet);
    };

    const toggleProfitPlan = (idx) => {
        const newSet = new Set(selectedProfitPlans);
        if (newSet.has(idx)) newSet.delete(idx); else newSet.add(idx);
        setSelectedProfitPlans(newSet);
    };

    const addedYears = Array.from(selectedValuationPlans).reduce((acc, idx) => acc + (plan.valuation_plan[idx].year_impact || 0), 0);
    const profitIncreasePercent = Array.from(selectedProfitPlans).reduce((acc, idx) => acc + (plan.profit_strategy[idx].profit_impact_percent || 0), 0);
    // Growth Plan uses simplified "Current Valuation" for baseline to show improvement delta clearly
    // Using the basic Net Assets + OpProfit * Years for the simulator baseline to keep it simple
    const currentOp = parseFloat(currentFinancials.operatingProfit) || 0;
    const netAssets = parseFloat(currentFinancials.netAssets) || 0;

    const newOp = currentOp * (1 + profitIncreasePercent / 100);
    const newYears = currentYears + addedYears;
    const newValuation = (newOp * newYears) + netAssets;
    const currentValuation = (currentOp * currentYears) + netAssets;

    return (
        <div className="mt-8 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg shadow-md transform rotate-3">
                    <Zap className="w-8 h-8 text-white" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Growth Simulator (成長シミュレーション)</h2>
                    <p className="text-sm text-gray-500">施策を選択して、未来の企業価値をシミュレーション</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Plans Selection */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-indigo-100 overflow-hidden">
                        <div className="bg-indigo-50 px-6 py-3 border-b border-indigo-100 flex items-center gap-2">
                            <Target className="w-5 h-5 text-indigo-600" />
                            <h3 className="font-bold text-indigo-900">1. 評価係数(マルチプル)の改善</h3>
                        </div>
                        <div className="p-4 space-y-3">
                            {plan.valuation_plan.map((item, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => toggleValuationPlan(idx)}
                                    className={`group p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${selectedValuationPlans.has(idx)
                                        ? 'bg-indigo-50 border-indigo-500 shadow-md'
                                        : 'bg-white border-gray-100 hover:border-indigo-200 shadow-sm'
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex-1">
                                            <h4 className="font-bold text-gray-800 text-lg group-hover:text-indigo-700 transition-colors">{item.title}</h4>
                                            <p className="text-xs font-bold text-indigo-600 mt-1 flex items-center gap-1">
                                                <Target className="w-3 h-3" /> 期待効果: {item.impact}
                                            </p>
                                        </div>
                                        <div className={`ml-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${selectedValuationPlans.has(idx) ?
                                            'bg-indigo-500 border-indigo-500' : 'border-gray-300'
                                            }`}>
                                            {selectedValuationPlans.has(idx) && <CheckSquare className="w-3.5 h-3.5 text-white" />}
                                        </div>
                                    </div>

                                    <div className="bg-white p-3 rounded-lg text-sm text-gray-700 border border-indigo-100 shadow-inner">
                                        <span className="font-bold text-indigo-500 block text-xs mb-1 flex items-center gap-1">
                                            <Zap className="w-3 h-3" /> 具体的なアクションプラン
                                        </span>
                                        {item.action}
                                    </div>

                                    <div className="mt-3 flex justify-end">
                                        <div className="inline-flex items-center gap-1 text-xs font-bold text-indigo-700 bg-indigo-100/50 px-2 py-1 rounded border border-indigo-200">
                                            <TrendingUp className="w-3 h-3" /> 係数インパクト: +{item.year_impact}x
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-emerald-100 overflow-hidden">
                        <div className="bg-emerald-50 px-6 py-3 border-b border-emerald-100 flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-emerald-600" />
                            <h3 className="font-bold text-emerald-900">2. 営業利益(ベース)の拡大</h3>
                        </div>
                        <div className="p-4 space-y-3">
                            {plan.profit_strategy.map((item, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => toggleProfitPlan(idx)}
                                    className={`group p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${selectedProfitPlans.has(idx)
                                        ? 'bg-emerald-50 border-emerald-500 shadow-md'
                                        : 'bg-white border-gray-100 hover:border-emerald-200 shadow-sm'
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex-1">
                                            <h4 className="font-bold text-gray-800 text-lg group-hover:text-emerald-700 transition-colors">{item.title}</h4>
                                            <p className="text-xs font-bold text-emerald-600 mt-1 flex items-center gap-1">
                                                <CheckSquare className="w-3 h-3" /> 選定理由: {item.rationale}
                                            </p>
                                        </div>
                                        <div className={`ml-4 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors shrink-0 ${selectedProfitPlans.has(idx) ?
                                            'bg-emerald-500 border-emerald-500' : 'border-gray-300'
                                            }`}>
                                            {selectedProfitPlans.has(idx) && <CheckSquare className="w-3.5 h-3.5 text-white" />}
                                        </div>
                                    </div>

                                    <div className="bg-white p-3 rounded-lg text-sm text-gray-700 border border-emerald-100 shadow-inner">
                                        <span className="font-bold text-emerald-500 block text-xs mb-1 flex items-center gap-1">
                                            <Activity className="w-3 h-3" /> 具体的な実行戦略
                                        </span>
                                        {item.strategy}
                                    </div>

                                    <div className="mt-3 flex justify-end">
                                        <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100/50 px-2 py-1 rounded border border-emerald-200">
                                            <TrendingUp className="w-3 h-3" /> 利益インパクト: +{item.profit_impact_percent}%
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Visual Result */}

                <div className="lg:col-span-1">
                    <div className="sticky top-24">
                        <div className="bg-gray-900 rounded-2xl shadow-xl text-white p-6 overflow-hidden relative">
                            <div className="relative z-10">
                                <h3 className="font-bold text-lg mb-6 flex items-center gap-2">

                                    <Activity className="w-5 h-5 text-emerald-400" />
                                    Valuation Impact (企業価値へのインパクト)
                                </h3>


                                {/* Updated: Waterfall Style Bridge Chart */}
                                <ValuationBridgeChart current={currentValuation} projected={newValuation} />

                                <div className="mt-6 space-y-3 pt-6 border-t border-gray-700">

                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-400">営業利益</span>
                                        <span className="font-mono text-emerald-400">
                                            {profitIncreasePercent > 0 && <span className="text-xs mr-2">↑{profitIncreasePercent}%</span>}
                                            {Math.round(newOp).toLocaleString()}k
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-400">評価係数</span>
                                        <span className="font-mono text-indigo-400">

                                            {addedYears > 0 && <span className="text-xs mr-2">↑{addedYears.toFixed(1)}x</span>}
                                            {newYears.toFixed(2)}x
                                        </span>
                                    </div>

                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-700">
                                    <p className="text-xs text-gray-500 uppercase font-bold mb-1">Projected Valuation (将来推計価値)</p>

                                    <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-400">
                                        {Math.round(newValuation).toLocaleString()}
                                        <span className="text-sm font-normal text-gray-400 ml-1">千円</span>
                                    </div>

                                    <p className="text-xs text-emerald-500 mt-2 flex items-center gap-1">
                                        <ArrowUpRight className="w-3 h-3" />
                                        Current比: +{Math.round(newValuation - currentValuation).toLocaleString()} 千円

                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
