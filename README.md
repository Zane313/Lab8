Lab8

### ติดตั้ง MySQL บน Mac (แนะนำใช้ Homebrew)
```bash
# ติดตั้ง Homebrew (ถ้ายังไม่มี)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# ติดตั้ง MySQL
brew install mysql

# เริ่มต้น MySQL Service
brew services start mysql
```

---

## 🚀 ขั้นตอนการติดตั้งโปรเจกต์

### ขั้นตอนที่ 1 — ดาวน์โหลดโปรเจกต์
แตกไฟล์ ZIP แล้ววางโฟลเดอร์ `Lab8` ไว้ที่ต้องการ เช่น:
```
/Users/ชื่อผู้ใช้/Lab8
```

### ขั้นตอนที่ 2 — สร้าง Database
เปิด Terminal แล้วพิมพ์คำสั่งต่อไปนี้:

```bash
# เข้า MySQL (ถ้ามีรหัสให้ใส่ -p ด้วย)
mysql -u root

# หรือถ้ามีรหัสผ่าน
mysql -u root -p
```

เมื่อเข้า MySQL ได้แล้ว ให้รันไฟล์ SQL:
```sql
source /Users/ชื่อผู้ใช้/Lab8/db.sql;
exit;
```

> ⚠️ **หมายเหตุ:** เปลี่ยน `ชื่อผู้ใช้` เป็นชื่อจริงของเครื่องคุณ เช่น `/Users/korakit/Lab8/db.sql`

### ขั้นตอนที่ 3 — ตั้งค่า Database Connection
เปิดไฟล์ `app.js` แล้วแก้ไขส่วนนี้ให้ตรงกับเครื่องของคุณ:

```js
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',        // ← ใส่รหัส MySQL ของคุณ (ถ้าไม่มีให้ปล่อยว่าง)
    database: 'bigbike_db'
});
```

### ขั้นตอนที่ 4 — ติดตั้ง Dependencies
```bash
cd /Users/ชื่อผู้ใช้/Lab8
npm install
```

### ขั้นตอนที่ 5 — รันโปรเจกต์
```bash
npm start
```

เมื่อรันสำเร็จจะเห็นข้อความนี้ใน Terminal:
```
✅ Connected to database
🚀 Server running on http://localhost:3000
```

### ขั้นตอนที่ 6 — เปิดเว็บไซต์
เปิด Browser แล้วไปที่:
```
http://localhost:3000
```

---

## 📁 โครงสร้างโปรเจกต์ (MVC)

```
Lab8/
├── controllers/
│   ├── home.controller.js       ← แสดงหน้า Dashboard
│   └── bikes.controller.js      ← Logic CRUD ทั้งหมด
├── routes/
│   ├── index.routes.js          ← Route หน้าหลัก
│   └── bike.routes.js           ← Route ของบิ๊กไบค์
├── views/
│   ├── partials/
│   │   ├── header.ejs           ← HTML Header
│   │   ├── navbar.ejs           ← Navigation Bar
│   │   └── footer.ejs           ← HTML Footer
│   ├── index.ejs                ← หน้า Dashboard (แสดงรายการ)
│   ├── add-bike.ejs             ← หน้าเพิ่มรถ
│   └── edit-bike.ejs            ← หน้าแก้ไขรถ
├── public/
│   └── assets/
│       └── img/                 ← โฟลเดอร์เก็บรูปภาพ
├── db.sql                       ← ไฟล์สร้าง Database
├── app.js                       ← จุดเริ่มต้นของโปรแกรม
├── package.json
└── README.md
```

---

## 🗄️ โครงสร้างฐานข้อมูล

```sql
CREATE TABLE bikes (
  id      INT AUTO_INCREMENT PRIMARY KEY,
  brand   VARCHAR(255) NOT NULL,    -- ยี่ห้อรถ เช่น Honda, Yamaha
  model   VARCHAR(255) NOT NULL,    -- รุ่น เช่น CBR650R
  cc      INT NOT NULL,             -- ขนาดเครื่องยนต์ เช่น 650
  price   DECIMAL(10,2) NOT NULL,   -- ราคา เช่น 359000.00
  image   VARCHAR(255) NOT NULL,    -- ชื่อไฟล์รูปภาพ
  slug    VARCHAR(100) NOT NULL     -- ชื่อย่อสำหรับ URL เช่น honda-cbr650r
);
```

---

## ✨ ฟีเจอร์ของระบบ

| ฟีเจอร์ | รายละเอียด |
|---|---|
| **Dashboard** | แสดงรายการรถทั้งหมดในรูปแบบตาราง |
| **เพิ่มรถ (Create)** | ฟอร์มกรอกข้อมูลพร้อม Preview รูปภาพก่อนอัปโหลด |
| **แก้ไขรถ (Update)** | แก้ไขข้อมูล และเปลี่ยนรูปภาพได้ (ลบรูปเก่าอัตโนมัติ) |
| **ลบรถ (Delete)** | มี Modal ยืนยันก่อนลบ และลบไฟล์รูปออกจากเซิร์ฟเวอร์ด้วย |
| **Success Alert** | แจ้งเตือนสีเขียวหลังทำรายการสำเร็จ |

---


