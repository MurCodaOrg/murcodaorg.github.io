document.getElementById('content').style.display = 'none';
document.getElementById('loading').style.display = 'block';
setTimeout(function() {
  document.getElementById('content').style.display = 'block';
  document.getElementById('loading').style.display = 'none';
}, 4000);
