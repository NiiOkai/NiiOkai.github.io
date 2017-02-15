
var reservationData = {};
//<script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBBv4X9ONdurwLzno-LAda6iM0g5_7WeYM",
    authDomain: "reservation-site-d6063.firebaseapp.com",
    databaseURL: "https://reservation-site-d6063.firebaseio.com",
    storageBucket: "reservation-site-d6063.appspot.com",
    messagingSenderId: "283237381909"
  };

 
//</script>


firebase.initializeApp(config);

//connecting to firebase DB
var database = firebase.database();

// $('.reservation-day li').click(function() {
//   reservationData.day = $(this).text();
//   $(".dropdown-toggle").html($(this).text());
// });

// // when clicked, the name data should be set
// // and all data should be sent to your database
// $('.reservations').on('submit', function(event) {
//   // prevent reloading
//   event.preventDefault();

//   // get name from input
//   reservationData.name = $('.reservation-name').val();

// alert("Thank you!! "+ $(".reservation-name").val()+ ", your reservation for " + $(".dropdown-toggle").html() + " is confirmed.");
//  $(".dropdown-toggle").html("Select A Day");
//  $(".reservation-name").val("");


//   // push configured data object to database
//   //database.ref('reservations').push(reservationData);
//   var reservationReference = database.ref('reservations');
//   reservationReference.push({
//     reservations: reservationData
//    });
// });

$(".reservation-day li").on("click", function(e){
	e.preventDefault();
	 //reservationData = {day: $("#day").val()};
	
//alert($(this).text());

	reservationData.day = $(this).text();

	//renames the dropdown menu to the selected item
	$(".dropdown-toggle").html($(this).text());

	

});

$(".reservations").on("submit", function(e){
	e.preventDefault();
    //var reservationData = {name: $("#name").val(), day: $("#day").val()};
	reservationData.name = $(".reservation-name").val();
	//reservationData.day = $(".dropdown-toggle").html();



  

	alert("Thank you!! "+ $(".reservation-name").val()+ ", your reservation for " + $(".dropdown-toggle").html() + " is confirmed.");
 
 //reset fields
	$(".dropdown-toggle").html("Select A Day");
	$(".reservation-name").val("");


database.ref('reservations').push(reservationData);
// // creating a section for reservation data in firebase
// 	var reservationReference = database.ref('reservations');

//   //  set method to save data to reservation in firebase
//   reservationReference.push({
//     reservations: reservationData
//   });
  
});


// getReservations();
//function to listen for any changes to the Firebase database using the value event
 database.ref('reservations').on('child_added', function(snapshot) {
  // grab element to hook to
  var reservationList = $('.reservation-list');
  // get data from database
  var reservations = snapshot.val();
  // get your template from your script tag
  var source   = $("#reservation-template").html();
  // compile template
  var template = Handlebars.compile(source);
  // pass data to template to be evaluated within handlebars
  // as the template is created
  var reservationTemplate = template(reservations);
  // append created templated
  reservationList.append(reservationTemplate);
});

//this hides the box on page load
$("#contactus").hide();

//this toggles the hide and show actions
$("#dropdownButton").on("click", function(){
    $("#contact").slideToggle("slow");
    $("#contactus").slideToggle("slow");
  })

//$(".restaurant-locator").hide();

$("#map").on("click", function(){
  $(".restaurant-locator").show();
})




  function initMap() {
    var center = {lat: 33.7490, lng: -84.3880};
    
    var styles = [
      {hue: '#00ffe6' },
      {saturation: -20}
    
    ];
    
    var map = new google.maps.Map(document.getElementById('map'), {
      center: center,
      zoom: 10,
      styles: styles,
      scrollwheel: true,
      navigationControl: true,
      mapTypeControl: false,
      scaleControl: false,
      draggable: true,
    });

    var marker = new google.maps.Marker({
    position: {lat: 33.7490, lng: -84.3880},
    map: map,
    title: 'Monks Café'
    });
  };