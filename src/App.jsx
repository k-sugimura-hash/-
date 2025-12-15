import React, { useState } from 'react';
import {
    Search,
    BarChart2,
    Globe,
    Shield,
    TrendingUp,
    Users,
    Layers,
    FileText,
    CheckCircle,
    CheckSquare,
    AlertTriangle,
    Download,
    Activity,
    Briefcase,
    Cpu,
    PieChart,
    ChevronRight,
    ChevronLeft,
    Lightbulb,
    Landmark,
    FileSpreadsheet,
    Sliders,
    Hexagon,
    DollarSign,
    ArrowRight,

    Star
} from 'lucide-react';

// --- カラーパレット定義 (New Design) ---
const COLORS = {
    white: '#FFFFFF',
    black: '#222222',
    primary: '#25C49F',    // メイン緑
    secondary: '#29C4A0',  // 少し濃い緑
    accent: '#FFD700',     // アクセント
    bg: '#F0F4F3',         // 背景用グレー
    grid: '#E0E0E0',       // グリッド線
};

// ヘルパー: カラーコードをRGBAに変換して透明度を調整する
const hexToRgba = (hex, alpha = 1) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// --- スタイル定義 ---
const GlobalStyles = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@500;700;900&display=swap');

    :root {
      --watercolor-shadow: 0 10px 25px -5px rgba(37, 196, 159, 0.15), 0 8px 10px -6px rgba(37, 196, 159, 0.1);
      --watercolor-shadow-hover: 0 20px 30px -5px rgba(37, 196, 159, 0.25), 0 10px 15px -5px rgba(37, 196, 159, 0.1);
      --paper-texture: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
    }

    body {
      font-family: "Zen Maru Gothic", sans-serif !important; 
      /* !important to override Tailwind default sans temporarily */
      background-color: ${COLORS.bg};
      color: #444; 
      background-image: var(--paper-texture);
      margin: 0;
      overflow-x: hidden;
    }

    /* ふわふわ浮遊アニメーション（ゆっくり） */
    @keyframes float-soft {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-10px) rotate(1deg); }
    }

    /* ポヨンとハネるアニメーション */
    @keyframes bounce-soft {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.03); }
    }

    .animate-float-soft {
      animation: float-soft 6s ease-in-out infinite;
    }

    /* 水彩風ボックス */
    .watercolor-box {
      background-color: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(4px);
      border-radius: 24px;
      border: 2px solid rgba(255, 255, 255, 0.6);
      box-shadow: var(--watercolor-shadow);
      transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    /* 水彩風ボタン（プライマリ） */
    .watercolor-btn {
      border: none;
      border-radius: 999px;
      box-shadow: 0 4px 15px ${hexToRgba(COLORS.primary, 0.3)};
      transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      position: relative;
      overflow: hidden;
      cursor: pointer;
    }
    
    .watercolor-btn:hover {
      transform: translateY(-4px) scale(1.02);
      box-shadow: 0 8px 25px ${hexToRgba(COLORS.primary, 0.4)};
    }
    
    .watercolor-btn:active {
      transform: translateY(2px) scale(0.95);
    }

    /* 水彩風ボタン（白） */
    .watercolor-btn-white {
      background-color: rgba(255, 255, 255, 0.9);
      color: ${COLORS.secondary};
      border: 2px solid ${hexToRgba(COLORS.secondary, 0.1)};
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
      cursor: pointer;
    }
    .watercolor-btn-white:hover {
      background-color: #fff;
      border-color: ${hexToRgba(COLORS.secondary, 0.3)};
      box-shadow: 0 8px 20px rgba(0,0,0,0.08);
    }

    /* 水彩のにじみ装飾 */
    .watercolor-blob {
      position: absolute;
      border-radius: 50%;
      filter: blur(30px);
      z-index: -1;
      opacity: 0.6;
      animation: bounce-soft 8s infinite ease-in-out;
    }
    
    .text-soft-shadow {
      text-shadow: 2px 2px 0px rgba(255, 255, 255, 0.8), 
                   0px 4px 12px rgba(37, 196, 159, 0.15);
    }
  `}</style>
);

// --- コンポーネント: 背景グリッドと装飾アイコン ---
const BackgroundDecoration = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="watercolor-blob bg-green-200 w-96 h-96 top-[-10%] left-[-10%] mix-blend-multiply"></div>
        <div className="watercolor-blob bg-yellow-100 w-80 h-80 top-[20%] right-[-5%] mix-blend-multiply" style={{ animationDelay: '1s' }}></div>
        <div className="watercolor-blob bg-blue-50 w-full h-64 bottom-0 left-0 mix-blend-multiply" style={{ borderRadius: '50% 50% 0 0', filter: 'blur(40px)' }}></div>

        <div
            className="absolute inset-0 opacity-30"
            style={{
                backgroundImage: `linear-gradient(${COLORS.grid} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.grid} 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
                maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
            }}
        ></div>

        <div className="absolute top-24 left-6 md:left-24 animate-float-soft" style={{ animationDelay: '0s' }}>
            <div className="watercolor-box p-3 flex items-center gap-2 transform -rotate-6">
                <div className="p-2 bg-green-50 rounded-full">
                    <BarChart2 size={24} color={COLORS.primary} strokeWidth={2.5} />
                </div>
            </div>
        </div>

        <div className="absolute top-1/3 right-6 md:right-32 animate-float-soft" style={{ animationDelay: '1.5s' }}>
            <div className="watercolor-box p-3 rounded-full transform rotate-6 border border-yellow-100 bg-yellow-50/50">
                <PieChart size={36} color="#d4b400" strokeWidth={2} />
            </div>
        </div>

        <div className="absolute bottom-24 left-10 md:left-40 animate-float-soft" style={{ animationDelay: '0.8s' }}>
            <div className="watercolor-box px-4 py-2 bg-white transform rotate-3 flex items-center gap-2 border border-green-100">
                <div className="bg-green-100 p-1.5 rounded-full">
                    <TrendingUp size={20} className="text-green-600" strokeWidth={2.5} />
                </div>
                <span className="font-bold text-sm text-green-700">Value Up!</span>
            </div>
        </div>
    </div>
);

// --- コンポーネント: ロゴマーク ---
const LogoMark = () => (
    <div className="relative w-32 h-32 md:w-40 md:h-40 mb-4 mx-auto hover:scale-105 transition-transform duration-500 ease-out group cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-tr from-green-100 to-yellow-50 rounded-full blur-xl opacity-70 animate-pulse"></div>

        <div className="absolute inset-2 bg-white/80 backdrop-blur-sm rounded-full border border-white shadow-lg flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-3/4 h-3/4 overflow-visible">
                <circle cx="25" cy="75" r="12" fill={COLORS.black} fillOpacity="0.8" />
                <circle cx="75" cy="25" r="16" fill={COLORS.primary} />
                <path
                    d="M25 75 C 25 45, 55 25, 75 25"
                    fill="none"
                    stroke={COLORS.black}
                    strokeOpacity="0.8"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray="0.1 8"
                />
                <path
                    d="M90 10 L94 2 L98 10 L106 14 L98 18 L94 26 L90 18 L82 14 Z"
                    fill={COLORS.accent}
                    className="origin-[94px_14px] group-hover:animate-[spin_3s_linear_infinite]"
                />
            </svg>
        </div>
    </div>
);

