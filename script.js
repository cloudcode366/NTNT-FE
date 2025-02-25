// Hiệu ứng pop-up khi click

// Kiểm tra cookie khi tải trang
var state;
window.onload = function () {
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

    // Kiểm tra cookie và tạo người dùng nếu cần
    checkAndCreateUser();
};


function checkStatus() {
    const userId = getCookie('userId');
    if (userId) {
        fetch('https://ntnt-be.onrender.com/api/v1/state/get/state/1', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                // Lưu trạng thái vào localStorage
                localStorage.setItem('status', data);
            })
            .catch(error => console.error('Error:', error));
    }
}


function checkAndCreateUser() {
    const userId = getCookie('userId');
    if (!userId) {
        // Gọi API để tạo người dùng
        fetch('https://ntnt-be.onrender.com/api/v1/user/create/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                // Lưu ID vào cookie
                setCookie('userId', data, 365);
                console.log(data);
            })
            .catch(error => console.error('Error:', error));
    }
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${d.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
}
var point = 0;
function showPopup(index) {
    checkStatus();
    const popup = document.getElementById('popup');
    const popupTitle = document.getElementById('popup-title');
    const popupContent = document.getElementById('popup-content');

    const userId1 = getCookie('userId');
    console.log(userId1);
    var point1 = 0;
    if (userId1) {
        fetch('https://ntnt-be.onrender.com/api/v1/user/get/point/' + userId1, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify({ userId: userId, eventIndex: index })
        })
            .then(response => response.json())
            .then(data => {
                // console.log('Point added:', data);
                point = data;
                console.log(point1);
            })
            .catch(error => console.error('Error:', error));
    }
    // Nội dung cho từng phần tử
    const status = localStorage.getItem('status');
    if (status !== '1' && [3, 4, 5, 6].includes(index)) {
        popupTitle.textContent = "Không hợp lệ";
        popupContent.textContent = "Bạn chưa thể truy cập nội dung này ngay lúc này. Vui lòng quay lại lúc 19h.";
    }
    else {
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
        popupTitle.textContent = titles[index] + " -Bạn đang có:" + point + " điểm";
        popupContent.textContent = contents[index];
        moveElementTo(index);

        const userId = getCookie('userId');
        if (userId) {
            fetch('https://ntnt-be.onrender.com/api/v1/user/set/point/' + userId + '/' + index, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                // body: JSON.stringify({ userId: userId, eventIndex: index })
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Point added:', data);
                })
                .catch(error => console.error('Error:', error));
        }
    }
    popup.classList.remove('inactive');
    popup.classList.add('active');

    // Di chuyển phần tử chuyển động đến vị trí của phần tử được click

}

function moveElementTo(index) {
    const element = document.querySelector(`.event-item.event-${index}`);
    const movingElement = document.getElementById('moving-element');

    const rect = element.getBoundingClientRect();
    const containerRect = document.querySelector('.container').getBoundingClientRect();
    var top;
    // Chỉ điều chỉnh vị trí theo trục Y
    if (index === 1) {
        top = 250;
    }
    else if (index == 2) {
        top = 450;

    }
    else if (index == 3) {
        top = 650;
    }
    else if (index == 4) {
        top = 900;
    }
    else if (index == 5) {
        top = 1200;
    }
    else if (index == 6) {
        top = 1500;
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
// window.onload = function() {
//     function updatePlaceholderHeight() {
//         // Lấy chiều rộng của viewport
//         const viewportWidth = window.innerWidth;
//         // Tỷ lệ chiều cao/chiều rộng của ảnh (4000/1080)
//         const aspectRatio = 4000 / 1080; // Tỷ lệ chiều cao trên chiều rộng (đã chỉnh theo yêu cầu của bạn)
//         // Tính chiều cao dựa trên chiều rộng viewport và tỷ lệ ảnh
//         const calculatedHeight = viewportWidth * aspectRatio;

//         // Đặt chiều cao của .scroll-placeholder
//         const placeholder = document.querySelector('.scroll-placeholder');
//         placeholder.style.height = `${calculatedHeight}px`;
//     }

//     // Gọi hàm khi trang tải
//     updatePlaceholderHeight();

//     // Cập nhật chiều cao khi resize window
//     window.addEventListener('resize', updatePlaceholderHeight);
// };