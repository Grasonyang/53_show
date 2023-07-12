$(document).on('click', 'a', function (e) {
  e.preventDefault();
  let xhr = new XMLHttpRequest;
  xhr.onreadystatechange = function () {
    if (xhr.status == 200 && xhr.readyState == 4) {
      document.body.innerHTML = xhr.responseText;
    }
  };
  xhr.open('GET', $(this).attr('href'), true);
  xhr.send();

});