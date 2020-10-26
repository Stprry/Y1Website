function openSlideMenu(){
  document.getElementById('side-menu').style.width='200px'; //The side menu width to 250px
  document.getElementById('header-content text-md-center').style.marginLeft='200px';  //Bumps it 200px out
}

function closeSlideMenu(){
  document.getElementById('side-menu').style.width='0px'; //closes the side menu
  document.getElementById('header-content text-md-center').style.marginLeft='0px';  //ment to realign text to center but cant get it atm
}

//Look for every element with class 'moviecard' on the entire document
var movieCards = document.getElementsByClassName('moviecard');

//Loop through all of said cards
for(var i = 0; i < movieCards.length; i++) {
  //Give event listener to each card that triggers when the user moves their mouse over it.
  movieCards[i].addEventListener('mouseover', function () {
    this.querySelector('.movieScore').classList.remove('hidden');
  });

  //Give event listener to each card that triggers when the user moves their mouse out of it.
  movieCards[i].addEventListener('mouseout', function () {
    //Store 'this' as a variable to avoid conflict when in setTimeout ('this' will refer to the timeout, rather than the element)
    var temp = this;
    //Start a timeout that waits 1000ms before removing the class to give it a delay
    setTimeout(function(){
      temp.querySelector('.movieScore').classList.add('hidden');
    }, 1000);

  });
}

document.getElementById("SearchInput").addEventListener("input", function () {
  //Grab user input and convert to lowercase for more friendly searching
  var Userinput = this.value.toLowerCase();

  //Emtpy out search grid
  console.log('Empty search grid');
  var searchGrid = document.getElementById('searchGrid');
  while (searchGrid.firstChild) {
    searchGrid.removeChild(searchGrid.firstChild);
  }

  //Check to see if userinput is a single character or greater (ie. not empty)
  if (Userinput != '') {
    //If it is, hide the default grid view and display the new search grid with only matching cards.
    console.log('Hiding default card view');
    document.getElementsByClassName('movieCardSection')[0].classList.add('hideElement');
    document.getElementById('searchGrid').classList.remove('hideElement');
  } else {
    //Otherwise, show the default section and hide the search grid.
    document.getElementsByClassName('movieCardSection')[0].classList.remove('hideElement');
    document.getElementById('searchGrid').classList.add('hideElement');
  }

  for(var i = 0; i < movieCards.length; i++){
    //Get card attribute 'data-name' and convert to lowercase for more friendly searching
    var attributeName = movieCards[i].getAttribute('data-name').toLowerCase();
    //Create the regex that will be used to compare the attribute value against.
    var stringTest = new RegExp('.*(' + Userinput + ').*', 'g');

    //If element matches regex and isn't empty
    if ( stringTest.test(attributeName) && attributeName != '' ) {
      //Matches the regex for string search
      //clone element (include parent to grab the anchor tags)
      var clone = movieCards[i].parentNode.cloneNode(true);
      //Change the class of the card to not be 'moviecard' lest the curse of infinite loops kill you and your Chrome.
      clone.firstChild.classList.remove('moviecard');
      //Give it another class so it doesn't look like a website from the 1800's
      clone.firstChild.classList.add('searchCard');
      //Add it to the searchGrid. REJOICE
      document.getElementById('searchGrid').appendChild(clone);
    }
  }
});
