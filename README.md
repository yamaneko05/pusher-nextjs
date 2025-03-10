## 使用している外部サービス

- Pusher
- Neon DB
- Supabase Storage

## アーキテクチャ

- app/action
  - バリデーション
  - usecase の実行
  - usecase で例外発生時のエラーハンドリング
  - revalidatePath など
- app/usecase
  - 認証
  - db 操作
  - storage 操作
  - session 操作
