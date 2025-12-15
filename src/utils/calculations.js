// 従業員数文字列を数値に変換するヘルパー
export const parseEmployees = (str) => {
    if (!str) return 0;
    // 直接数値の場合
    if (!isNaN(str)) return parseInt(str, 10);
    // レンジの場合 (例: "21-50名") 中央値を返す
    if (str.includes("-")) {
        const parts = str.split("-");
        const min = parseInt(parts[0].replace(/[^0-9]/g, ""), 10);
        const max = parseInt(parts[1].replace(/[^0-9]/g, ""), 10);
        return Math.floor((min + max) / 2);
    }
    // "301名以上" などの場合
    const num = parseInt(str.replace(/[^0-9]/g, ""), 10);
    return num || 0;
};

// 想定プロ経営者報酬を算出するヘルパー (単位: 千円)
// 売上1億(100,000千円) -> 600万(6,000千円)
export const estimateExecutiveComp = (sales) => {
    const s = parseFloat(sales) || 0;
    if (s < 100000) return 6000;   // 売上1億未満 -> 600万
    if (s < 300000) return 8000;
    // 売上3億未満 -> 800万
    if (s < 1000000) return 10000;
    // 売上10億未満 -> 1000万
    if (s < 3000000) return 15000; // 売上30億未満 -> 1500万
    return 20000;
    // それ以上 -> 2000万
};
