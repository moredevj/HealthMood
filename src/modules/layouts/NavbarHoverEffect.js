export function initializeNavHoverEffect() {
  const navLinks = document.querySelectorAll('.nav-link-custom');

  navLinks.forEach(link => {
    let lastMouseX = 0;
    
    link.addEventListener('mouseenter', (e) => {
      lastMouseX = e.clientX;
      const rect = link.getBoundingClientRect();
      const linkCenterX = rect.left + (rect.width / 2);
      
      // Determinar si el mouse entró desde la izquierda o la derecha
      if (e.clientX < linkCenterX) {
        link.setAttribute('data-direction', 'left');
      } else {
        link.setAttribute('data-direction', 'right');
      }
    });

    link.addEventListener('mousemove', (e) => {
      const currentX = e.clientX;
      const rect = link.getBoundingClientRect();
      const linkCenterX = rect.left + (rect.width / 2);
      
      if (currentX < linkCenterX && lastMouseX >= linkCenterX) {
        link.setAttribute('data-direction', 'left');
      } else if (currentX >= linkCenterX && lastMouseX < linkCenterX) {
        link.setAttribute('data-direction', 'right');
      }
      
      lastMouseX = currentX;
    });

    link.addEventListener('mouseleave', () => {
      link.removeAttribute('data-direction');
    });
  });
}
