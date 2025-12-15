export const DIAGNOSTIC_QUESTIONS = [
    {
        id: "cat_a",
        category: "A. ビジネス将来性",
        items: [
            {
                id: "q1",
                question: "Q1. この業界の景気はどうですか？",
                options: [
                    { label: "A. 明らかに伸びている。追い風が吹いていて、チャンスが多いと感じる", score: 5 },
                    { label: "B. 良くも悪くもない。昔とあまり変わらない", score: 0 },
                    { label: "C. 明らかに縮小している。斜陽産業だと感じる", score: -5 }
                ]
            },
            {
                id: "q2",
                question: "Q2. 売上の立ち方はどうなっていますか？",
                options: [
                    { label: "A. 毎月自動的に入ってくる売上（会員費、定期契約など）が大半で、翌月の売上が読みやすい", score: 5 },
                    { label: "B. 定期的な売上もあるが、毎月新しく営業して取ってくる仕事も多い", score: 0 },
                    { label: "C. 毎月ゼロからのスタートで、常に新しい注文を取り続けないといけない", score: -3 }
                ]
            },
            {
                id: "q3",
                question: "Q3. ライバルとの競争についてどう思いますか？",
                options: [
                    { label: "A. うちにしかない技術や許可、ブランドがあり、他社は真似できない（独占的）", score: 5 },
                    { label: "B. まあまあ特徴はあるが、似たような競合もそれなりにいる", score: 1 },
                    { label: "C. 特徴が出しにくく、結局は「安売り競争」になってしまっている", score: -5 }
                ]
            }
        ]
    },
    {
        id: "cat_b",
        category: "B. 収益・顧客の質",
        items: [
            {
                id: "q4",
                question: "Q4. 会社の儲かり具合（利益）は安定していますか？",
                options: [
                    { label: "A. ずっと黒字で、年々お金が残るようになっている。安心感がある", score: 5 },
                    { label: "B. 黒字ではあるが、増えたり減ったりで横ばい状態だ", score: 0 },
                    { label: "C. 赤字の年があったり、その年になってみないと儲かるかわからず不安定だ", score: -5 }
                ]
            },
            {
                id: "q5",
                question: "Q5. 「あの大口さん」がいなくなっても大丈夫ですか？",
                options: [
                    { label: "A. 顧客がたくさんいるので、特定の1社がいなくなっても経営は揺るがない", score: 5 },
                    { label: "B. 痛手ではあるが、なんとか耐えられる", score: 0 },
                    { label: "C. 特定の1～2社に売上の大半を頼っているので、契約を切られたら会社が潰れる", score: -5 }
                ]
            },
            {
                id: "q6",
                question: "Q6. お客様はリピートしてくれますか？（ファンはいますか？）",
                options: [
                    { label: "A. 「またお願いしたい」と自然に戻ってくるお客様が多く、評判が良い", score: 5 },
                    { label: "B. 普通。特に良くも悪くもない", score: 0 },
                    { label: "C. 一度きりのお客様ばかりで、クレームもそこそこある", score: -5 }
                ]
            }
        ]
    },
    {
        id: "cat_c",
        category: "C. 組織の健全性",
        items: [
            {
                id: "q7",
                question: "Q7. 社長が1ヶ月長期休暇を取ったらどうなりますか？",
                options: [
                    { label: "A. 現場も判断もスタッフだけで回るので、全く問題ない", score: 5 },
                    { label: "B. 現場は回るが、重要な判断は止まってしまう", score: 0 },
                    { label: "C. 現場が混乱してしまい、仕事が回らなくなる（社長がいないと何もできない）", score: -5 }
                ]
            },
            {
                id: "q8",
                question: "Q8. 従業員の定着はどうですか？",
                options: [
                    { label: "A. 長く働いている人が多く、会社の雰囲気がとても良い", score: 5 },
                    { label: "B. 普通。人の入れ替わりはそれなりにある", score: 0 },
                    { label: "C. 入ってもすぐに辞めてしまう人が多く、常に人手不足だ", score: -5 }
                ]
            }
        ]
    },
    {
        id: "cat_d",
        category: "D. 管理体制",
        items: [
            {
                id: "q9",
                question: "Q9. 会社の数字（売上や利益）はすぐ把握できていますか？",
                options: [
                    { label: "A. 先月の成績がどうだったか、翌月すぐに正確な数字が出ている", score: 3 },
                    { label: "B. 数字が出るまで少し時間がかかるが（1～2ヶ月）、大体は把握できている", score: 0 },
                    { label: "C. 通帳を見ないと残高がわからず、どんぶり勘定に近い", score: -5 }
                ]
            },
            {
                id: "q10",
                question: "Q10. 労務や法律のトラブル（未払い残業など）はありますか？",
                options: [
                    { label: "A. きっちりルールを守っており、後ろめたいことは何もない", score: 2 },
                    { label: "B. 細かい不備はあるかもしれないが、大きなトラブルはない", score: -2 },
                    { label: "C. サービス残業が常態化しているなど、訴えられたら負けるリスクがある", score: -5 }
                ]
            }
        ]
    }
];

