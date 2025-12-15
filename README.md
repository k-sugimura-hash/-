# ミライバトン - 企業価値シミュレーションツール

水彩風デザインの企業価値算定・分析アプリケーション

## セットアップ

1. 依存関係のインストール:
```bash
npm install
```

2. 環境変数の設定:
`.env.example`を`.env`にコピーして、Gemini APIキーを設定してください。

```bash
cp .env.example .env
```

`.env`ファイルを編集:
```
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

3. 開発サーバーの起動:
```bash
npm run dev
```

4. 本番ビルド:
```bash
npm run build
```

## デプロイ

### Vercelへのデプロイ

1. Vercelアカウントを作成: https://vercel.com
2. GitHubリポジトリと連携
3. 環境変数 `VITE_GEMINI_API_KEY` を設定
4. デプロイ

### Netlifyへのデプロイ

1. Netlifyアカウントを作成: https://netlify.com
2. `dist`フォルダをドラッグ&ドロップ、またはGitリポジトリと連携
3. 環境変数 `VITE_GEMINI_API_KEY` を設定

## 技術スタック

- React + Vite
- Tailwind CSS
- Lucide React (アイコン)
- Google Gemini API (AI分析)

## ライセンス

MIT
