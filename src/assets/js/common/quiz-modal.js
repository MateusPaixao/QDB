//export default function modal() {
  var modal = document.getElementById("modal-quiz");
  var btn = document.getElementById("modal-quiz-btn");
  
  var span = document.getElementsByClassName("close")[0];
  btn.onclick = function() {
    modal.style.display = "block";
  }
  span.onclick = function() {
    modal.style.display = "none";
  }
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  } 
  
//}