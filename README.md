## 使用している外部サービス

- Pusher
- Neon DB
- Supabase Storage

## ディレクトリ構成

- app/
  - ルーティング
- components/
  - コンポーネント
- actions/
  - (プレゼンテーション層)
  - server action
  - フォームバリデーション
  - revalidatePath()
- services/
  - (アプリケーション層)
  - ビジネスロジック
- repositories/
  - インフラストラクチャ層
- libs/
  - ライブラリのインスタンス
  - dayjs, supabase, pusherなど
- utils/
  - その他
