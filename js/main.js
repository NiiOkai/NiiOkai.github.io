

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

var reservationData = {};

$(".reservation-day li").on("click", function(e){
	e.preventDefault();
	 var reservationData = {day: $("#day").val()};
	
//alert($(this).text());

	reservationData.day = $(this).text();

	//renames the dropdown menu to the selected item
	$(".dropdown-toggle").html($(this).text());

	

});

$(".reservations").on("submit", function(e){
	e.preventDefault();
    var reservationData = {name: $("#name").val(), day: $("#day").val()};
	reservationData.name = $(".reservation-name").val();
	reservationData.day = $(".dropdown-toggle").html();



  

	alert("Thank you!! "+ $(".reservation-name").val()+ ", your reservation for " + $(".dropdown-toggle").html() + " is confirmed.");
 
 //reset fields
	$(".dropdown-toggle").html("Select A Day");
	$(".reservation-name").val("");



// creating a section for reservation data in firebase
	var reservationReference = database.ref('reservations');

  //  set method to save data to reservation in firebase
  reservationReference.push({
    reservations: reservationData
  });
  
});

//function to listen for any changes to the Firebase database using the value event
 function getReservations(){

    database.ref('reservations').on('value', function (results) {
    var allReservations = results.val();
    //An empty array to add all reservations before updating the DOM or table


    var reservations = [];
    for (var item in allReservations) {

      //creating the object literal with the data to pass to the Handlebars tmeplate
      var context = {
         day: allReservations[item].day,
        name: allReservations[item].name    
     };

     //alert(allReservations[item].name);
// creating Handlebars template to add data
      var source = $("#reservation-template").html();
      var template = Handlebars.compile(source);
      var reservationtListElement = template(context);
      reservations.push(reservationtListElement)
      $('tbody').html(reservations)
    };
    //  /Refresh
    //$('#reservation-template').empty()
    // append each reservation 
    // for (var i in reservations) {
    //   $('').append(reservations[i])
    //   //alert(reservations[i]);
    // }
  });

  };

  getReservations();

$("#contactus").hide();

$("#dropdownButton").on("click", function(){
    $("#contact").slideToggle("slow");
    $("#contactus").slideToggle("slow");
  })



  function initMap() {
    var center = {lat: 40.8054491, lng: -73.9654415};
    
    var styles = [
      {hue: '#00ffe6' },
      {saturation: -20}
    
    ];
    
    var map = new google.maps.Map(document.getElementById('map'), {
      center: center,
      zoom: 10,
      styles: styles,
      scrollwheel: false,
      navigationControl: false,
      mapTypeControl: false,
      scaleControl: false,
      draggable: true,
    });

    var marker = new google.maps.Marker({
    position: {lat: 40.8054491, lng: -73.9654415},
    map: map,
    title: 'Monks Café'
    });
  };