/* main.js - navegación ligera, accent color application, transitions */
document.addEventListener('DOMContentLoaded', function(){
  // Apply accent colors based on data-color attributes
  document.querySelectorAll('.item, .preview-card').forEach(function(el){
    const color = el.dataset.color || el.getAttribute('data-accent');
    if(!color) return;
    // set title accent
    const title = el.querySelector('.accent') || el.querySelector('h3');
    if(title) title.style.color = color;
    // create subtle border glow
    el.style.boxShadow = '0 12px 30px ' + hexToRgba(color,0.12);
    el.addEventListener('mouseenter', function(){
      el.style.transform = 'translateY(-6px)';
      el.style.transition = 'transform 280ms cubic-bezier(.2,.9,.2,1)';
    });
    el.addEventListener('mouseleave', function(){
      el.style.transform = '';
    });
  });

  // Smooth single-page-like navigation when links have data-link
  document.querySelectorAll('a[data-link]').forEach(function(a){
    a.addEventListener('click', function(e){
      // default navigation allowed (files), but add small animation
      // no interception to keep behavior simple and compatible with static hosting
      document.body.classList.remove('fade-in');
      setTimeout(function(){ document.body.classList.add('fade-in'); }, 10);
    });
  });

  // Helper: convert hex to rgba
  function hexToRgba(hex, alpha){
    hex = hex.replace('#','');
    if(hex.length===3) hex = hex.split('').map(ch => ch+ch).join('');
    const bigint = parseInt(hex,16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return 'rgba('+r+','+g+','+b+','+alpha+')';
  }

  // Accessibility: make images focusable and keyboard-friendly
  document.querySelectorAll('img').forEach(img => {
    img.setAttribute('tabindex', '0');
  });

  // Lazy-load polyfill hint: use loading="lazy" in img tags (already present)
});
