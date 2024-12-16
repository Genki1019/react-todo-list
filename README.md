# Todo リスト

このプロジェクトは、React と TypeScript を使用して作成したシンプルな Todo アプリです。タスクの管理、完了状態の切り替え、カテゴリ分け、期限の設定など、基本的な Todo アプリの機能を実装しています。

## インストール方法

以下の手順に従って、このアプリをローカル環境で起動できます。

### 1. リポジトリのクローン

まず、このリポジトリをローカル環境にクローンします。

```bash
git clone git@github.com:Genki1019/react-todo-list.git
```

### 2. 依存関係のインストール

次に、プロジェクトのディレクトリに移動して、依存関係をインストールします。

```bash
cd react-ts-todo-app
npm install
  または
yarn install
```

### 3. アプリの起動

依存関係がインストールされたら、以下のコマンドでアプリをローカル環境で起動できます。

```bash
npm run dev
  または
yarn dev
```

## 特徴

- **タスクの追加・削除**: 新しいタスクを追加し、完了したタスクを削除することができます。
- **タスクの編集**: タスクのタイトルや期限を編集できます。
- **タスクの完了状態切り替え**: タスクの完了状態をチェックボックスで切り替え可能です。
- **カテゴリ分け**: タスクを複数のカテゴリに分けて整理できます。
  - カテゴリ名を右クリックで削除、ドラッグ&ドロップで並び順の変更が可能です。
- **期限の設定**: タスクごとに締め切り日を設定し、期限を過ぎたタスクを確認できます。
- **タスクのソート**: 登録順や期限でタスクをソートできます。
- **一括削除**: 完了したタスクを一括削除する機能を提供します。

## 使用技術

- **Node.js(ver22.2.0)**: JavaScript 環境として使用。
- **React(ver18.3.1)**: ユーザーインターフェースの作成に使用。
- **TypeScript(ver5.6.2)**: 型安全なコードを書くために使用。
- **Vite(ver6.0.1)**: 高速なビルドツールとして使用。
