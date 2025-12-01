// ハンバーガーメニュー
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// カートアニメーション
const cartIcon = document.getElementById('cart-icon');
const addCartButtons = document.querySelectorAll('.add-cart');

addCartButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const productCard = e.target.closest('.card');
    const productImg = productCard.querySelector('img');

    const flyingImg = productImg.cloneNode(true);
    const imgRect = productImg.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    flyingImg.style.position = 'fixed';
    flyingImg.style.top = imgRect.top + 'px';
    flyingImg.style.left = imgRect.left + 'px';
    flyingImg.style.width = imgRect.width + 'px';
    flyingImg.style.height = imgRect.height + 'px';
    flyingImg.style.transition = 'all 0.8s ease-in-out';
    flyingImg.style.zIndex = 10000;
    flyingImg.style.borderRadius = '12px';

    document.body.appendChild(flyingImg);

    requestAnimationFrame(() => {
      flyingImg.style.top = cartRect.top + 'px';
      flyingImg.style.left = cartRect.left + 'px';
      flyingImg.style.width = '30px';
      flyingImg.style.height = '30px';
      flyingImg.style.opacity = '0.5';
    });

    flyingImg.addEventListener('transitionend', () => {
      flyingImg.remove();
    });
  });
});

// スクロールアニメーション
const animatedElements = document.querySelectorAll('.fade-in, .slide-left, .slide-right, .zoom-in');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('in-view');
    }
  });
}, {
  threshold: 0.2
});

animatedElements.forEach(el => observer.observe(el));

// パララックス効果
const parallaxElems = document.querySelectorAll('.parallax-img');

// 各要素の初期位置を記録
parallaxElems.forEach(el => {
  el.dataset.offsetTop = el.offsetTop;
});

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset;

  parallaxElems.forEach(el => {
    let speed = 0.2; // デフォルト速度

    // 利用シーンの画像は少しだけ動かす
    if(el.closest('#scene')) {
      speed = 0.05;
    }

    // 基準位置からの差分だけ動かす
    const offset = scrollTop - el.dataset.offsetTop;
    el.querySelector('img').style.transform = `translateY(${offset * speed}px)`;
  });
});
