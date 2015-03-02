"use strict"

function get_audio(text, voice) {

  var proxy_url = "http://voxygen.fr/sites/all/modules/voxygen_voices/assets/proxy/index.php";

  var soundUrl = proxy_url + "?" + 
    'method=redirect' +
    '&text=' + encodeURIComponent(text) +
    '&voice=' + voice +
    '&ts=' + (new Date()).getTime();

  var audio = document.createElement("audio");
  audio.src = soundUrl;
  audio.preload = "auto";

  return audio;

}

function play_dialog(dialog, blankTime) {
  if(dialog.length == 0)
    return;

  var line = dialog.shift();
  line.addEventListener("ended", play_dialog.bind(null, dialog, blankTime), false);
  line.play();

}

function add_line() {
  var lastLine = document.querySelector('.line:last-child');
  var newLine = lastLine.cloneNode(true);
  newLine.querySelector(".voice").selectedIndex = 22;
  newLine.querySelector(".text").value = "";
  document.querySelector('#lines').appendChild(newLine);
}

document.addEventListener('DOMContentLoaded', function() {

  var playBtn = document.querySelector("#play");
  var blankTimeInput = document.querySelector("#blank_time");
  var addLineBtn = document.querySelector("#add_line");

  addLineBtn.addEventListener("click", function() {
    add_line();
  });

  playBtn.addEventListener("click", function() {
    var lines = document.querySelectorAll(".line");
    var dialog = [].map.call(lines, function(line) {

      var voiceSelect = line.querySelector(".voice");
      var voice = voiceSelect.options[voiceSelect.selectedIndex].text;

      var text = line.querySelector(".text").value;

      return get_audio(text, voice);
    });

    play_dialog(dialog, blankTimeInput.value);

  });
});