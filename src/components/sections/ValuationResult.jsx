import React from 'react';
import { Calculator } from 'lucide-react';
import { parseEmployees, estimateExecutiveComp } from '../../utils/calculations';
import { Card, SectionHeader } from '../ui/BasicComponents';

export const ValuationResult = ({ financialData, scoreData }) => {
    // 1. 入力データの取得 (単位: 千円)
    const netAssets = parseFloat(financialData.netAssets) || 0;
    const opProfit = parseFloat(financialData.operatingProfit) || 0;
    const executiveComp = parseFloat(financialData.executiveComp) || 0;
    const taxSavingInsurance = parseFloat(financialData.taxSavingInsurance) || 0;
    const insuranceReserve = parseFloat(financialData.insuranceReserve) || 0;
    const inventory = parseFloat(financialData.inventory) || 0;
    const sales = parseFloat(financialData.sales) || 0;
    const employeesNum = parseEmployees(financialData.employees);

    // フラグ情報の取得
    const hasBadInventory = financialData.badInventory;
    const hasUnpaidOvertime = financialData.unpaidOvertime;
    const hasPrivateExpenses = financialData.privateExpenses;
    // 2. 修正純資産の算出 (Adjusted Net Assets)

    // (A) 在庫調整: 不良在庫フラグがある場合、30%カット
    const inventoryAdjustment = hasBadInventory ? inventory * -0.3 : 0;

    // (B) 保険積立金調整: 解約返戻率85%と仮定 (簿価100% - 返戻85% = -15%調整)
    // 積立金がゼロの場合は調整なし
    const insuranceAdjustment = insuranceReserve > 0 ? insuranceReserve * -0.15 : 0;

    // (C) 未払残業代リスク: フラグがある場合
    // 仮定: 1人あたり月20時間残業 * 2年分 * 時給換算等をざっくり 600千円/人 とする (60万円)
    const laborLiabilityRisk = hasUnpaidOvertime ? employeesNum * 600 : 0;

    const totalAssetAdjustments = inventoryAdjustment + insuranceAdjustment - laborLiabilityRisk;
    const adjustedNetAssets = netAssets + totalAssetAdjustments;
    // 3. 正常収益力の算出 (Normalized Earnings)

    // (A) 役員報酬の適正化
    const estimatedComp = estimateExecutiveComp(sales);
    const excessExecComp = Math.max(0, executiveComp - estimatedComp); // 節税的な過剰報酬分

    // (B) 私的費用の足し戻し
    // 仮定: 販管費を売上の20%と仮定し、そのうち5%が私的費用とする (売上 * 0.2 * 0.05 = 売上 * 0.01)
    const privateExpenseAddBack = hasPrivateExpenses ? sales * 0.01 : 0;

    const normalizedEarnings = opProfit + excessExecComp + taxSavingInsurance + privateExpenseAddBack;
    // 4. 評価倍率 (Multiple)
    const totalScore = Object.values(scoreData).reduce((sum, val) => sum + val, 0);
    const score = totalScore / 10;
    const adjustment = score * 0.4;
    const evaluationYears = Math.max(0.5, 3.0 + adjustment);
    // 最低0.5年は確保

    // 5. 企業価値算定
    // ロジック: 修正純資産 + (正常収益力 ﾗ 評価倍率)
    const valuation = adjustedNetAssets + (normalizedEarnings * evaluationYears);
    const taxRate = 0.20315;
    const netProceeds = Math.max(0, valuation * (1 - taxRate));
    return (
        <Card className="mb-8 border-indigo-200 bg-gradient-to-br from-indigo-50 to-white">
            <SectionHeader icon={Calculator} title="企業価値・売却シミュレーション (修正純資産法＋年倍法)" colorClass="text-indigo-600" />

            <div className="grid grid-cols-1 gap-8">
                {/* Logic Visualization */}
                <div className="bg-white p-6 rounded-xl border border-indigo-100 shadow-sm">
                    <div className="flex flex-col md:flex-row items-stretch justify-between gap-4 text-center md:text-left">


                        {/* Block 1: Adjusted Net Assets */}
                        <div className="flex-1 w-full relative group flex flex-col">
                            <div className="text-xs font-bold text-gray-400 uppercase mb-1">修正純資産 (静的価値)</div>
                            <div className="text-2xl font-bold text-gray-800">{Math.round(adjustedNetAssets).toLocaleString()}<span className="text-sm font-normal text-gray-500">千円</span></div>
                            <div className="h-1 w-full bg-gray-200 mt-2 rounded-full overflow-hidden mb-3">

                                <div className="h-full bg-gray-500" style={{ width: '100%' }}></div>
                            </div>

                            {/* Details: Adjusted Net Assets */}
                            <div className="mt-3 text-xs text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100 table w-full">
                                <div className="table-row-group">
                                    <div className="table-row">
                                        <div className="table-cell py-1 text-left">純資産(簿価)</div>
                                        <div className="table-cell py-1 text-right font-medium">{Math.round(netAssets).toLocaleString()}</div>
                                    </div>
                                    {inventoryAdjustment !== 0 && (
                                        <div className="table-row text-red-500">
                                            <div className="table-cell py-1 text-left pl-2">↳ 在庫評価減</div>
                                            <div className="table-cell py-1 text-right">{Math.round(inventoryAdjustment).toLocaleString()}</div>
                                        </div>
                                    )}
                                    {insuranceAdjustment !== 0 && (
                                        <div className="table-row text-red-500">
                                            <div className="table-cell py-1 text-left pl-2">↳ 保険積立調整</div>
                                            <div className="table-cell py-1 text-right">{Math.round(insuranceAdjustment).toLocaleString()}</div>
                                        </div>
                                    )}
                                    {laborLiabilityRisk !== 0 && (
                                        <div className="table-row text-red-500">
                                            <div className="table-cell py-1 text-left pl-2">↳ 労務リスク</div>
                                            <div className="table-cell py-1 text-right">-{Math.round(laborLiabilityRisk).toLocaleString()}</div>
                                        </div>
                                    )}
                                    <div className="table-row border-t border-gray-300 font-bold text-gray-800">
                                        <div className="table-cell pt-2 text-left border-t border-gray-200">= 修正純資産</div>
                                        <div className="table-cell pt-2 text-right border-t border-gray-200">{Math.round(adjustedNetAssets).toLocaleString()}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center text-xl text-gray-300 font-bold px-2">+</div>

                        {/* Block 2: Earnings Value */}
                        <div className="flex-1 w-full flex flex-col">
                            <div className="text-xs font-bold text-emerald-600 uppercase mb-1">正常収益力 × 評価倍率 (のれん)</div>
                            <div className="text-2xl font-bold text-emerald-600">
                                {Math.round(normalizedEarnings * evaluationYears).toLocaleString()}<span className="text-sm font-normal text-emerald-400">千円</span>
                            </div>
                            <div className="h-1 w-full bg-emerald-100 mt-2 rounded-full overflow-hidden mb-3">
                                <div className="h-full bg-emerald-500" style={{ width: '100%' }}></div>
                            </div>

                            {/* Details: Earnings */}
                            <div className="mt-3 text-xs text-gray-600 bg-emerald-50 p-3 rounded-lg border border-emerald-100 table w-full">
                                <div className="table-row-group">
                                    <div className="table-row">
                                        <div className="table-cell py-1 text-left">営業利益</div>
                                        <div className="table-cell py-1 text-right font-medium">{Math.round(opProfit).toLocaleString()}</div>
                                    </div>
                                    {excessExecComp > 0 && (
                                        <div className="table-row text-emerald-600">
                                            <div className="table-cell py-1 text-left pl-2">↳ 役員報酬適正化</div>
                                            <div className="table-cell py-1 text-right">+{Math.round(excessExecComp).toLocaleString()}</div>
                                        </div>
                                    )}
                                    {privateExpenseAddBack > 0 && (
                                        <div className="table-row text-emerald-600">
                                            <div className="table-cell py-1 text-left pl-2">↳ 私的費用修正</div>
                                            <div className="table-cell py-1 text-right">+{Math.round(privateExpenseAddBack).toLocaleString()}</div>
                                        </div>
                                    )}
                                    {taxSavingInsurance > 0 && (
                                        <div className="table-row text-emerald-600">
                                            <div className="table-cell py-1 text-left pl-2">↳ 節税保険加算</div>
                                            <div className="table-cell py-1 text-right">+{Math.round(taxSavingInsurance).toLocaleString()}</div>
                                        </div>
                                    )}
                                    <div className="table-row font-bold text-emerald-900">
                                        <div className="table-cell py-1 text-left border-t border-emerald-200">= 正常収益力</div>
                                        <div className="table-cell py-1 text-right border-t border-emerald-200">{Math.round(normalizedEarnings).toLocaleString()}</div>
                                    </div>
                                    <div className="table-row">
                                        <div className="table-cell py-1 text-left text-gray-500">× 評価倍率(年)</div>
                                        <div className="table-cell py-1 text-right text-gray-500">{evaluationYears.toFixed(2)}倍</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center text-xl text-gray-300 font-bold px-2">=</div>

                        {/* Block 3: Total Valuation */}
                        <div className="flex-1 w-full bg-indigo-600 text-white p-4 rounded-xl shadow-lg transform transition-transform hover:scale-105 flex flex-col justify-center">
                            <div className="text-xs font-bold text-indigo-200 uppercase mb-1">推計企業価値</div>
                            <div className="text-3xl font-extrabold mb-4">
                                {Math.round(valuation).toLocaleString()}<span className="text-lg font-normal text-indigo-200 ml-1">千円</span>
                            </div>
                            <div className="pt-3 border-t border-indigo-500/50 text-xs text-indigo-100 flex justify-between">
                                <span>税引後手取額(概算):</span>
                                <span className="font-bold text-lg">{Math.round(netProceeds).toLocaleString()} k</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Card>
    );
};
