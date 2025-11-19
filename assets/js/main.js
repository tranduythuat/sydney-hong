if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
// Kích hoạt ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Gọi các hiệu ứng có sẵn
document.addEventListener("DOMContentLoaded", () => {
  window.scrollTo(0, 0); 
  gsapFlipIn(".animate-flip");
  gsapFadeIn(".fade-in");
  gsapFadeRight(".fade-right");
  gsapFadeLeft(".fade-left");
  gsapFadeUp(".fade-up");
  gsapFadeDown(".fade-down");
  gsapRotateBottomLeft(".rotate-bl");
  gsapRotateBottomRight(".rotate-br");
  gsapFlipVerticalLeft(".flip-vertical-left");
  gsapRollInLeft(".roll-in-left");
  gsap_rotate_bl__float(".rotate-bl--float");

  // Tạo timeline
  const tl_custom = gsap.timeline({
    repeatDelay: 0,  // delay giữa các lần lặp
    defaults: { duration: .8, ease: "power2.out" }, // giá trị mặc định
    scrollTrigger: {
      trigger: ".timeline-items",
      start: "top 90%", // khi phần tử xuất hiện 80% trong viewport
    }
  });

  // Thêm các animation theo thứ tự
  tl_custom.from(".tl-item-1", { x: -100, opacity: 0 })        // box đỏ bay xuống
    .from(".tl-item-2", { x: -100, opacity: 0 }, "-=0.3")       // box xanh bay từ trái
    .from(".tl-item-3", { x: -100, opacity: 0 }, "-=0.3");    // box xanh lá phóng to dần

  const tl_dresscode = gsap.timeline({
    repeatDelay: 0,  // delay giữa các lần lặp
    defaults: { duration: .8, ease: "power2.out" }, // giá trị mặc định
    scrollTrigger: {
      trigger: ".color-palette",
      start: "top 90%", // khi phần tử xuất hiện 80% trong viewport
    }
  });

  // Thêm các animation theo thứ tự
  tl_dresscode.from(".white", { x: -100, opacity: 0 })        // box đỏ bay xuống
    .from(".off-white", { x: -100, opacity: 0 }, "-=0.3")       // box xanh bay từ trái
    .from(".cream-linen", { x: -100, opacity: 0 }, "-=0.3");    // box xanh lá phóng to dần


  const envelope = document.getElementById('envelope');
  const page1 = document.getElementById('page1');
  const page2 = document.getElementById('page2');

  // Animation mở thư
  envelope.addEventListener('click', function () {
    const tl = gsap.timeline({
      onComplete: () => {
        page1.classList.add('hidden');
        page2.classList.add('show');

        // Fade in page 2
        gsap.to('#page2', {
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          onComplete: () => {
            playMusic();
            document.body.style.overflow = "auto";
            // Nếu dùng ScrollTrigger → refresh lại
            ScrollTrigger.refresh();
          }
        });
        // Khởi tạo ScrollTrigger animations
        initScrollAnimations();
      }
    });

    // Animation mở envelope
    tl.to('.envelope-flap', {
      y: -120,
      transformOrigin: 'top center',
      duration: 1.5,
      ease: 'power2.inOut'
    })
      .to('.envelope', {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in'
      }, '+=0.3')
      .to('#page1', {
        opacity: 0,
        duration: 0.3
      });
  });

  function initScrollAnimations() {
    // const sections = document.querySelectorAll('.scroll-section');

    gsap.utils.toArray('.scroll-section').forEach(() => {
      gsapFlipIn(".animate-flip");
      gsapFadeIn(".animate-fade");
      gsapFadeRight(".fade-right");
      gsapFadeLeft(".fade-left");
      gsapFadeUp(".fade-up");
      gsapFadeDown(".fade-down");
      gsapRotateBottomLeft(".rotate-bl");
      gsapRotateBottomRight(".rotate-br");
      gsapFlipVerticalLeft(".flip-vertical-left");
      gsapRollInLeft(".roll-in-left");
      gsap_rotate_bl__float(".rotate-bl--float");
    });

    // sections.forEach((section, index) => {
    // });
  }

  async function playMusic(e) {
    const music = document.getElementById('audio');
    if (!music.src) {
        alert('Chưa có nhạc, vui lòng thêm src cho audio.');
        return;
    }
    if (music.paused) {
      music.play();
    } 
    music.addEventListener('play', () => {
        iconSvg.classList.add('spin');
    });
  }

  async function toggleMusic(e) {
    const audio = document.getElementById('audio');
    const iconSvg = document.getElementById('iconSvg');
    if (!audio.src) {
        alert('Chưa có nhạc, vui lòng thêm src cho audio.');
        return;
    }
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }

    audio.addEventListener('play', () => {
        iconSvg.classList.add('spin');
    });
    audio.addEventListener('pause', () => {
        iconSvg.classList.remove('spin');
    });
  }
  const btn = document.getElementById('player-btn');
  btn.addEventListener('click', toggleMusic);
});
