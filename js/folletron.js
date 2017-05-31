var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;

recognition.onstart = function() { }
recognition.onerror = function(event) {  }
recognition.onend = function() {  }


var final_transcript = '';
function startRecognition() {
    final_transcript = '';
    recognition.lang = 'es-ES';
    recognition.continuous = false;
    recognition.start();
}

recognition.onresult = function(event) { 
    var interim_transcript = '';

    for (var i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
    final_transcript = final_transcript;
    if(final_transcript) alert(final_transcript);
 }



$(function() {
    $("#start").click(startRecognition);
})