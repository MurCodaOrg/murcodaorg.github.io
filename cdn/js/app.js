let el;

document.addEventListener('DOMContentLoaded', function() {
    el = document.getElementById('root');
});

setTimeout(function() {
    app();
}, 2000);

function app() {
    el.innerHTML = '<header><video class="logo" src="/cdn/logo.mp4" autoplay muted></video><div class="murcoda-title"><h1 class="murcoda-m">M</h1><h1 class="murcoda-u">u</h1><h1 class="murcoda-r">r</h1><h1 class="murcoda-c">C</h1><h1 class="murcoda-o">o</h1><h1 class="murcoda-d">d</h1><h1 class="murcoda-a">a</h1></div></header>';
}