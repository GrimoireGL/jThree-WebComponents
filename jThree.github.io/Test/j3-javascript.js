jThree( function( j3 ) {

  $( "#loading" ).remove();

  j3.Trackball();
  j3.Stats();

  j3( "mesh" ).click( function() {

    var mode = + ( j3( this ).attr( "geo" ) == "#geo0" );
    j3( this ).attr( "geo", "#geo" + mode )
    .animate( { mtlColor: mode ? "#f00" : "#00f" }, 500 );

  } );

},
function() {
  alert( "このブラウザはWebGLに対応していません。" );
} );
