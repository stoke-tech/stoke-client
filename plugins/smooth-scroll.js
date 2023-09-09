export default defineNuxtPlugin(() => {
  return {
    provide: {
      scrollToElement: (elementId) => {
        console.log('asdfasdf')
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

/*


scrollToElement: (elementId) => {
        console.log('asdfasdf')
        const targetElement = document.querySelector(elementId);
      
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop,
            behavior: 'smooth',
          });
        }
      }



*/