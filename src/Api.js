import $ from '../node_modules/jquery/dist/jquery.min.js'

export default {
	searchGifs: function(query, callback) {
		$.get(`https://api.giphy.com/v1/gifs/search?api_key=OHmzUo01WAYi2XU4iUwKKgNJB7QoaEUv&q=${query}&limit=24&offset=0&rating=G&lang=en`,
			callback
        );
	},
	getRandomGifs: function(callback) {
		$.get( "https://api.giphy.com/v1/gifs/trending?api_key=OHmzUo01WAYi2XU4iUwKKgNJB7QoaEUv&limit=24&rating=G", callback);
	},
	searchGifById: function(id, callback) {
		$.get( `https://api.giphy.com/v1/gifs/${id}?api_key=OHmzUo01WAYi2XU4iUwKKgNJB7QoaEUv`, callback);
	}
}