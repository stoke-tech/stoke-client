export default defineNuxtPlugin(() => {
  return {
    provide: {
      scrollToElement: (elementId) => {
        const targetElement = document.querySelector(elementId);
      
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth',
          });
        }
      }
    }
  }
})
