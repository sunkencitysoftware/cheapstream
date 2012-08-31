var searchNetflix = function(movieName) {
    // Build OData query
    //    var movieName = $("#movieName").val();
    console.info('movieName = ' + movieName);
    var query = "http://odata.netflix.com/Catalog" // netflix base url
    + "/Titles" // top-level resource
    + "?$filter=Type eq 'Movie' and substringof('" + escape(movieName) + "',Name)"  // filter by movie name
    + "&$callback=netflixCallback" // jsonp request
    + "&$format=json"; // json request
 
    // Make JSONP call to Netflix
    $.ajax({
        dataType: "jsonp",
        url: query,
        jsonpCallback: "netflixCallback"
    });
}

var netflixCallback = function(result) {
    // unwrap result
    var movies = result["d"]["results"];
    var movie = movies[0];
    var streamingAvail = movie.Instant.Available;
    var hdAvail = movie.Instant.HighDefinitionAvailable;
    var price = 0;
    if (streamingAvail) {
        price = "0.00";
    } else {
        price = "Unavail";
    }
    var movieForTempl = {
        image: movie.BoxArt.LargeUrl,
        url: movie.Url,
        price: price,
        hdAvailable: hdAvail,
        title: movie.ShortName,
        available: streamingAvail,
        source: "Netflix"
    };
    
    $( "#movieTemplate" ).tmpl(movieForTempl).appendTo("#movieList");
    
}
        
var searchITunes = function(movieName) {
    var query = "http://itunes.apple.com/search";
    var params = {
        entity: "movie", 
        term: movieName
    };
    $.ajax({
        url: query,
        dataType: 'jsonp',
        jsonpCallback: "itunesCallback",
        data: params
    });
}

var itunesCallback = function(result) {
    if (result && result.results) {
        var movies = result.results;
    
        console.info(movies.length + " movies from iTunes");
        if (movies && movies.length > 0) {
            var movie = movies[0];
            var movieForTempl = {
                image: movie.artworkUrl100,
                url: movie.trackViewUrl,
                price: movie.trackPrice,
                title: movie.trackName,
                hdAvailable: "Unknown",
                available: true,
                source: "iTunes"
            };
            $( "#movieTemplate" ).tmpl(movieForTempl).appendTo("#movieList");
        }
    }
}
var searchAmazon = function(movieName) {
    var query = "http://itunes.apple.com/search";
    var params = {
        entity: "movie", 
        term: movieName
    };
    $.ajax({
        url: query,
        dataType: 'jsonp',
        jsonpCallback: "itunesCallback",
        data: params
    });
}

var amazonCallback = function(result) {
    if (result && result.results) {
        var movies = result.results;
    
        console.info(movies.length + " movies from iTunes");
        if (movies && movies.length > 0) {
            var movie = movies[0];
            var movieForTempl = {
                image: movie.artworkUrl100,
                url: movie.trackViewUrl,
                price: movie.trackPrice,
                title: movie.trackName,
                hdAvailable: "Unknown",
                available: true,
                source: "iTunes"
            };
            $( "#movieTemplate" ).tmpl(movieForTempl).appendTo("#movieList");
        }
    }
}

var handleSearch = function(searchTerm) {
    $("#movieList").children().remove();
    searchNetflix(searchTerm);
    searchITunes(searchTerm);
}
        
$(function() {
    // Handler for .ready() called.
    $('#search').submit(function() {
        var searchTerm = $('#searchInput').val();
        handleSearch(searchTerm);
        return false;
    });
    $('#searchButton').click(function() {
        var searchTerm = $('#searchInput').val();
        handleSearch(searchTerm);
        return false;
    });
});