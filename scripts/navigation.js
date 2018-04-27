var nav = document.getElementById('header-navigation')

if (window.matchMedia("(min-width: 768px)").matches) {
  skrollr.init()
} else {
  console.log("screen width is less than 768px. This is where I am going to output the styles for the hamburger navigation")
  nav.setAttribute('style', 'display:none;');
}