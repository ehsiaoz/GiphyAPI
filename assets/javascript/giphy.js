$(document).ready();


//Objectives

var searchTermArray = ['Elephants', 'Monkeys', 'Lions', 'Tigers', 'Polar Bears'];



//Functions==================

function renderButtons(){ 

		// Deletes the movies prior to adding new movies (this is necessary otherwise you will have repeat buttons)
		$('#buttons-view').empty();

		// Loops through the array of movies
		for (var i = 0; i < searchTermArray.length; i++){

			// Then dynamicaly generates buttons for each movie in the array

			// Note the jQUery syntax here... 
		    var a = $('<button>') // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
		    a.addClass('searchTerm'); // Added a class 
		    a.attr('data-name', searchTermArray[i]); // Added a data-attribute
		    a.text(searchTermArray[i]); // Provided the initial button text
		    $('#buttons-view').append(a); // Added the button to the HTML
		}
	}



// Generic function for dumping the JSON content for each button into the div
	function displayGif(){

		var searchTerm = $(this).attr('data-name'); //button.name
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=dc6zaTOxFJmzC&limit=10";

		//Write code between the dashes below to hit the queryURL, take the data and display it in the div with an id of moviesView
		$('#gallery').empty();	
		//------YOUR CODE GOES IN THESE DASHES
		$.ajax({
				url: queryURL, 
				method: 'GET'
			})
			.done(function(response) {
			var results = response.data;

			for (var i = 0; i < results.length; i++) {

				var gifDiv = $('<div class="item">')
				var rating = results[i].rating;
				var p = $('<p>').text("Rating: " + rating);
				var image = $('<img>');
				image.attr('src', results[i].images.fixed_height.url);

				gifDiv.append(p)
				gifDiv.append(image)

				$('#gallery').prepend(gifDiv)
			}
		});
		//------
	}


//Buttons============================================

$(document).on('click', '.searchTerm', displayGif);


$('#submitTerm').on('click', function(){

		// This line of code will grab the input from the textbox
		var searchTerm = $('#search-term').val().trim();

		// clears the input field after clicking submit
		$('input[type="text"]').val('');

		// The movie from the textbox is then added to our array
		searchTermArray.push(searchTerm);
		

		// Our array then runs which handles the processing of our movie array
		renderButtons();



		// We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
		return false;
	})


// ========================================================

	// This calls the renderButtons() function
	renderButtons();

// $('button').on('click', function() {
//         var p = $(this).data('person');
//         var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + p + "&api_key=dc6zaTOxFJmzC&limit=10";

//         $.ajax({
//                 url: queryURL,
//                 method: 'GET'
//             })
//             .done(function(response) {
//                 var results = response.data;

//                 for (var i = 0; i < results.length; i++) {
//                     var gifDiv = $('<div class="item">')

//                     var rating = results[i].rating;

//                     var p = $('<p>').text("Rating: " + rating);

//                     var personImage = $('<img>');
//                     personImage.attr('src', results[i].images.fixed_height.url);

//                     gifDiv.append(p)
//                     gifDiv.append(personImage)

//                     $('#gifsAppearHere').prepend(gifDiv);
//                 }
//             });
//     });