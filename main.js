document.addEventListener('DOMContentLoaded', function() {
    // Swiper 초기화
    const swiper = new Swiper('.mainSwiper', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        speed: 1000, // 전환 속도
        autoplay: {
            delay: 3000, // 3초마다 자동 전환
            disableOnInteraction: false, // 사용자 상호작용 후에도 자동 재생 유지
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        on: {
            init: function () {
                // 모든 비디오 요소 가져오기
                const videos = document.querySelectorAll('.slide-video');
                videos.forEach(video => {
                    video.play().catch(function(error) {
                        console.log("Video play failed");
                    });
                });
            },
            slideChange: function () {
                // 슬라이드 변경 시 현재 슬라이드의 비디오 재생
                const activeSlide = this.slides[this.activeIndex];
                const video = activeSlide.querySelector('.slide-video');
                if (video) {
                    video.currentTime = 0;
                    video.play().catch(function(error) {
                        console.log("Video play failed");
                    });
                }
            }
        }
    });

    // 네비게이션 버튼 이벤트 리스너 추가
    document.querySelector('.swiper-button-next').addEventListener('click', function() {
        swiper.slideNext();
    });

    document.querySelector('.swiper-button-prev').addEventListener('click', function() {
        swiper.slidePrev();
    });

    // 숫자 카운트 함수
    function countUp(element) {
        const target = parseInt(element.getAttribute('data-value'));
        const duration = 2000; // 2초
        const steps = 60;
        const stepValue = target / steps;
        let current = 0;
        let step = 0;

        const timer = setInterval(() => {
            step++;
            current = Math.round(stepValue * step);
            
            if (current > target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
                return;
            }
            
            element.textContent = current.toLocaleString();
            
            if (step >= steps) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            }
        }, duration / steps);
    }

    // Intersection Observer 설정
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 해당 섹션의 모든 숫자 요소 찾기
                const numbers = entry.target.querySelectorAll('.number');
                numbers.forEach(number => {
                    countUp(number);
                });
                // 한 번 실행 후 관찰 중단
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    // 숫자 섹션 관찰 시작
    const statsSection = document.querySelector('.wab-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }

    // 햄버거 메뉴 토글
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mainNav.classList.toggle('active');
    });

    // 메뉴 링크 클릭시 메뉴 닫기
    const menuLinks = document.querySelectorAll('.main-nav a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mainNav.classList.remove('active');
        });
    });

    // 스크롤 시 메뉴 닫기
    window.addEventListener('scroll', () => {
        if (mainNav.classList.contains('active')) {
            menuToggle.classList.remove('active');
            mainNav.classList.remove('active');
        }
    });
});