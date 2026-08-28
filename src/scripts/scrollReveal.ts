/**
 * Reveals any [data-fade] element as it enters the viewport.
 * Falls back gracefully: if IntersectionObserver is unsupported,
 * elements simply stay visible (CSS default is opacity:1 until this
 * script explicitly hides them), so there's no risk of stranding
 * content in a hidden state.
 */
export function initScrollReveal(): void {
  if (!('IntersectionObserver' in window)) return;

  const items = document.querySelectorAll<HTMLElement>('.fade');
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15 }
  );

  items.forEach((item) => observer.observe(item));
}
