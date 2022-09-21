var db = new alasql.Database();

Papa.parse("imdb_top_1000.csv", {
	download: true,
	dynamicTyping: true,
	header: true,
	complete: function(results) {
		db.exec(`CREATE TABLE Movies`);
		db.tables[`Movies`].data = results.data;
		displayMovies(db.exec("SELECT * FROM Movies ORDER BY Series_Title"));
	}
});

function displayMovies(movies) {
	document.querySelector('#results').innerHTML = "";
	window.scrollTo(0, 0);
	movies.forEach(function(movie) {
		var newCard = document.createElement("div");
		newCard.className = "card";
		newCard.innerHTML = `
			<div>
				<img src="${movie.Poster_Link}">
        			<div class="movie-title">${movie.Series_Title}</div>
        			<div class="movie-year">${movie.Released_Year}</div>
        			<div class="movie-description">${movie.Overview}</div>
      			</div>
      			<div class="movie-meta">Average Rating: ${movie.IMDB_Rating}</div>
    		`;
		document.querySelector('#results').append(newCard)
	})
}

function sortByYear() {
	displayMovies(db.exec(`SELECT * FROM Movies ORDER BY Released_Year Desc`));
}

function sortByRating() {
	displayMovies(db.exec(`SELECT * FROM Movies ORDER BY IMDB_Rating Desc`));
}

function searchOverview(searchString) {
	displayMovies(db.exec(`SELECT * FROM Movies WHERE Overview LIKE '%${searchString}%'`));
}
function sortBy2000() {
	displayMovies(db.exec(`SELECT * FROM Movies Where Released_Year>2000 AND Released_Year <=2020 ORDER BY Released_Year  ASC`));
}
