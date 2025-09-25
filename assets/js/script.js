// 결혼식 날짜를 달력에 표시하는 함수
function showWeddingDateOnCalendar() {
    const weddingDate = new Date('2025-09-25');
    const calendarContainer = document.getElementById('calendar');

    // 간단한 달력 UI 생성 (실제 달력 라이브러리 사용 시 변경 필요)
    const year = weddingDate.getFullYear();
    const month = weddingDate.getMonth() + 1; // getMonth()는 0부터 시작
    const day = weddingDate.getDate();

    const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
    
    calendarContainer.innerHTML = `
        <p class="calendar-header">${year}년 ${monthNames[month - 1]}</p>
        <p class="calendar-day">${day}</p>
    `;

    // 해당 날짜를 강조하는 CSS 클래스 추가
    const weddingDayElement = document.querySelector('.calendar-day');
    if (weddingDayElement) {
        weddingDayElement.style.fontWeight = 'bold';
        weddingDayElement.style.fontSize = '2em';
        weddingDayElement.style.color = 'red';
    }
}

// 갤러리 모달 기능
let currentImageIndex = 0;
const galleryImages = [
    'assets/images/img01.jpg',
    'assets/images/img02.jpg',
    'assets/images/img03.jpg',
    'assets/images/img04.jpg',
    'assets/images/img05.jpg',
    'assets/images/img06.jpg',
    'assets/images/img07.jpg',
    'assets/images/img08.jpg',
    'assets/images/img09.jpg'
];

function openModal(index) {
    const modal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('modalImage');
    
    currentImageIndex = index;
    modalImage.src = galleryImages[currentImageIndex];
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('galleryModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    document.getElementById('modalImage').src = galleryImages[currentImageIndex];
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    document.getElementById('modalImage').src = galleryImages[currentImageIndex];
}

// 페이지 로드 시 함수 실행
document.addEventListener('DOMContentLoaded', () => {
    showWeddingDateOnCalendar();
    
    // 갤러리 이미지 클릭 이벤트
    const galleryImages = document.querySelectorAll('.gallery-img');
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => openModal(index));
    });
    
    // 모달 닫기 이벤트
    const modal = document.getElementById('galleryModal');
    const closeBtn = document.querySelector('.close');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    
    closeBtn.addEventListener('click', closeModal);
    nextBtn.addEventListener('click', showNextImage);
    prevBtn.addEventListener('click', showPrevImage);
    
    // 모달 배경 클릭 시 닫기
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // 키보드 이벤트
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'block') {
            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            }
        }
    });
    
    // RSVP 폼 처리
    const rsvpForm = document.getElementById('rsvpForm');
    const rsvpSuccess = document.getElementById('rsvpSuccess');
    
    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(rsvpForm);
        const data = {
            name: formData.get('guestName'),
            count: formData.get('guestCount'),
            attendance: formData.get('attendance'),
            message: formData.get('message')
        };
        
        // 실제 서버로 전송하는 대신 로컬 스토리지에 저장
        const rsvpData = JSON.parse(localStorage.getItem('rsvpData') || '[]');
        rsvpData.push({
            ...data,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('rsvpData', JSON.stringify(rsvpData));
        
        // 성공 메시지 표시
        rsvpForm.style.display = 'none';
        rsvpSuccess.style.display = 'block';
        
        // 폼 초기화
        rsvpForm.reset();
    });
    
    // 스크롤 애니메이션
    function handleScrollAnimation() {
        const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }
    
    // 스크롤 이벤트 리스너
    window.addEventListener('scroll', handleScrollAnimation);
    
    // 초기 로드 시 애니메이션 체크
    handleScrollAnimation();
    
    // 이미지 지연 로딩 처리
    function handleLazyLoading() {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        lazyImages.forEach(img => {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
            
            // 이미 로드된 이미지는 즉시 표시
            if (img.complete) {
                img.classList.add('loaded');
            }
        });
    }
    
    // 지연 로딩 초기화
    handleLazyLoading();
    
    // 벚꽃 애니메이션 성능 최적화
    function optimizeSakuraAnimation() {
        const canvas = document.getElementById('sakuraCanvas');
        if (canvas) {
            // GPU 가속 활성화
            canvas.style.transform = 'translateZ(0)';
            canvas.style.backfaceVisibility = 'hidden';
        }
    }
    
    optimizeSakuraAnimation();
});