export const MOCK_DATA = {
    companyName: "Future Mobility Corp (Demo)",
    url: "https://example.com",
    industry: { code: "E", name: "製造業" },
    executiveSummary: "業界をリードする革新的な技術力を持ちながら、サプライチェーンの脆弱性と激化する価格競争に直面している。長期的にはEVシフトへの適応が鍵となる。",
    externalEnvironment: {
        pestle: {
            political: ["主要国での炭素税導入の動き"],
            economic: ["インフレによる原材料コストの上昇"],
            social: ["「所有から利用へ」の意識変化（MaaS）"],
            technological: ["全固体電池の実用化競争"],
            legal: ["データプライバシー規制の強化"],
            environmental: ["Scope3までの排出量開示義務化"]
        }
    },
    marketDynamics: {
        marketSize: { tam: "50兆", sam: "15兆", som: "2兆", growthRate: "12%" },
        customerSegments: [{ segment: "都市部ミレニアル層", needs: "利便性", kbf: "デザイン" }]
    },
    competitiveLandscape: {
        competitors: [{ name: "Competitor A", type: "Direct", differentiation: "ブランド力" }],
        positioning: "高品質・中価格帯"
    },
    internalEnvironment: {
        financialHealth: { strengths: ["自己資本比率"], concerns: ["R&D負担"], keyMetrics: { "営業利益率": "8.5%" } },
        operationsAndTech: { supplyChain: "特定地域依存", techStack: "レガシー", scalability: "高い" },
        orgAndCulture: { culture: "堅実", governance: "改善余地あり", esgInitiatives: ["カーボンニュートラル"] }
    },
    synthesis: {
        swot: { strengths: ["技術力"], weaknesses: ["意思決定"], opportunities: ["新興国"], threats: ["異業種参入"] },
        scenarios: { bestCase: "市場標準化", baseCase: "徐々にシフト", worstCase: "リコール" }
    }
};

export const MOCK_GROWTH_PLAN = {
    valuation_plan: [
        { title: "収益基盤のストック化", action: "売り切り型からサブスクリプションモデルへの移行を検討し、毎月の安定収益比率を30%以上に引き上げる。", impact: "評価年数係数の大幅向上", year_impact: 0.5 },
        { title: "特定顧客依存の解消", action: "新規開拓営業チームを組成し、売上構成比1位の顧客シェアを20%以下に抑える。", impact: "事業リスク低下による割引率改善", year_impact: 0.3 },
        { title: "組織の自律化", action: "権限委譲を進め、社長不在でも現場が回るミドルマネジメント層の育成プログラムを導入する。", impact: "事業承継リスクの低減", year_impact: 0.2 }
    ],
    profit_strategy: [
        { title: "高付加価値セグメントへのシフト", strategy: "価格競争が激しい汎用品市場から、特定のニッチな高機能市場へリソースを集中させる。", rationale: "競合が少なく利益率が高い領域でのシェア獲得", profit_impact_percent: 10 },
        { title: "DXによるコスト構造改革", strategy: "調達・製造プロセスのデジタル化により、変動費を5%削減する。", rationale: "営業利益率の直接的な改善", profit_impact_percent: 5 }
    ]
};
