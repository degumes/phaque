window.onload = function () {
  document.getElementById('clickfullscreen').onclick = e => {
    e.srcElement.parentElement.style.display = 'none'
    document.body.webkitRequestFullScreen()
    window.onresize()
    window.requestAnimationFrame(gl)
  }
}
