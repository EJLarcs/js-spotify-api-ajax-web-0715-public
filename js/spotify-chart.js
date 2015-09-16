var url = "http://charts.spotify.com/api/tracks/most_streamed/us/weekly/latest";

var dataSetProperties = {
  label: 'Spotify Chart of Top 20 Streamed Songs on Spotify with their Steam Count', 
  fillColor: 'rgba(220,220,220,0.5)', 
  strokeColor: 'rgba(220,220,220,0.8)', 
  highlightFill: 'rgba(220,220,220,0.75)', 
  highlightStroke: 'rgba(220,220,220,1)'
}

$(function() {
  getSpotifyTracks(success);
});

function extractTop20Tracks(tracks) {
  // your code here
  return tracks.slice(0,20);

}


function extractNumberOfStreams(tracks) {
  // your code here
  // look up .map in js
  var numStreamsTracks = [];
    for (var i = 0; i < tracks.length; i++) {
      numStreamsTracks.push(tracks[i].num_streams);
    }
  return numStreamsTracks;

}

function extractNames(tracks) {
  // your code here
    var nameOfTracks = [];
    for (var i = 0; i < tracks.length; i++) {
      nameOfTracks.push(tracks[i].track_name);
    }
  return nameOfTracks;
}

function chartData(labels, inputData) {
  // your code here
    dataSetProperties.data = inputData
    return {
      labels: labels,
      datasets: [dataSetProperties]
      // datasets: [{
      //   label: 'Spotify Chart of Top 20 Streamed Songs on Spotify with their Steam Count', 
      //   fillColor: 'rgba(220,220,220,0.5)', 
      //   strokeColor: 'rgba(220,220,220,0.8)', 
      //   highlightFill: 'rgba(220,220,220,0.75)', 
      //   highlightStroke: 'rgba(220,220,220,1)',
      //   data: inputData
      // }]
    };
  // use the dataSetProperties variable defined above if it helps
}

function getSpotifyTracks(callback){
  // your ajax call here, on success it should call on the 
  // parameter it's passed (it's a function), and pass it's 
  // parameter the data it received
     $.ajax({
      url: url,
      dataType: 'jsonp',
      success: callback
    });
  // use the url variable defined above if it helps
}

function success(parsedJSON) {
 
  // this function will make a new bar chart, refer to this url:
  // http://www.chartjs.org/docs/#bar-chart
  // you will need to call on:

   // 1. extractTop20Tracks - pass it tracks
  var tracks = extractTop20Tracks(parsedJSON.tracks);
  //  2. extractNames -  pass it the result of #1
  var names = extractNames(tracks);
    //  3. extractNumberOfStreams - pass it the result of #1
  var streams = extractNumberOfStreams(tracks);
    //  4. chartData - pass it results of #2 and #3
  var data = chartData(names, streams);
   //  5. make a variable `ctx` and select the canvas with the id of spotify-chart 
  //     * also make sure to specify 2d context
  var ctx = $('#spotify-chart').get(0).getContext("2d");
  //returns array 
  //  6. make a new bar chart!
  new Chart(ctx).Bar(data);

}
