// for performanace issue -- run checkSlide every 20 milliseconds instead of 50+
function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if(!immediate) func.apply(context, args);
    }
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if(callNow) func.apply(context, args);
  }
}

const images = document.querySelectorAll('.slide_in');

function checkSlide(e) {
  images.forEach(img => {
    // in pixels, innnerHeight = visible part
    // are we half way through the image ?
    const slideInAt = (window.scrollY + window.innerHeight) -
    img.height / 2;
    // where is the bottom of the image?
    const imgBottom = img.offsetTop + img.height;
    const isHalfShown = slideInAt > img.offsetTop;
    const isNotScrolledPast = window.scrollY < imgBottom;
    if(isHalfShown && isNotScrolledPast) {
      img.classList.add('active');
    } else {
      img.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', debounce(checkSlide));
