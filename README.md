# restaurant_list

## 簡介
藉由 Express Handlebars 和 Passport 打造可以登入/登出專屬頁面、瀏覽、搜尋以及使用 CRUD 功能操作餐廳資訊的網路應用程式

### 功能
- 登入/登出專屬頁面
- 瀏覽餐廳名單
- 搜尋特定餐廳
- 瀏覽每間餐廳詳細資訊
- 新增與刪除餐廳
- 修改餐廳資訊

## 開發工具
- Node.js 16.15.0
- Express 4.18.1
- Bcryptjs 2.4.3
- Connect-Flash 0.1.1
- Dotenv 8.6.0
- Express-Handlebars 6.0.6
- Express-Session 1.17.3
- Method-Override 3.0.0
- Mongoose 6.3.4
- MongoDB Atlas
- Passport 0.4.1
- Passport-Facebook 3.0.0
- Passport-Local 1.0.0
- Popper.js 2.11.5
- Bootstrap.js 5.2.0
- Bootstrap.css 5.2.0
- Font-Awesome 6.1.1

## 開始使用
1. 請先確認有安裝 node.js 與 npm
2. 將專案 clone 到本地，透過終端機輸入
```zsh
git clone --single-branch -b loginRegister https://github.com/chh817/restaurant_list.git
```
3. 複製完畢，進入 restaurant_list 資料夾，輸入
```zsh
npm i
```
4. 本專案載入環境變數，請參考 .env.example

5. 環境變數設定完畢，載入種子資料
```zsh
npm run seed
```
6. 載入完畢，繼續輸入
```zsh
npm run start
```
7. 當出現下列訊息代表連線成功，可進入網址進行測試
```zsh
Express is listening on http://localhost:3000
Mongodb connected!
```
8. 若要停止連線，使用下列快速鍵
```zsh
Command⌘ + C
```
9. 附帶兩組測試帳號如下
```zsh
Name : user1 , email: user1@example.com , password: 12345678

Name : user2 , email: user2@example.com , password: 12345678
```