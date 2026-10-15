// Carrossel de capturas: deslizar (scroll-snap), setas e miniaturas, com a miniatura ativa destacada.
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.carousel').forEach(function (car) {
    var track = car.querySelector('.car-track');
    var slides = Array.prototype.slice.call(track.querySelectorAll('.slide'));
    var thumbs = Array.prototype.slice.call(car.querySelectorAll('.car-thumbs button'));
    var prev = car.querySelector('.car-prev');
    var next = car.querySelector('.car-next');

    function current() { return Math.round(track.scrollLeft / track.clientWidth); }
    function go(i) {
      i = Math.max(0, Math.min(slides.length - 1, i));
      track.scrollTo({ left: i * track.clientWidth, behavior: 'smooth' });
    }
    function mark() {
      var i = current();
      thumbs.forEach(function (t, k) { t.setAttribute('aria-current', String(k === i)); });
      prev.disabled = i === 0;
      next.disabled = i === slides.length - 1;
      var active = thumbs[i];
      if (active) {
        var row = active.parentElement;
        row.scrollTo({ left: active.offsetLeft - (row.clientWidth - active.clientWidth) / 2, behavior: 'smooth' });
      }
    }

    prev.addEventListener('click', function () { go(current() - 1); });
    next.addEventListener('click', function () { go(current() + 1); });
    thumbs.forEach(function (t, k) { t.addEventListener('click', function () { go(k); }); });
    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(current() + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(current() - 1); }
    });
    var t;
    track.addEventListener('scroll', function () { clearTimeout(t); t = setTimeout(mark, 60); });
    mark();
  });
});
