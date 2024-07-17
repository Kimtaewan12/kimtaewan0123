// 네비게이션 바 스크롤 제어
let lastScrollTop = 0;
const navbar = document.getElementById("mainNav");
const navbarHeight = navbar.getBoundingClientRect().height;

window.addEventListener("scroll", function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > navbarHeight) {
        // 아래로 스크롤
        navbar.classList.add("navbar-hidden");
    } else {
        // 위로 스크롤
        navbar.classList.remove("navbar-hidden");
    }
    lastScrollTop = scrollTop;
});

// 파티클 애니메이션 설정
particlesJS("particles-js", {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: false },
        size: { value: 3, random: true },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1,
        },
        move: {
            enable: true,
            speed: 6,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
        },
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
            resize: true,
        },
        modes: {
            grab: { distance: 400, line_linked: { opacity: 1 } },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3,
            },
            repulse: { distance: 200, duration: 0.4 },
            push: { particles_nb: 4 },
            remove: { particles_nb: 2 },
        },
    },
    retina_detect: true,
});

// 스크롤 애니메이션
$(window).scroll(function () {
    $(".skill-card").each(function () {
        var pos = $(this).offset().top;
        var winTop = $(window).scrollTop();
        if (pos < winTop + 600) {
            $(this).addClass("animated fadeInUp");
        }
    });
});

// 폼 제출 처리
$("#contact-form").submit(function (e) {
    e.preventDefault();
    alert("메시지가 성공적으로 전송되었습니다!");
    this.reset();
});

// 탑 버튼 기능
window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
    ) {
        document.getElementById("topBtn").style.display = "block";
    } else {
        document.getElementById("topBtn").style.display = "none";
    }
}

document.getElementById("topBtn").onclick = function () {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};

// 프로젝트 아이템 클릭 이벤트
$(".project-item").on("click", function () {
    var targetModal = $(this).data("target");
    $(targetModal).modal("show");
});

// 비디오 모달이 닫힐 때 비디오 정지
$("#videoModal1").on("hidden.bs.modal", function () {
    var iframe = $(this).find("iframe");
    var videoSrc = iframe.attr("src");
    iframe.attr("src", "");
    iframe.attr("src", videoSrc);
});

// 사진 보기 버튼 클릭 이벤트
$(".view-photo").on("click", function (e) {
    e.stopPropagation(); // 이벤트 버블링 방지
    var targetModal = $(this).data("target");
    $(targetModal).modal("show");
});

// 전체 사진 보기 버튼 클릭 이벤트
$(".view-full-image").on("click", function () {
    var imageUrl = $(this).data("image");
    $("#fullImage").attr("src", imageUrl);
    $("#fullImageModal").modal("show");
});

// 전체 사진 모달 클릭 시 닫기
$("#fullImageModal").on("click", function () {
    $(this).modal("hide");
});

document.addEventListener("DOMContentLoaded", () => {
    const cursor = document.getElementById("custom-cursor");
    const trailContainer = document.createElement("div");
    trailContainer.id = "cursor-trail";
    document.body.appendChild(trailContainer);

    let mouseX = 0,
        mouseY = 0;
    let cursorX = 0,
        cursorY = 0;
    let hue = 0;

    function updateCursorPosition(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        createTrailDot(mouseX, mouseY);
    }

    document.addEventListener("mousemove", updateCursorPosition);

    // 모달이 열릴 때 이벤트 리스너 추가
    $(document).on("shown.bs.modal", ".modal", function () {
        $(this).find(".modal-content").on("mousemove", updateCursorPosition);
    });

    // 모달이 닫힐 때 이벤트 리스너 제거
    $(document).on("hidden.bs.modal", ".modal", function () {
        $(this).find(".modal-content").off("mousemove", updateCursorPosition);
    });

    function animateCursor() {
        let dx = mouseX - cursorX;
        let dy = mouseY - cursorY;

        cursorX += dx * 0.2;
        cursorY += dy * 0.2;

        hue = (hue + 1) % 360;
        cursor.style.background = `hsl(${hue}, 100%, 50%)`;
        cursor.style.boxShadow = `0 0 10px hsl(${hue}, 100%, 50%), 0 0 20px hsl(${hue}, 100%, 50%)`;
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;

        requestAnimationFrame(animateCursor);
    }

    function createTrailDot(x, y) {
        const dot = document.createElement("div");
        dot.className = "trail";
        dot.style.left = `${x}px`;
        dot.style.top = `${y}px`;
        trailContainer.appendChild(dot);

        setTimeout(() => {
            dot.style.width = "15px";
            dot.style.height = "15px";
            dot.style.opacity = "0";
        }, 10);

        setTimeout(() => {
            trailContainer.removeChild(dot);
        }, 200);
    }

    animateCursor();

    // 호버 효과
    const interactiveElements = document.querySelectorAll(
        'a, button, input[type="submit"], input[type="button"], .btn',
    );
    interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => {
            cursor.style.transform = "scale(2)";
        });
        el.addEventListener("mouseleave", () => {
            cursor.style.transform = "scale(1)";
        });
    });
});

// 페이드인 효과 함수
function fadeInSection() {
    var sections = document.querySelectorAll(".fade-in-section");

    sections.forEach(function (section) {
        var sectionTop = section.getBoundingClientRect().top;
        var windowHeight = window.innerHeight;

        if (sectionTop < windowHeight * 0.75) {
            section.classList.add("is-visible");
        }
    });
}

// 페이지 로드 시와 스크롤 시 fadeInSection 함수 실행
window.addEventListener("load", fadeInSection);
window.addEventListener("scroll", fadeInSection);
