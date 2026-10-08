const CONFIG = {
    // Thông tin cá nhân
    ownerName: "Nguyễn Hoàng Sơn",
    title: "Lễ Tốt Nghiệp Cử Nhân",

    // SEO & Open Graph (Hiển thị khi gửi link)
    ogTitle: "Thiệp mời Tốt Nghiệp - Nguyễn Hoàng Sơn",
    ogDescription: "Ba năm thanh xuân gói gọn trong một ngày. Rất mong bạn đến chung vui cùng Sơn nhé!",
    ogImage: "assets/cyber_grad_card.png", // Thay bằng link ảnh thật của bạn

    // URL gốc của web để tạo link trong admin (ví dụ: https://thiep.vercel.app)
    baseUrl: "https://graduation-tau-nine.vercel.app",

    // Hình ảnh thiệp chính
    invitationCard: "assets/cyber_grad_card.png",

    // File nhạc nền (URL hoặc đường dẫn nội bộ)
    musicUrl: "assets/music.mp3",

    // Cấu hình màn hình khởi động (Terminal Boot)
    bootLines: [
        "Khởi động Hệ điều hành Tốt Nghiệp v1.0.0...",
        "Đang nạp driver 'Tôn Đức Thắng University'......... [ OK ]",
        "Mount dữ liệu 'Kỷ niệm 3 năm'........ [ OK ]",
        "Khởi động dịch vụ 'Chạy Deadline'.... [ DONE ]",
        "Đang thiết lập kết nối bảo mật tới khách mời...",
        "Phát hiện mục tiêu: {guestName} (Quyền hạn: V.I.P)",
        "Giải mã dữ liệu thư mời.............. [ 100% ]",
        "Vượt tường lửa (Firewall) thành công.",
        "Thực thi lệnh ./mo_thiep.sh..........",
        "CẤP QUYỀN TRUY CẬP. BẮT ĐẦU!"
    ],

    // Thông tin sự kiện
    event: {
        date: "2026-10-17T10:00:00", // Định dạng YYYY-MM-DDTHH:mm:ss
        startDate: "2023-08-22T00:00:00", // Ngày bắt đầu nhập học để tính tiến trình
        timeDisplay: "09:30 - 11:00 Sáng",
        dateDisplay: "Thứ Bảy, 17/10/2026",
        location: "Trường Đại học Tôn Đức Thắng",
        address: "19 Nguyễn Hữu Thọ, Phường, Tân Hưng, Hồ Chí Minh",
        mapLink: "https://maps.app.goo.gl/x2TMm8iWHMquHWzx7",
        grabLink: "https://grab.onelink.me/2695613898?pid=inappsharing&c=1-MTE1MDIwMzY&is_retargeting=true&af_dp=grab%3A%2F%2Fopen%3FscreenType%3DEXPRESS%26dropOffLatitude%3D10.7319797952372%26dropOffLongitude%3D106.69933899981007"
    },

    // Thời tiết giả lập (bạn có thể tự thay đổi cho phù hợp ngày đó)
    weather: {
        temp: "30°C",
        status: "Nhiều mây, trưa nắng nhẹ",
        advice: "Nhớ mang theo áo khoác / dù / quạt cầm tay / nước uống nhee!"
    },


    // Hướng dẫn di chuyển & Lưu ý
    guide: {
        virtualTourLink: "https://360.tdtu.edu.vn/main/#node63,-91.54,-23.46,60.68,4", // Sơ đồ 360 độ (hiển thị dạng khung nhúng)
        mapImage: "https://drive.google.com/thumbnail?id=1yrw92lLBNp115mzBM34O3ijC7DhluPug&sz=w1000", // Link Google Drive đã fix để hiện ảnh
        steps: [
            "1. Đi vào bằng cổng 2 trên đường Nguyễn Hữu Thọ / Cổng 5 hoặc 7 trên đường D6.",
            "2. Hỏi các bác bảo vệ để gửi xe tại hầm tòa D, tòa F, tòa Nhà thi đấu, tòa M (Giá: 2.000đ/lượt). Hoặc gửi xe ở siêu thị Lotte Mart (Đ/c: 469 Nguyễn Hữu Thọ, Tân Hưng, Hồ Chí Minh) sau đó đặt xe/đi bộ (khoảng 500m) về Trường Đại học Tôn Đức Thắng",
            "3. Khuyến khích di chuyển bằng xe công nghệ vì hôm đó đông hết chỗ gửi xe"
        ],
        notes: [
            "Dress code: Lịch sự, trang nhã.",
            "Vì lễ khá đông và trưa nắng nên mọi người nhớ mang theo nước, quạt cầm tay và dù nha!"
        ]
    },

    // Lời cảm nghĩ
    message: "Hành trình 3 năm không quá dài, nhưng cũng đủ để Sơn cảm nhận được tình yêu thương từ gia đình, từ các thầy/cô, từ anh/chị và từ bạn bè. Chuyến xe nào cũng phải đến trạm dừng, ngày tháng thức đêm làm bài cuối cùng cũng đi đến hồi kết. Mình muốn gửi lời cảm ơn siu to bự khổng lồ đến gia đình, thầy cô và những người anh em chí cốt đã giúp đỡ mình, đã gánh còng lưng mình qua các môn trên giảng đường Đại học. Sự hiện diện của mọi người trong ngày lễ tốt nghiệp sẽ là mảnh ghép hoàn hảo nhất cho tuổi trẻ của mình!",

    // Git Log Timeline Hành Trình
    gitLog: [
        {
            ascii: `
    ________  ________  _________
   /___  __/ /_  ____/ /___  ___/
      / /     / / / /     / /
     / /     / /_/ /     / /
    /_/     /_____/     /_/    (R)
  =================================
      ĐẠI HỌC TÔN ĐỨC THẮNG
     TON DUC THANG UNIVERSITY

  * DEGREE OF BACHELOR
  * NGUYỄN HOÀNG SƠN
  =================================
            `,
            isMerge: true
        }
    ],

    // Link Tường Lời Chúc (Đọc từ Google Sheets định dạng CSV được Publish ra Web)
    guestbookCsvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTflpBkVX3YQ7HXelqZP3ait0Q_xuyih-bojgJ9WtMuhl1HsX1q5vetpbcqYbw-d2ZVYp7XUKV1x6bF/pub?gid=0&single=true&output=csv",

    // Link Album Ảnh chung chia sẻ sau lễ
    photoAlbumUrl: "https://photos.google.com/",

    // Thông tin liên hệ
    contact: {
        phone: "0901237941",
    },

    // Google Apps Script URL (Để lưu Google Sheets)
    rsvp: {
        scriptUrl: "https://script.google.com/macros/s/AKfycbzj8L3JsQXm9cYB3VsLHeYXNnoZEfdO1zsxC0M1t8U_EO7TOAlI7EXiRFQSIA3XFmvx/exec" // Dán link Web App URL vào đây sau khi deploy Apps Script
    }
};
