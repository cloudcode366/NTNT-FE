// Hiệu ứng pop-up khi click

function showPopup(index) {
    const popup = document.getElementById('popup');
    const popupTitle = document.getElementById('popup-title');
    const popupContent = document.getElementById('popup-content');

    // Nội dung cho từng phần tử
    const titles = [
        "Vào lớp",
        "Tiết 1: Âm sắc cổ",
        "Tiết 2: Âm sắc giao",
        "Tiết 3: Lớp học Dự giờ",
        "Tiết 4: Trải nghiệm Thực tế",
        "Tiết 5: Giờ Thực hành",
        "Tan học"
    ];

    const contents = [
        "Hãy trải nghiệm đầy đủ các hoạt động để tích góp được 5 điểm 10 trong lớp học này nhé",
        "Hoạt động Trải nghiệm Nhạc cụ Truyền thống: Người tham gia được \"nhập môn\" làm học trò của Lão Tre, trực tiếp chạm vào di sản âm nhạc dân tộc, lắng nghe và cảm nhận sự tinh tế trong âm hưởng độc đáo của văn hóa Việt.",
        "Hoạt động Trải nghiệm và Bình chọn các loại Beat Giao thoa: Nơi học viên được trực tiếp nghe và bình chọn bản phối kết hợp giữa nhạc cụ truyền thống và nhạc điện tử hiện đại, qua đó khám phá và hiểu hơn về phong cách âm nhạc mang đậm dấu ấn giao thoa.",
        " Talkshow “Tre Truyền Trẻ”: Buổi dự giờ đặc biệt, là dịp để học viên được lắng nghe và khám phá tiềm năng bản thân, gợi mở tư duy về bảo tồn văn hóa thông qua hình thức giao thoa, với sự đồng hành của các Diễn giả: Tiến sĩ Nguyễn Thị Quốc Minh - Giảng viên Khoa Văn học trường Đại học Khoa học Xã hội và Nhân văn, ĐHQG TPHCM; Cô Phạm Thị Kim Long - Giảng viên Bộ môn Nhạc cụ dân tộc trường Đại học FPT; Rapper Rtee và Producer Hổ.",
        "Hoạt động Thị phạm Sản xuất âm nhạc: Học viên được trực tiếp chứng kiến quá trình sáng tạo âm nhạc, từ lúc lên ý tưởng đến khi hoàn thiện, qua phần thị phạm từ các chuyên gia.",
        "Trải nghiệm Đọc rap & Gieo vần từ Ca dao tục ngữ: Giờ thực hành đầy cảm hứng, nơi học viên tự tin thử sức với Rap kết hợp ca dao, tục ngữ, thể hiện sự giao thoa độc đáo giữa chất liệu dân gian và phong cách hiện đại.",
        "Chúc mừng!Bạn đã nhận được 5 điểm 10, xuất xắc hoàn thành buổi học ngày hôm nay"
    ];

    // Thay đổi nội dung của pop-up
    popupTitle.textContent = titles[index];
    popupContent.textContent = contents[index];

    popup.classList.remove('inactive');
    popup.classList.add('active');

    // Di chuyển phần tử chuyển động đến vị trí của phần tử được click
    moveElementTo(index);
}

function moveElementTo(index) {
    const element = document.querySelector(`.event-item.event-${index}`);
    const movingElement = document.getElementById('moving-element');

    const rect = element.getBoundingClientRect();
    const containerRect = document.querySelector('.container').getBoundingClientRect();
    var top;
    // Chỉ điều chỉnh vị trí theo trục Y
    if(index === 1) {
        top = 250;
    }
    else if(index == 2){
        top = 600;

    }
    else if(index == 3){
        top = 1000;
    }
    else if(index == 4){
        top = 1500;
    }
    else if(index == 5){
        top = 2000;
    }
    else if(index == 6){
        top = 2300;
    }
    movingElement.style.transform = `translateY(${top}%)`;
}


function closePopup() {
    const popup = document.getElementById('popup');
    popup.classList.remove('active');
    popup.classList.add('inactive');
    setTimeout(() => {
        popup.classList.remove('inactive');
    }, 500);
}

// Tính toán và điều chỉnh chiều cao của .scroll-placeholder dựa trên tỷ lệ ảnh 1080x4000
window.onload = function() {
    function updatePlaceholderHeight() {
        // Lấy chiều rộng của viewport
        const viewportWidth = window.innerWidth;
        // Tỷ lệ chiều cao/chiều rộng của ảnh (4000/1080)
        const aspectRatio = 4000 / 1080; // Tỷ lệ chiều cao trên chiều rộng (đã chỉnh theo yêu cầu của bạn)
        // Tính chiều cao dựa trên chiều rộng viewport và tỷ lệ ảnh
        const calculatedHeight = viewportWidth * aspectRatio;

        // Đặt chiều cao của .scroll-placeholder
        const placeholder = document.querySelector('.scroll-placeholder');
        placeholder.style.height = `${calculatedHeight}px`;
    }

    // Gọi hàm khi trang tải
    updatePlaceholderHeight();

    // Cập nhật chiều cao khi resize window
    window.addEventListener('resize', updatePlaceholderHeight);
};