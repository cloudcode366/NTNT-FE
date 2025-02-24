// Hiệu ứng pop-up khi click

function showPopup(index) {
    const popup = document.getElementById('popup');
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

    const top = rect.top - containerRect.top;
    const left = rect.left - containerRect.left;

    movingElement.style.transform = `translate(${left}px, ${top}px)`;
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
        const aspectRatio = 3500 / 1080; // Tỷ lệ chiều cao trên chiều rộng (đã chỉnh theo yêu cầu của bạn)
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