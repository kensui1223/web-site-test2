// ===== Intersection Observer: fade-in =====
const sections = document.querySelectorAll("section, .product-card");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active", "visible");
    }
  });
}, { threshold: 0.3 });
sections.forEach((sec) => observer.observe(sec));

// ===== Parallax Mouse Effect =====
const mouseLayers = document.querySelectorAll(".mouse-layer");
window.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;
  mouseLayers.forEach(layer => {
    const depth = layer.dataset.depth || 0.1;
    const moveX = x * depth * 40;
    const moveY = y * depth * 40;
    layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
  });
});
