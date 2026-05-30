let el;

document.addEventListener('DOMContentLoaded', function() {
    el = document.getElementById('root');
});

setTimeout(function() {
    app();
}, 2000);

function app() {
    el.innerHTML = '<header><video src="https://murcodaorg.github.io/cdn/logo.mp4" class="logo" autoplay muted></video><h1><span class="murcoda-m">M</span><span class="murcoda-u">u</span><span class="murcoda-r">r</span><span class="murcoda-c">C</span><span class="murcoda-o">o</span><span class="murcoda-d">d</span><span class="murcoda-a">a</span></h1></header>';
}