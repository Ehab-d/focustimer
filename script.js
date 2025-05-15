document.addEventListener('DOMContentLoaded', function() {
  // Header scroll effect
  const header = document.querySelector('header');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.style.background = 'rgba(24, 31, 37, 0.95)';
      header.style.padding = '10px 0';
      header.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
    } else {
      header.style.background = 'rgba(30, 39, 46, 0.9)';
      header.style.padding = '15px 0';
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Simple testimonial slider
  const testimonials = document.querySelectorAll('.testimonial');
  let currentTestimonial = 0;
  
  // Only initialize if there are multiple testimonials
  if (testimonials.length > 1) {
    // Initially hide all except the first one on smaller screens
    if (window.innerWidth < 992) {
      testimonials.forEach((testimonial, index) => {
        if (index !== 0) {
          testimonial.style.display = 'none';
        }
      });

      // Set up auto rotation
      setInterval(() => {
        testimonials[currentTestimonial].style.display = 'none';
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        testimonials[currentTestimonial].style.display = 'block';
      }, 5000);
    }
  }

  // Animated features on scroll
  const featureCards = document.querySelectorAll('.feature-card');
  
  // Simple animation when features come into view
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
      rect.bottom >= 0
    );
  }
  
  function animateOnScroll() {
    featureCards.forEach(card => {
      if (isInViewport(card) && !card.classList.contains('animated')) {
        card.classList.add('animated');
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }
    });
  }
  
  // Initialize the feature cards
  featureCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  
  // Add scroll event
  window.addEventListener('scroll', animateOnScroll);
  
  // Initial check
  animateOnScroll();
});
