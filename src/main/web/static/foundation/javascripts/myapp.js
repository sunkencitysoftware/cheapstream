var searchNetflix = function(movieName) {
    // Build OData query
//    var movieName = $("#movieName").val();
console.info('movieName = ' + movieName);
    var query = "http://odata.netflix.com/Catalog" // netflix base url
    + "/Titles" // top-level resource
    + "?$filter=substringof('" + escape(movieName) + "',Name)"  // filter by movie name
    + "&$callback=callback" // jsonp request
    + "&$format=json"; // json request
 
    // Make JSONP call to Netflix
    $.ajax({
        dataType: "jsonp",
        url: query,
        jsonpCallback: "netflixCallback",
        success: callback
    });
}

var netflixCallback = function(result) {
    // unwrap result
    var movies = result["d"]["results"];
 
    // show movies in template
    var showMovie = tmpl("movieTemplate");
    var html = "";
    for (var i = 0; i < movies.length; i++) {
        // flatten movie
        movies[i].BoxArtSmallUrl = movies[i].BoxArt.SmallUrl;
 
        // render with template
        html += showMovie(movies[i]);
    }
    $("#movieTemplateContainer").html(html);
}
        
        
$(function() {
    // Handler for .ready() called.
    $('#search').submit(function() {
        searchNetflix($('#searchInput').val());
        return false;
    });
    $('#searchButton').click(function() {
        searchNetflix($('#searchInput').val());
        return false;
    });
});