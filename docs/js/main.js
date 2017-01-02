var drawer = document.querySelector('#side-drawer');
var dim = document.querySelector('#dim');
var drawerButton = document.querySelector('#side-drawer-cta');

drawerButton.onclick = function(e) {
  openDrawer();
}
dim.onclick = function(e) {
  closeDrawer();
}

function openDrawer() {
  document.body.classList.add('no-scroll');

  dim.style.display = 'block';
  dim.style.opacity = 0;

  drawer.style.display = 'block';

  var first = drawer.getBoundingClientRect();

  drawer.classList.add('active');

  var last = drawer.getBoundingClientRect(),
      invert = first.left - last.left;

  drawer.style.transform = `translateX(${invert}px)`;

  requestAnimationFrame(function() {

    drawer.classList.add('animate-on-transforms');

    drawer.style.transform = '';

    dim.style.opacity = 1;
  });

  drawer.addEventListener('transitionend',
    function() {
      drawer.style.display = 'block';
      dim.style.display = 'block';
      document.body.classList.add('no-scroll');
    });
}

function closeDrawer() {
  var first = drawer.getBoundingClientRect();

  drawer.classList.remove('active');

  var last = drawer.getBoundingClientRect(),
      invert = first.left - last.left;

  drawer.style.transform = `translateX(${invert}px)`;

  requestAnimationFrame(function() {

    drawer.classList.add('animate-on-transforms');

    drawer.style.transform = '';

    dim.style.opacity = 0;
  });

  drawer.addEventListener('transitionend',
    function() {
      drawer.style.display = 'none';
      dim.style.display = 'none';
      document.body.classList.remove('no-scroll');
    });
}
