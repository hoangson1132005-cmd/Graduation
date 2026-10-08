# Thiệp Mời Tốt Nghiệp Phong Cách IT (Web Tĩnh)

Đây là mã nguồn trang web thiệp mời tốt nghiệp được thiết kế theo phong cách IT (Dark theme, Navy & Green Neon, Terminal/Code style). Web hoạt động 100% tĩnh (HTML/CSS/JS) và có thể deploy dễ dàng lên Vercel, Netlify hoặc GitHub Pages.

## Cấu Trúc Thư Mục
- `index.html`: Giao diện chính của thiệp mời.
- `admin.html`: Trang quản lý để tạo link riêng cho từng khách.
- `js/config.js`: **[QUAN TRỌNG]** Chứa toàn bộ thông tin nội dung, text, link ảnh, ngày giờ. Bạn chỉ cần sửa file này!
- `css/style.css`: CSS tùy chỉnh (hiệu ứng, thanh cuộn...).
- `js/main.js` & `js/admin.js`: Script xử lý logic.

## Hướng Dẫn Chỉnh Sửa
Mở file `js/config.js` bằng Text Editor và thay đổi các thông tin thành của bạn.

*Lưu ý về Ảnh Og (Open Graph):* Để khi gửi link qua Zalo/Messenger hiện ảnh đẹp, hãy sửa dòng `<meta property="og:image" content="...">` trong file `index.html` thành link ảnh của bạn (khuyên dùng kích thước 1200x630px).

## Hướng Dẫn Setup Nhận RSVP qua Google Sheets (MIỄN PHÍ)
Trang web này không cần Backend/Database phức tạp. Form xác nhận tham dự (RSVP) sẽ gửi thẳng data về Google Sheets của bạn.

1. Truy cập [Google Sheets](https://docs.google.com/spreadsheets) và tạo một bảng tính mới.
2. Tạo các cột ở dòng số 1: `Timestamp`, `Name`, `Attendance`, `Companions`, `Message`.
3. Trên thanh menu, chọn **Extensions (Tiện ích mở rộng) -> Apps Script**.
4. Xóa hết code cũ, dán đoạn code sau vào:
   ```javascript
   const sheetName = 'Sheet1'; // Đổi tên sheet nếu cần

   function doPost(e) {
     try {
       const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
       const params = e.parameter;
       
       sheet.appendRow([
         params.timestamp || new Date(),
         params.name || '',
         params.attendance === 'yes' ? 'Sẽ đến' : 'Không đến',
         params.companions || '0',
         params.message || ''
       ]);
       
       return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
     } catch (error) {
       return ContentService.createTextOutput("Error: " + error.toString()).setMimeType(ContentService.MimeType.TEXT);
     }
   }
   ```
5. Bấm nút **Save** (Lưu).
6. Bấm nút **Deploy (Triển khai) -> New deployment (Triển khai mới)**.
7. Chọn loại là **Web app**.
   - Description: Điền gì cũng được.
   - Execute as (Thực thi dưới dạng): **Me (Tôi)**.
   - Who has access (Ai có quyền truy cập): **Anyone (Bất kỳ ai)**.
8. Bấm **Deploy**. Google sẽ yêu cầu cấp quyền (Authorize access) -> Chọn tài khoản Google của bạn -> Advanced (Nâng cao) -> Go to... (Đi tới...). Chấp nhận quyền.
9. Copy đường link **Web app URL** hiển thị ra.
10. Dán link đó vào biến `scriptUrl` trong file `js/config.js` của bạn. Xong!

## Hướng Dẫn Tạo Link Khách Mời
1. Mở file `admin.html` trên trình duyệt.
2. Dán danh sách khách mời (Tên, Xưng hô). Ví dụ:
   ```
   Tuấn, bạn
   Lan, chị
   Thầy Bình, thầy
   ```
3. Bấm "Tạo Link" và copy gửi cho từng người.

## Hướng Dẫn Deploy (Đưa lên mạng)
**Dùng Vercel (Khuyên dùng):**
1. Đăng nhập [Vercel](https://vercel.com/).
2. Bấm **Add New -> Project**.
3. Upload thư mục code lên.
4. Vercel sẽ tự động deploy và cho bạn 1 đường link (VD: `thiep-cua-son.vercel.app`).
5. Cập nhật biến `baseUrl` trong `config.js` thành link Vercel của bạn để trang Admin tạo đúng link.