import { DonutChart } from './components/charts/DonutChart';
import { RadarChart } from './components/charts/RadarChart';
import { CollapsibleSummaryCard } from './components/ui/CollapsibleSummaryCard';
import { SectionHeader, Card } from './components/ui/BasicComponents';
import { GrowthPlanSection } from './components/sections/GrowthPlanSection';
import { ValuationResult } from './components/sections/ValuationResult';
import TamSamSomChart from './components/charts/TamSamSomChart';

import { DIAGNOSTIC_QUESTIONS, MOCK_DATA, MOCK_GROWTH_PLAN } from './constants/data';
import { SYSTEM_PROMPT, GROWTH_PLAN_SYSTEM_PROMPT } from './constants/prompts';

export default function App() {
    // --- State Management ---
    const [step, setStep] = useState('input_basic');
    // input_basic -> input_financial -> questionnaire -> loading -> result
    const [isFetchingFinancials, setIsFetchingFinancials] = useState(false);

    // Form Data
    const [formData, setFormData] = useState({
        url: '',

        // Financial Data (Thousand Yen)
        netAssets: '',          // 純資産合計
        inventory: '',          // 棚卸資産
        insuranceReserve: '',   // 保険積立金

        sales: '',              // 売上高
        operatingProfit: '',    // 営業利益
        executiveComp: '',      // 役員報酬総額
        taxSavingInsurance: '', // 節税保険料

        employees: '',          // 従業員数

        // Risk Flags (New)
        badInventory: false,    // 不良在庫・滞留在庫あり
        unpaidOvertime: false,  // 未払残業代リスクあり
        privateExpenses: false  // 私的費用の混入あり
    });
    // Questionnaire Answers
    const [answers, setAnswers] = useState({});

    // Analysis State
    const [progress, setProgress] = useState('');
    const [result, setResult] = useState(null);
    const [growthPlan, setGrowthPlan] = useState(null);
    const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');

    // --- Helpers ---
    const calculateCurrentValuationYears = () => {
        const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
        const score = totalScore / 10;
        const adjustment = score * 0.4;
        return 3.0 + adjustment;
    };
    const getCategoryScores = () => {
        // 4 categories: A, B, C, D

        const catA = ((answers['q1'] || 0) + (answers['q2'] || 0) + (answers['q3'] || 0));
        // Range -13 to 15
        const catB = ((answers['q4'] || 0) + (answers['q5'] || 0) + (answers['q6'] || 0));
        // Range -15 to 15
        const catC = ((answers['q7'] || 0) + (answers['q8'] || 0));
        // Range -10 to 10
        const catD = ((answers['q9'] || 0) + (answers['q10'] || 0));
        // Range -10 to 5

        return [
            { label: "将来性", value: Math.max(0, Math.min(100, (catA + 13) * 3.5)) },
            { label: "顧客の質", value: Math.max(0, Math.min(100, (catB + 15) * 3.3)) },
            { label: "組織", value: Math.max(0, Math.min(100, (catC + 10) * 5)) },
            { label: "管理", value: Math.max(0, Math.min(100, (catD + 10) * 6.6)) }
        ];
    };

    // Robust API Call Helper with Retry
    const callGeminiAPI = async (payload) => {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey) {
            alert("APIキーが設定されていません。.envファイルにVITE_GEMINI_API_KEYを設定してください。");
            throw new Error("API Key is missing");
        }

        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
        const delays = [1000, 2000, 4000, 8000, 16000];
        // Exponential backoff

        for (let i = 0; i <= delays.length; i++) {
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error(`API Error (${response.status}):`, errorText);
                    // If 4xx error (except 429), probably don't retry as it's a bad request
                    if (response.status >= 400 && response.status < 500 && response.status !== 429) {
                        throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
                    }
                    throw new Error(`API Error: ${response.status}`);
                }
                return await response.json();
            } catch (err) {
                if (i === delays.length) throw err;
                // Rethrow last error
                console.warn(`Attempt ${i + 1} failed, retrying in ${delays[i]}ms...`);
                await new Promise(resolve => setTimeout(resolve, delays[i]));
            }
        }
    };
    const handleDemo = () => {
        // 1. Set Financial Data
        setFormData({
            ...formData,
            url: MOCK_DATA.url || 'https://demo.example.com',
            netAssets: '50000',      // 5,000万円
            inventory: '10000',      // 1,000万円
            insuranceReserve: '5000',// 500万円
            sales: '300000',         // 3億円
            operatingProfit: '20000',// 2,000万円
            executiveComp: '10000',  // 1,000万円
            taxSavingInsurance: '5000', // 500万円
            employees: '25',
            badInventory: false,
            unpaidOvertime: false,
            privateExpenses: false
        });

        // 2. Set Questionnaire Answers (Moderately good company)
        setAnswers({
            q1: 5, q2: 5, q3: 1,  // Market: Strong
            q4: 5, q5: 0, q6: 5,  // Profit: Good
            q7: 0, q8: 5,         // Org: Average
            q9: 3, q10: 2         // Admin: Good
        });

        // 3. Set Analysis Result (Mock)
        setResult(MOCK_DATA);

        // 4. Set Growth Plan (Mock)
        setGrowthPlan(MOCK_GROWTH_PLAN);

        // 5. Jump to Result Step
        setIsFetchingFinancials(false); // Ensure loading is off
        setStep('result');
    };

    const handleBasicInputSubmit = async () => {
        if (!formData.url) return;
        setStep('input_financial');
        window.scrollTo(0, 0);
    };
    const handleFinancialInputSubmit = () => {
        // 必須項目のチェック (営業利益と純資産は計算に必須)
        if (!formData.operatingProfit || !formData.netAssets || !formData.employees) return;
        setStep('questionnaire');
        window.scrollTo(0, 0);
    };

    const handleAnswerChange = (questionId, score) => {
        setAnswers(prev => ({ ...prev, [questionId]: score }));
    };

    const handleQuestionnaireSubmit = () => {
        const allQuestions = DIAGNOSTIC_QUESTIONS.flatMap(cat => cat.items);
        if (Object.keys(answers).length < allQuestions.length) {
            alert("すべての質問に回答してください");
            return;
        }
        analyzeCompany();
    };
    const analyzeCompany = async (useDemo = false) => {
        setStep('loading');
        setError(null);
        setResult(null);
        setGrowthPlan(null);
        if (useDemo) {
            setProgress('デモデータを読み込み中...');
            await new Promise(resolve => setTimeout(resolve, 1500));
            // Set Demo Data in Thousand Yen (x1000 from original Million values)
            setFormData(prev => ({
                ...prev,
                url: "https://example.com",
                netAssets: "200000",        // 200M -> 200,000k
                inventory: "30000",         // 30M -> 30,000k
                insuranceReserve: "10000",  // 10M -> 10,000k
                sales: "800000",
                // 800M -> 800,000k
                operatingProfit: "50000",   // 50M -> 50,000k
                executiveComp: "40000",     // 40M -> 40,000k
                taxSavingInsurance: "5000", // 5M -> 5,000k
                employees: "21-50",
                badInventory: false,
                unpaidOvertime: false,
                privateExpenses: true
            }));
            // Mock answers
            const mockAnswers = {};
            DIAGNOSTIC_QUESTIONS.forEach(cat => cat.items.forEach(q => mockAnswers[q.id] = 0));
            setAnswers(mockAnswers);
            setResult(MOCK_DATA);
            setStep('result');
            return;
        }

        try {
            const steps = [
                "URLから事業内容を特定中...",
                "詳細財務データ(B/S, P/L)を分析中...",
                "競合環境と市場動向を分析中...",
                "財務健全性とリスク要因を評価中...",
                "包括的なレポートを生成中..."
            ];
            let stepIndex = 0;
            const progressInterval = setInterval(() => {
                if (stepIndex < steps.length) {
                    setProgress(steps[stepIndex]);
                    stepIndex++;
                }
            }, 2500);
            const userQuery = `Target Company URL/Name: ${formData.url}.
      Employees: ${formData.employees}.
      Sales: ${formData.sales}k (Thousands Yen), Operating Profit: ${formData.operatingProfit}k (Thousands Yen).
      Identify the specific business of this company from the search results.
      Determine the JSIC Major Industry Classification (A-T).
      Output the analysis in JSON format.`;

            const data = await callGeminiAPI({
                contents: [{ parts: [{ text: userQuery }] }],
                tools: [{ google_search: {} }],
                systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
                generationConfig: { maxOutputTokens: 8192 }
            });
            clearInterval(progressInterval);
            setProgress('分析完了。レポートを生成中...');

            let generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

            if (generatedText) {
                // Clean up potential markdown code blocks just in case
                const cleanedText = generatedText.replace(/```json/g, '').replace(/```/g, '').trim();
                try {
                    const parsedResult = JSON.parse(cleanedText);
                    setResult(parsedResult);
                    setStep('result');
                } catch (e) {
                    // Fallback to finding brace indices if simple clean fails (e.g. extra text)
                    const firstOpen = generatedText.indexOf('{');
                    const lastClose = generatedText.lastIndexOf('}');
                    if (firstOpen !== -1 && lastClose !== -1) {
                        const jsonString = generatedText.substring(firstOpen, lastClose + 1);
                        try {
                            const parsedResult = JSON.parse(jsonString);
                            setResult(parsedResult);
                            setStep('result');
                        } catch (e2) {
                            console.error("JSON Parse Error:", e2);
                            throw new Error("AIの応答形式が不正でした。");
                        }
                    } else {
                        throw new Error("AIからの応答に有効なデータが含まれていませんでした。");
                    }
                }
            } else {
                throw new Error('AIからの応答が空でした。');
            }

        } catch (err) {
            console.error(err);
            setError(err.message || '予期せぬエラーが発生しました。');
            setStep('input_basic');
        }
    };
    const generateGrowthPlan = async () => {
        setIsGeneratingPlan(true);
        if (result === MOCK_DATA) {
            await new Promise(resolve => setTimeout(resolve, 2000));
            setGrowthPlan(MOCK_GROWTH_PLAN);
            setIsGeneratingPlan(false);
            setTimeout(() => {
                document.getElementById('growth-plan-section')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
            return;
        }

        try {
            const weakPoints = Object.entries(answers)
                .filter(([_, score]) => score <= 0)
                .map(([id, score]) => {
                    const question = DIAGNOSTIC_QUESTIONS.flatMap(c => c.items).find(i => i.id === id);
                    return `${question?.question} (Score: ${score})`;
                })
                .join(", ");
            const userQuery = `
      Create a growth plan for this company.
      [Company Info]
      Name: ${result.companyName}
      Industry: ${result.industry?.name}
      URL: ${result.url}

      [Financial Info (Thousand Yen)]
      Sales: ${formData.sales}
      Operating Profit: ${formData.operatingProfit}
      Net Assets: ${formData.netAssets}
      Executive Comp: ${formData.executiveComp}
      Tax Saving Ins: ${formData.taxSavingInsurance}

      [Risk Factors]
      Bad Inventory: ${formData.badInventory}
      Unpaid Overtime: ${formData.unpaidOvertime}
      Private Expenses: ${formData.privateExpenses}

      [Analysis Context]
      SWOT Weaknesses: ${result.synthesis?.swot?.weaknesses?.join(", ")}
      SWOT Opportunities: ${result.synthesis?.swot?.opportunities?.join(", ")}

      [Diagnostic Weak Points (Questionnaire)]
      ${weakPoints ? weakPoints : "No major weak points found in questionnaire."}

      Based on the above, provide specific strategies to maximize valuation multiple (qualitative) and operating profit (quantitative).
      Output in JSON format.
      `;

            const data = await callGeminiAPI({
                contents: [{ parts: [{ text: userQuery }] }],
                systemInstruction: { parts: [{ text: GROWTH_PLAN_SYSTEM_PROMPT }] },
                generationConfig: { responseMimeType: "application/json", maxOutputTokens: 8192 }
            });
            let generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

            if (generatedText) {
                // Clean up potential markdown code blocks just in case
                const cleanedText = generatedText.replace(/```json/g, '').replace(/```/g, '').trim();
                try {
                    const jsonString = cleanedText;
                    setGrowthPlan(JSON.parse(jsonString));
                } catch (e) {
                    const firstOpen = generatedText.indexOf('{');
                    const lastClose = generatedText.lastIndexOf('}');
                    if (firstOpen !== -1 && lastClose !== -1) {
                        const jsonString = generatedText.substring(firstOpen, lastClose + 1);
                        setGrowthPlan(JSON.parse(jsonString));
                    }
                }
            }

        } catch (e) {
            console.error("Growth Plan Error", e);
            alert("プランの生成に失敗しました。もう一度お試しください。");
        } finally {
            setIsGeneratingPlan(false);
            setTimeout(() => {
                document.getElementById('growth-plan-section')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    };

    const copyToClipboard = () => {
        if (!result) return;
        const text = JSON.stringify(result, null, 2);
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('レポート（JSON）をクリップボードにコピーしました');
    };

    // --- Custom Styles for Animations ---
    const customStyles = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in-up {
      animation: fadeInUp 0.6s ease-out forwards;
    }
    @keyframes growBar {
      from { height: 0; }
      to { height: var(--target-height); }
    }
    `;
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="min-h-screen bg-[#F0F4F3] font-sans text-gray-900 pb-20 relative overflow-hidden">
            {/* Basic Style Overrides for this component */}
            <style>{`
                .bg-clip-text { -webkit-background-clip: text; background-clip: text; }
                @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
                @keyframes fade-in-down { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fade-in-down { animation: fade-in-down 0.8s ease-out forwards; }
            `}</style>

            {/* Header (Only show if NOT in input_basic, or different style) */}
            {step !== 'input_basic' && (
                <header className="bg-white/90 backdrop-blur-md border-b sticky top-0 z-50">
                    <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="bg-green-50 p-2 rounded-full">
                                <TrendingUp className="w-6 h-6 text-[#25C49F]" strokeWidth={2.5} />
                            </div>
                            <span className="text-xl font-bold text-gray-700 tracking-tight">
                                ミライ<span className="text-[#25C49F]">バトン</span>
                            </span>
                        </div>
                        <div className="text-xs font-medium text-gray-500 hidden sm:block tracking-wider uppercase">
                            Strategic Valuation Partner
                        </div>
                    </div>
                </header>
            )}

            <main className={step === 'input_basic' ? "w-full min-h-screen flex flex-col items-center justify-center relative z-10 p-4" : "container mx-auto px-4 py-8 relative"}>
                {/* Step 1: Basic Input (New Design) */}
                {step === 'input_basic' && (
                    <>
                        <GlobalStyles />
                        <BackgroundDecoration />

                        <div className="z-10 w-full max-w-4xl flex flex-col items-center">
                            <div className="watercolor-box w-full p-8 md:p-14 text-center relative mb-12">
                                {/* テープ装飾 */}
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                                    <div className="bg-yellow-300/90 backdrop-blur-sm text-yellow-900 px-6 py-1.5 rounded-sm shadow-md transform -rotate-1 origin-center hover:rotate-0 transition-transform duration-300">
                                        <span className="font-bold text-xs md:text-sm tracking-widest opacity-90">COMPANY VALUE SIMULATION</span>
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/30 border-r border-white/40"></div>
                                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/30 border-l border-white/40"></div>
                                    </div>
                                </div>

                                <LogoMark />

                                <div className="mb-8 relative inline-block">
                                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none text-soft-shadow">
                                        <span className="inline-block transform -rotate-2 mr-2 text-gray-700">ミライ</span>
                                        <span className="inline-block text-[#25C49F]">バトン</span>
                                    </h1>
                                    <div
                                        className="absolute bottom-2 left-0 w-full h-5 -z-10 rounded-full opacity-60 mix-blend-multiply transform rotate-1"
                                        style={{ backgroundColor: COLORS.accent }}
                                    ></div>
                                </div>

                                <p className="text-lg md:text-xl font-bold text-gray-600 mb-12 tracking-wide leading-relaxed max-w-2xl mx-auto">
                                    会社の<span className="inline-block px-2 py-0.5 mx-1 rounded-md bg-green-100 text-green-700 transform -rotate-1 hover:rotate-0 transition-transform">価値</span>を見える化し、<br className="hidden md:block" />
                                    次のステージへの<span className="inline-block px-2 py-0.5 mx-1 rounded-md bg-yellow-100 text-yellow-700 transform rotate-1 hover:rotate-0 transition-transform">物語</span>をつくるシミュレーション。
                                </p>

                                <div className="max-w-xl mx-auto bg-white/50 p-6 rounded-3xl border border-white/60 shadow-inner">
                                    <div className="relative">
                                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="例: 株式会社〇〇  または  https://example.com"
                                            className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-transparent bg-white shadow-sm focus:border-[#25C49F] focus:ring-4 focus:ring-[#25C49F]/20 transition-all outline-none font-bold text-gray-700 placeholder-gray-400"
                                            value={formData.url}
                                            onChange={(e) => setFormData({ ...formData, url: e.target.value })}

                                        />
                                    </div>

                                    <button
                                        className="watercolor-btn group w-full mt-4 px-10 py-4 bg-[#25C49F] text-white font-bold text-xl rounded-full"
                                        onMouseEnter={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)}
                                        onClick={handleBasicInputSubmit}
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-3">
                                            シミュレーション開始
                                            <div className={`bg-white/20 p-1.5 rounded-full transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}>
                                                <ArrowRight size={20} strokeWidth={3} />
                                            </div>
                                        </span>
                                    </button>
                                    {/*
                                    <div className="mt-6 text-center">
                                        <button
                                            onClick={handleDemo}
                                            className="text-sm font-bold text-gray-400 hover:text-[#25C49F] transition-colors flex items-center justify-center gap-2 mx-auto"
                                        >
                                            <span className="border-b border-dotted border-current">API設定なしでデモデータを試す</span>
                                            <ChevronRight size={14} />
                                        </button>
                                    </div>
                            */}
                                </div>
                            </div>

                            <div className="mt-8 text-xs font-bold text-gray-400 opacity-60 flex items-center gap-1 z-10">
                                <Star size={10} fill={COLORS.accent} stroke="none" /> MIRAI BATON PROJECT
                            </div>
                        </div>
                    </>
                )}

                {/* Step 2: Financial Input (Detailed) */}
                {
                    step === 'input_financial' && (
                        <section className="animate-fade-in-up">
                            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto border border-indigo-50">
                                <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">STEP 2: 財務データ入力</h2>
                                <p className="text-gray-500 mb-8 text-center">
                                    より正確な分析と価値算定のために、決算書等の数値（単位: 千円）を入力してください。<br />
                                    <span className="text-xs text-indigo-600">※単位は「千円」です（例: 1億円 → 100,000）。</span>
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">

                                    {/* --- Balance Sheet Section --- */}
                                    <div className="space-y-4">
                                        <h3 className="flex items-center gap-2 font-bold text-lg text-indigo-700 border-b border-indigo-100 pb-2 mb-4">
                                            <Landmark className="w-5 h-5" /> 資産・負債 (B/S)
                                        </h3>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 mb-1">純資産合計 <span className="text-red-500">*</span></label>
                                            <input type="number" value={formData.netAssets} onChange={(e) => setFormData({ ...formData, netAssets: e.target.value })} className="w-full px-3 py-2 rounded border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 outline-none" placeholder="例: 200000" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 mb-1">棚卸資産</label>
                                            <input type="number" value={formData.inventory} onChange={(e) => setFormData({ ...formData, inventory: e.target.value })} className="w-full px-3 py-2 rounded border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 outline-none" placeholder="例: 30000" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 mb-1">保険積立金</label>
                                            <input type="number" value={formData.insuranceReserve} onChange={(e) => setFormData({ ...formData, insuranceReserve: e.target.value })} className="w-full px-3 py-2 rounded border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-200 outline-none" placeholder="例: 10000" />
                                        </div>
                                    </div>

                                    {/* --- Profit & Loss Section --- */}
                                    <div className="space-y-4">
                                        <h3 className="flex items-center gap-2 font-bold text-lg text-emerald-700 border-b border-emerald-100 pb-2 mb-4">
                                            <FileSpreadsheet className="w-5 h-5" /> 損益・その他 (P/L)
                                        </h3>

                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 mb-1">売上高</label>
                                            <input type="number" value={formData.sales} onChange={(e) => setFormData({ ...formData, sales: e.target.value })} className="w-full px-3 py-2 rounded border border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 outline-none" placeholder="例: 800000" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 mb-1">営業利益 <span className="text-red-500">*</span></label>
                                            <input type="number" value={formData.operatingProfit} onChange={(e) => setFormData({ ...formData, operatingProfit: e.target.value })} className="w-full px-3 py-2 rounded border border-emerald-500 focus:ring-1 focus:ring-emerald-200 outline-none" placeholder="例: 50000" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 mb-1">役員報酬総額</label>
                                            <input type="number" value={formData.executiveComp} onChange={(e) => setFormData({ ...formData, executiveComp: e.target.value })} className="w-full px-3 py-2 rounded border border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 outline-none" placeholder="例: 40000" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 mb-1">節税保険料（年間支払額）</label>
                                            <input type="number" value={formData.taxSavingInsurance} onChange={(e) => setFormData({ ...formData, taxSavingInsurance: e.target.value })} className="w-full px-3 py-2 rounded border border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 outline-none" placeholder="例: 5000" />
                                        </div>

                                        <div className="pt-2">

                                            <label className="block text-xs font-bold text-gray-500 mb-1">
                                                従業員数 <span className="text-red-500">*</span>
                                            </label>
                                            <div className="relative">
                                                <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
                                                />
                                                <input
                                                    type="text"
                                                    list="employee-ranges"
                                                    value={formData.employees}
                                                    onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
                                                    className="w-full pl-9 pr-3 py-2 rounded border border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-200 outline-none bg-white text-sm"
                                                    placeholder="人数を入力 または 範囲を選択"
                                                />
                                                <datalist id="employee-ranges">
                                                    <option value="1-5名" />
                                                    <option value="6-20名" />
                                                    <option value="21-50名" />
                                                    <option value="51-100名" />
                                                    <option value="101-300名" />
                                                    <option value="301名以上" />
                                                </datalist>
                                            </div>
                                            <p className="text-[10px] text-gray-400 mt-1 ml-1">※ 直接入力も可能です</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-8 border-t pt-6">
                                    <h3 className="flex items-center gap-2 font-bold text-lg text-orange-700 border-b border-orange-100 pb-2 mb-4">
                                        <Sliders className="w-5 h-5" /> リスク・調整フラグ
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <label className={`flex flex-col p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.badInventory ?
                                            'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-bold text-gray-700 text-sm">滞留・不良在庫あり</span>
                                                <div className={`w-5 h-5 rounded border flex items-center justify-center ${formData.badInventory ?
                                                    'bg-orange-500 border-orange-500' : 'bg-white border-gray-300'}`}>
                                                    {formData.badInventory && <CheckSquare className="w-3 h-3 text-white" />}
                                                </div>
                                            </div>
                                            <input
                                                type="checkbox"
                                                className="sr-only"
                                                checked={formData.badInventory}
                                                onChange={(e) => setFormData(prev => ({ ...prev, badInventory: e.target.checked }))}
                                            />
                                            <span className="text-xs text-gray-500">在庫の評価減(30%程度)を適用します</span>
                                        </label>

                                        <label className={`flex flex-col p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.unpaidOvertime ?
                                            'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-bold text-gray-700 text-sm">未払残業代のリスク</span>
                                                <div className={`w-5 h-5 rounded border flex items-center justify-center ${formData.unpaidOvertime ?
                                                    'bg-orange-500 border-orange-500' : 'bg-white border-gray-300'}`}>
                                                    {formData.unpaidOvertime && <CheckSquare className="w-3 h-3 text-white" />}
                                                </div>
                                            </div>
                                            <input
                                                type="checkbox"
                                                className="sr-only"
                                                checked={formData.unpaidOvertime}
                                                onChange={(e) => setFormData(prev => ({ ...prev, unpaidOvertime: e.target.checked }))}
                                            />
                                            <span className="text-xs text-gray-500">潜在的な労務債務リスクを計上します</span>
                                        </label>

                                        <label className={`flex flex-col p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.privateExpenses ?
                                            'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-gray-300'}`}>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-bold text-gray-700 text-sm">私的費用の混入</span>
                                                <div className={`w-5 h-5 rounded border flex items-center justify-center ${formData.privateExpenses ?
                                                    'bg-emerald-500 border-emerald-500' : 'bg-white border-gray-300'}`}>
                                                    {formData.privateExpenses && <CheckSquare className="w-3 h-3 text-white" />}
                                                </div>
                                            </div>
                                            <input
                                                type="checkbox"
                                                className="sr-only"
                                                checked={formData.privateExpenses}
                                                onChange={(e) => setFormData(prev => ({ ...prev, privateExpenses: e.target.checked }))}
                                            />
                                            <span className="text-xs text-gray-500">個人的な経費を利益に足し戻します</span>
                                        </label>
                                    </div>
                                </div>

                                {error && (
                                    <div className="p-3 mb-6 bg-red-50 text-red-600 rounded-lg text-sm flex items-center justify-center gap-2">
                                        <AlertTriangle className="w-4 h-4" />
                                        {error}
                                    </div>
                                )}

                                <div className="flex justify-between items-center">
                                    <button
                                        onClick={() => setStep('input_basic')}
                                        className="text-gray-500 hover:text-gray-700 flex items-center gap-1 font-medium"
                                    >
                                        <ChevronLeft className="w-5 h-5" /> 戻る
                                    </button>
                                    <button
                                        onClick={handleFinancialInputSubmit}
                                        disabled={!formData.operatingProfit ||
                                            !formData.netAssets || !formData.employees}
                                        className="px-12 py-4 rounded-xl font-bold text-white shadow-lg bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        次へ（診断アンケート）
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </section>
                    )
                }

                {/* Step 3: Questionnaire Section (Previously Step 2) */}
                {
                    step === 'questionnaire' && (
                        <section className="animate-fade-in-up">
                            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto border border-indigo-50">
                                <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">STEP 3: 事業評価年数 診断アンケート</h2>
                                <p className="text-gray-500 mb-8 text-center">
                                    経営の「強さ」や「安定性」を診断します。最も近いものを選んでください。<br />
                                    （この回答結果に基づき、企業価値の評価年数を算出します）
                                </p>

                                <div className="space-y-8">
                                    {DIAGNOSTIC_QUESTIONS.map((category, catIdx) => (
                                        <div key={catIdx} className="border-t pt-6 first:border-t-0 first:pt-0">
                                            <h3 className="text-lg font-bold text-indigo-800 mb-4 bg-indigo-50 p-2 rounded">{category.category}</h3>
                                            <div className="space-y-6">
                                                {category.items.map((item, qIdx) => (
                                                    <div key={item.id} className="pl-2">
                                                        <p className="font-bold text-gray-700 mb-3">{item.question}</p>
                                                        <div className="space-y-2">
                                                            {item.options.map((option, optIdx) => (
                                                                <label
                                                                    key={optIdx}
                                                                    className={`flex items-start p-3 rounded-lg border-2 cursor-pointer transition-all ${answers[item.id] === option.score
                                                                        ?
                                                                        'border-indigo-500 bg-indigo-50'
                                                                        : 'border-gray-100 hover:border-indigo-200 hover:bg-gray-50'
                                                                        }`}
                                                                >
                                                                    <input
                                                                        type="radio"
                                                                        name={item.id}
                                                                        value={option.score}
                                                                        checked={answers[item.id] === option.score}
                                                                        onChange={() => handleAnswerChange(item.id, option.score)}
                                                                        className="mt-1 mr-3 w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                                                                    />
                                                                    <span className="text-sm text-gray-700">{option.label}</span>
                                                                </label>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-8 flex justify-between items-center">
                                    <button
                                        onClick={() => setStep('input_financial')}
                                        className="text-gray-500 hover:text-gray-700 flex items-center gap-1 font-medium"
                                    >
                                        <ChevronLeft className="w-5 h-5" /> 戻る
                                    </button>
                                    <button
                                        onClick={handleQuestionnaireSubmit}
                                        className="px-12 py-4 rounded-xl font-bold text-white shadow-lg bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
                                    >
                                        診断結果を見る & 分析開始
                                        <Search className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </section>
                    )
                }

                {/* Step 4: Loading */}
                {
                    step === 'loading' && (
                        <div className="max-w-2xl mx-auto text-center py-12 animate-fade-in-up">
                            <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-6"></div>
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">AI分析を実行中...</h3>
                            <p className="text-gray-500 animate-pulse">{progress}</p>
                        </div>
                    )
                }

                {/* Step 5: Results Dashboard */}
                {
                    result && step === 'result' && (
                        <div className="animate-fade-in-up">
                            {/* Header */}
                            <div className="flex flex-col md:flex-row gap-6 mb-8 items-start md:items-center justify-between">
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{result.companyName}</h2>
                                    <div className="flex flex-wrap items-center gap-3 text-sm">
                                        <a href={result.url} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline flex items-center gap-1">
                                            <Globe className="w-3 h-3" /> {result.url}
                                        </a>
                                        {result.industry &&
                                            (
                                                <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs font-semibold">
                                                    JSIC: {result.industry.code} - {result.industry.name}
                                                </span>
                                            )}
                                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                                            従業員数: {formData.employees}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setStep('input_basic')}
                                        className="px-4 py-2 bg-white border hover:bg-gray-50 rounded-lg text-sm font-medium text-gray-700 transition-colors"
                                    >
                                        条件を変更する
                                    </button>
                                    <button
                                        onClick={copyToClipboard}
                                        className="flex items-center gap-2 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-sm font-medium transition-colors"
                                    >
                                        <Download className="w-4 h-4" />
                                        JSON
                                    </button>
                                </div>
                            </div>

                            {/* Valuation Result (Calculated from Questionnaire) */}
                            <ValuationResult
                                financialData={formData}
                                scoreData={answers}
                            />

                            <div className="h-4"></div>
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <FileText className="w-6 h-6 text-indigo-600" />
                                AI企業分析レポート
                            </h3>

                            {/* Collapsible Executive Summary */}
                            <CollapsibleSummaryCard summary={result.executiveSummary} />

                            {/* Tabs Navigation */}
                            <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-1">
                                {[
                                    { id: 'overview', label: 'Overview (全体概要)', icon: PieChart },
                                    { id: 'external', label: '1. External (外部環境)', icon: Globe },
                                    { id: 'internal', label: '2. Internal (内部環境)', icon: Briefcase },
                                    { id: 'synthesis', label: '3. Synthesis (統合分析)', icon: Layers },
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-2 px-4 py-3 rounded-t-lg font-medium text-sm transition-colors relative top-[1px]
                    ${activeTab === tab.id
                                                ? 'bg-white border border-gray-200 border-b-white text-indigo-600'
                                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
                                    >
                                        <tab.icon className="w-4 h-4" />
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* Tab Content */}
                            <div className="space-y-6">
                                {/* --- Overview Tab --- */}
                                {activeTab === 'overview' && (
                                    <div className="space-y-8">
                                        {/* Market Snapshot (Full Width) */}
                                        <div className="flex justify-center">
                                            <Card className="w-full max-w-4xl bg-gradient-to-b from-white to-slate-50 border-slate-200 shadow-md">
                                                <SectionHeader icon={BarChart2} title="Market Snapshot (市場概況)" colorClass="text-indigo-900" />
                                                <div className="py-8 px-4 flex justify-center">
                                                    <TamSamSomChart
                                                        tam={result.marketDynamics.marketSize.tam}
                                                        sam={result.marketDynamics.marketSize.sam}
                                                        som={result.marketDynamics.marketSize.som}
                                                    />
                                                </div>
                                                <div className="mt-6 text-center border-t border-slate-100 pt-4">
                                                    <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-sm border border-slate-200">
                                                        <TrendingUp className="w-5 h-5 text-emerald-500" />
                                                        <p className="text-base font-medium text-slate-600">
                                                            年平均成長率 (CAGR): <span className="text-emerald-600 font-bold ml-2 text-lg">{result.marketDynamics.marketSize.growthRate}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </Card>
                                        </div>

                                        {/* SWOT Summary Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
                                            <div className="bg-white p-6 rounded-xl border-l-[6px] border-l-blue-500 shadow-sm">
                                                <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2 text-lg">
                                                    <CheckCircle className="w-5 h-5" /> 企業の強み (Strengths)
                                                </h4>
                                                <ul className="text-sm text-slate-600 list-disc list-inside space-y-2">
                                                    {result.internalEnvironment.financialHealth.strengths.slice(0, 3).map((s, i) => <li key={i}>{s}</li>)}
                                                </ul>
                                            </div>
                                            <div className="bg-white p-6 rounded-xl border-l-[6px] border-l-orange-500 shadow-sm">
                                                <h4 className="font-bold text-orange-800 mb-3 flex items-center gap-2 text-lg">
                                                    <AlertTriangle className="w-5 h-5" /> 課題・リスク (Weaknesses)
                                                </h4>
                                                <ul className="text-sm text-slate-600 list-disc list-inside space-y-2">
                                                    {result.internalEnvironment.financialHealth.concerns.slice(0, 3).map((s, i) => <li key={i}>{s}</li>)}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* --- External Environment Tab --- */}
                                {activeTab === 'external' && (
                                    <div className="space-y-6">
                                        <Card>
                                            <SectionHeader icon={Globe} title="PESTLE Analysis (マクロ環境分析)" />
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                                    <h4 className="flex items-center gap-2 font-bold text-slate-700 text-sm mb-3">
                                                        <span className="w-6 h-6 rounded bg-slate-200 flex items-center justify-center text-xs">P</span> Political (政治)
                                                    </h4>
                                                    <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">{result.externalEnvironment.pestle.political.map((x, i) => <li key={i}>{x}</li>)}</ul>
                                                </div>
                                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                                    <h4 className="flex items-center gap-2 font-bold text-slate-700 text-sm mb-3">
                                                        <span className="w-6 h-6 rounded bg-slate-200 flex items-center justify-center text-xs">E</span> Economic (経済)
                                                    </h4>
                                                    <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">{result.externalEnvironment.pestle.economic.map((x, i) => <li key={i}>{x}</li>)}</ul>
                                                </div>

                                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                                    <h4 className="flex items-center gap-2 font-bold text-slate-700 text-sm mb-3">
                                                        <span className="w-6 h-6 rounded bg-slate-200 flex items-center justify-center text-xs">S</span> Social (社会)
                                                    </h4>
                                                    <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">{result.externalEnvironment.pestle.social.map((x, i) => <li key={i}>{x}</li>)}</ul>
                                                </div>
                                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                                    <h4 className="flex items-center gap-2 font-bold text-slate-700 text-sm mb-3">
                                                        <span className="w-6 h-6 rounded bg-slate-200 flex items-center justify-center text-xs">T</span> Technological (技術)
                                                    </h4>
                                                    <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">{result.externalEnvironment.pestle.technological.map((x, i) => <li key={i}>{x}</li>)}</ul>
                                                </div>
                                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                                    <h4 className="flex items-center gap-2 font-bold text-slate-700 text-sm mb-3">
                                                        <span className="w-6 h-6 rounded bg-slate-200 flex items-center justify-center text-xs">L</span> Legal (法規制)
                                                    </h4>
                                                    <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">{result.externalEnvironment.pestle.legal.map((x, i) => <li key={i}>{x}</li>)}</ul>
                                                </div>
                                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                                    <h4 className="flex items-center gap-2 font-bold text-slate-700 text-sm mb-3">
                                                        <span className="w-6 h-6 rounded bg-slate-200 flex items-center justify-center text-xs">E</span> Environmental (環境)
                                                    </h4>
                                                    <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">{result.externalEnvironment.pestle.environmental.map((x, i) => <li key={i}>{x}</li>)}</ul>
                                                </div>
                                            </div>
                                        </Card>

                                        {/* ... other external cards ... */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <Card>
                                                <SectionHeader icon={Users} title="Market & Customers (市場と顧客)" />
                                                <div className="space-y-4">
                                                    {result.marketDynamics.customerSegments.map((seg, i) => (
                                                        <div key={i} className="p-4 border rounded-lg bg-gray-50 relative overflow-hidden">
                                                            <div className="absolute top-0 right-0 w-16 h-16 bg-blue-100 rounded-bl-full opacity-20 -mr-8 -mt-8"></div>
                                                            <div className="font-bold text-gray-800 mb-2 text-lg">{seg.segment}</div>
                                                            <div className="grid grid-cols-2 gap-2 text-sm">
                                                                <div className="bg-white p-2 rounded border border-gray-100">
                                                                    <span className="block text-[10px] text-gray-500 uppercase font-bold mb-1">Needs (顧客ニーズ)</span>
                                                                    <span className="text-gray-800 text-sm font-medium">{seg.needs}</span>
                                                                </div>
                                                                <div className="bg-white p-2 rounded border border-gray-100">
                                                                    <span className="block text-[10px] text-indigo-500 uppercase font-bold mb-1">KBF (購買決定要因)</span>
                                                                    <span className="text-indigo-700 text-sm font-medium">{seg.kbf}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </Card>
                                            <Card>
                                                <SectionHeader icon={TrendingUp} title="Competitors (競合環境)" />
                                                <div className="space-y-3">
                                                    {result.competitiveLandscape.competitors.map((comp, i) => (
                                                        <div key={i} className="flex flex-col p-3 border-b last:border-0 hover:bg-gray-50 transition-colors rounded">
                                                            <div className="flex justify-between items-center mb-1">
                                                                <span className="font-bold text-gray-800">{comp.name}</span>
                                                                <span className={`text-[10px] px-2 py-0.5 rounded-full border ${comp.type === 'Direct' ?
                                                                    'bg-red-50 text-red-600 border-red-100' :
                                                                    comp.type === 'Indirect' ?
                                                                        'bg-yellow-50 text-yellow-600 border-yellow-100' : 'bg-gray-50 text-gray-600 border-gray-200'
                                                                    }`}>
                                                                    {comp.type === 'Direct' ?
                                                                        'Direct (直接競合)' : comp.type === 'Indirect' ? 'Indirect (間接競合)' : comp.type}
                                                                </span>
                                                            </div>
                                                            <p className="text-xs text-gray-500 mt-1">差別化要因:
                                                                <span className="text-gray-700">{comp.differentiation}</span></p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </Card>
                                        </div>
                                    </div>
                                )}

                                {/* --- Internal Environment Tab --- */}
                                {activeTab === 'internal' && (
                                    <div className="space-y-6">
                                        {/* Financial Health with Score Cards instead of list */}
                                        <Card>
                                            <SectionHeader icon={Activity} title="Financial Health (財務健全性)" colorClass="text-blue-600" />
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                                {Object.entries(result.internalEnvironment.financialHealth.keyMetrics).map(([key, val], idx) => (
                                                    <div key={idx} className="flex flex-col items-center justify-center p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                                                        <div className="text-xs text-blue-500 font-bold mb-1 uppercase">{key}</div>
                                                        <div className="text-lg font-extrabold text-gray-800">{val}</div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="bg-green-50/30 p-4 rounded-lg border border-green-100">
                                                    <h4 className="flex items-center gap-2 font-bold text-green-700 text-sm mb-2">
                                                        <CheckCircle className="w-4 h-4" /> Strengths (強み)
                                                    </h4>
                                                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                                        {result.internalEnvironment.financialHealth.strengths.map((item, i) => <li key={i}>{item}</li>)}
                                                    </ul>
                                                </div>
                                                <div className="bg-red-50/30 p-4 rounded-lg border border-red-100">
                                                    <h4 className="flex items-center gap-2 font-bold text-red-700 text-sm mb-2">
                                                        <AlertTriangle className="w-4 h-4" /> Concerns (懸念点)
                                                    </h4>
                                                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                                        {result.internalEnvironment.financialHealth.concerns.map((item, i) => <li key={i}>{item}</li>)}
                                                    </ul>
                                                </div>
                                            </div>
                                        </Card>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <Card>
                                                <SectionHeader icon={Cpu} title="Operations & Tech (業務・技術)" colorClass="text-purple-600" />
                                                <div className="space-y-4">
                                                    <div className="relative pl-4 border-l-2 border-purple-200">
                                                        <h4 className="font-bold text-xs text-purple-600 uppercase mb-1">Supply Chain (サプライチェーン)</h4>
                                                        <p className="text-sm text-gray-700">{result.internalEnvironment.operationsAndTech.supplyChain}</p>
                                                    </div>
                                                    <div className="relative pl-4 border-l-2 border-purple-200">
                                                        <h4 className="font-bold text-xs text-purple-600 uppercase mb-1">Tech Stack (技術スタック)</h4>
                                                        <p className="text-sm text-gray-700">{result.internalEnvironment.operationsAndTech.techStack}</p>
                                                    </div>
                                                    <div className="relative pl-4 border-l-2 border-purple-200">
                                                        <h4 className="font-bold text-xs text-purple-600 uppercase mb-1">Scalability (拡張性)</h4>
                                                        <p className="text-sm text-gray-700">{result.internalEnvironment.operationsAndTech.scalability}</p>
                                                    </div>
                                                </div>
                                            </Card>

                                            <Card>
                                                <SectionHeader icon={Shield} title="Org, Culture & ESG (組織・文化・ESG)" colorClass="text-orange-600" />
                                                <div className="space-y-4">
                                                    <div className="bg-orange-50/50 p-3 rounded-lg">
                                                        <h4 className="font-bold text-xs text-orange-600 uppercase mb-1">Culture (組織風土)</h4>
                                                        <p className="text-sm text-gray-700">{result.internalEnvironment.orgAndCulture.culture}</p>
                                                    </div>
                                                    <div className="bg-orange-50/50 p-3 rounded-lg">
                                                        <h4 className="font-bold text-xs text-orange-600 uppercase mb-1">Governance (ガバナンス)</h4>
                                                        <p className="text-sm text-gray-700">{result.internalEnvironment.orgAndCulture.governance}</p>
                                                    </div>
                                                    <div className="bg-orange-50/50 p-3 rounded-lg">
                                                        <h4 className="font-bold text-xs text-orange-600 uppercase mb-1">ESG Initiatives (ESGの取り組み)</h4>
                                                        <div className="flex flex-wrap gap-2 mt-1">
                                                            {result.internalEnvironment.orgAndCulture.esgInitiatives.map((item, i) => (
                                                                <span key={i} className="text-xs bg-white border border-orange-100 text-orange-800 px-2 py-1 rounded-full shadow-sm">{item}</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        </div>
                                    </div>
                                )}

                                {/* --- Synthesis Tab (SWOT GRID) --- */}
                                {activeTab === 'synthesis' && (
                                    <div className="space-y-6">
                                        {/* Changed layout structure to prevent overlap */}
                                        <Card>
                                            <SectionHeader icon={Layers} title="SWOT Analysis (SWOT分析)" />
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {/* Internal Factors */}
                                                <div className="space-y-4">
                                                    <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                                                        <div className="flex items-center gap-2 mb-3 text-red-700 font-bold uppercase tracking-wider text-sm border-b border-red-200 pb-2">
                                                            <TrendingUp className="w-4 h-4" /> Strengths (強み)
                                                        </div>
                                                        <ul className="space-y-2">
                                                            {result.synthesis.swot.strengths.map((item, i) => (
                                                                <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                                                                    {item}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                                        <div className="flex items-center gap-2 mb-3 text-blue-700 font-bold uppercase tracking-wider text-sm border-b border-blue-200 pb-2">
                                                            <AlertTriangle className="w-4 h-4" /> Weaknesses (弱み)
                                                        </div>
                                                        <ul className="space-y-2">
                                                            {result.synthesis.swot.weaknesses.map((item, i) => (
                                                                <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                                                                    {item}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>

                                                {/* External Factors */}
                                                <div className="space-y-4">
                                                    <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                                                        <div className="flex items-center gap-2 mb-3 text-green-700 font-bold uppercase tracking-wider text-sm border-b border-green-200 pb-2">
                                                            <CheckCircle className="w-4 h-4" /> Opportunities (機会)
                                                        </div>
                                                        <ul className="space-y-2">
                                                            {result.synthesis.swot.opportunities.map((item, i) => (
                                                                <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                                                                    {item}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                                                        <div className="flex items-center gap-2 mb-3 text-orange-700 font-bold uppercase tracking-wider text-sm border-b border-orange-200 pb-2">
                                                            <Shield className="w-4 h-4" /> Threats (脅威)
                                                        </div>
                                                        <ul className="space-y-2">
                                                            {result.synthesis.swot.threats.map((item, i) => (
                                                                <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                                                                    {item}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>

                                        <Card>
                                            <SectionHeader icon={FileText} title="Future Scenarios (将来シナリオ)" colorClass="text-gray-600" />
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div className="p-5 border-t-4 border-t-green-500 bg-white shadow-md rounded-xl transform transition hover:-translate-y-1">
                                                    <span className="font-bold text-green-700 block mb-3 text-sm uppercase tracking-wide">Best Case (最良)</span>
                                                    <p className="text-sm text-gray-600 leading-relaxed">{result.synthesis.scenarios.bestCase}</p>
                                                </div>
                                                <div className="p-5 border-t-4 border-t-blue-500 bg-white shadow-md rounded-xl transform transition hover:-translate-y-1">
                                                    <span className="font-bold text-blue-700 block mb-3 text-sm uppercase tracking-wide">Base Case (基本)</span>
                                                    <p className="text-sm text-gray-600 leading-relaxed">{result.synthesis.scenarios.baseCase}</p>
                                                </div>
                                                <div className="p-5 border-t-4 border-t-red-500 bg-white shadow-md rounded-xl transform transition hover:-translate-y-1">
                                                    <span className="font-bold text-red-700 block mb-3 text-sm uppercase tracking-wide">Worst Case (最悪)</span>
                                                    <p className="text-sm text-gray-600 leading-relaxed">{result.synthesis.scenarios.worstCase}</p>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                )}
                            </div>

                            {/* --- Growth Plan Section --- */}
                            <div id="growth-plan-section" className="mt-12 mb-12 border-t pt-8">
                                {!growthPlan && !isGeneratingPlan && (
                                    <div className="text-center">
                                        <h3 className="text-xl font-bold text-gray-800 mb-3">さらなる成長のために</h3>
                                        <p className="text-gray-500 mb-6">
                                            現状の分析結果をもとに、評価年数を最大化し、営業利益を伸ばすための<br className="hidden md:block" />
                                            具体的なアクションプランをAIが提案します。
                                        </p>
                                        <button
                                            onClick={generateGrowthPlan}
                                            className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-2 mx-auto"
                                        >
                                            <Lightbulb className="w-6 h-6" />
                                            さらに企業価値を上げるためには？
                                        </button>
                                    </div>
                                )}

                                <GrowthPlanSection
                                    plan={growthPlan}
                                    loading={isGeneratingPlan}
                                    currentFinancials={formData}
                                    currentYears={calculateCurrentValuationYears()}
                                />
                            </div>

                            <div className="mt-8 text-center text-gray-400 text-xs">
                                AI generated content may contain inaccuracies. Please verify with primary sources.
                                <br />
                                Based on "企業深耕分析のための包括的MECEフレームワーク"
                            </div>
                        </div>
                    )
                }
            </main >
        </div >
    );
}
