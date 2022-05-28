# restaurant_list

## 簡介
藉由 Express Handlebars 打造可以瀏覽、搜尋與使用 CRUD 功能操作餐廳資訊的網頁

### 功能
- 瀏覽餐廳名單(包含排序選項)
- 搜尋特定餐廳
- 瀏覽每間餐廳詳細資訊
- 新增與刪除餐廳
- 修改餐廳資訊

## 開發工具
- Node.js 16.15.0
- Express 4.18.1
- Express-Handlebars 6.0.6
- Bootstrap.js 5.0.2
- Popper.js 2.11.5
- Font-Awesome 6.1.1
- MongoDB Atlas
- Mongoose 6.3.4
- Method-Override 3.0.0

## 開始使用
1. 請先確認有安裝 node.js 與 npm
2. 將專案 clone 到本地，透過終端機輸入
```zsh
git clone -b restfulRefactor --single-branch https://github.com/chh817/restaurant_list.git
```
3. 進入 restaurant_list 資料夾，輸入
```zsh
npm i
```
4. 安裝完畢，設定環境變數
```zsh
export MONGODB_URI="mongodb+srv://使用者名稱:使用者密碼@資料庫位置/資料庫名稱?retryWrites=true&w=majority"
``` 
5. 設定完畢，載入種子資料
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