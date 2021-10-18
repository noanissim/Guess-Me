'use strict';

// NOTE: This is a global used only in the controller
var gLastRes = null;

$(document).ready(init);
$('.btn-start').click(onStartGuessing); //calls the function 
$('.btn-yes').click({
  ans: 'yes'
}, onUserResponse); //calls the function with data of yes
$('.btn-no').click({
  ans: 'no'
}, onUserResponse); //calls the function with data of no
$('.btn-add-guess').click(onAddGuess); //calls the function of adding guess

function init() {
  console.log('Started...');
  createQuestsTree();
}

function onStartGuessing() {
  // hide the game-start section
  $('.game-start').hide()
  renderQuest();
  // show the quest section
  $('.quest').show()
}

function renderQuest() {
  //select the <h2> inside quest and update its text by the currQuest text
  $('.quest h2').text(getCurrQuest().txt)
  // if(isChildless(getCurrQuest().no))
}

function openModal() {

}

function onUserResponse(ev) {
  var res = ev.data.ans;
  console.log(res);
  // If this node has no children-final answers
  if (isChildless(getCurrQuest())) {
    $('.img-container').show()
    if (res === 'yes') {
      var $img = $('.quest img')
      $img.attr("src", `img/people/${getCurrQuest().txt}.jpg`)
      console.log(getCurrQuest().txt);
      console.log($img);
      $img.show()
      $('.btn-restart').click()
      $('.btn-close-modal').click(function () {
        console.log("click")
        onRestartGame()
      })
      // $('.quest img').attr("src", `img/people/${gCurrQuest.txt}.jpg`).on('load', function () {
      //   alert('Yes, I knew it!');
      //   onRestartGame()
      //   $('.quest img').attr('src', '')
      //   $('.quest img').hide()
      // })

    } else {
      alert('I dont know...teach me!');
      //hide and show new-quest section
      $('.new-quest').show()
      $('.quest').hide()
      console.log('gLastRes', gLastRes);


    }
  } else {
    // update the lastRes global var
    gLastRes = res
    moveToNextQuest(gLastRes);
    renderQuest();
  }
}

function onAddGuess(ev) {
  ev.preventDefault();
  var newGuess = $('#newGuess').val();
  var newQuest = $('#newQuest').val();
  console.log(newGuess);
  console.log(newQuest);
  //Get the inputs' values
  console.log('gCurrQuest', gCurrQuest);
  console.log('gPrevQuest', gPrevQuest);
  //Call the service addGuess
  addGuess(newQuest, newGuess, gLastRes)
  onRestartGame();
}

function onRestartGame() {
  $('.new-quest').hide();
  $('.game-start').show();
  $('.quest').hide()
  $('#newGuess').val('')
  $('#newQuest').val('')
  gLastRes = null;
  var $img = $('.quest img')
  $img.attr("src", ``)
  $img.hide()
  init()

}