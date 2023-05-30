

export async function getMovieListByGenre(genre) {
    return await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_APIKEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genre}&with_watch_monetization_types=flatrate`)
    .then((data) => {
        return data.json()
        .then((json) => {
            return json;
        });
    });
};

export async function getMovieDetailsByID(id) {
    return await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_APIKEY}&language=en-US`)
    .then((data) => {
        return data.json()
        .then((json) => {
            return json;
        })
    });
 };

 export async function getMovieGenres() {
    return await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_APIKEY}&language=en-US`)
    .then((data) => {
        return data.json()
        .then((json) => {
            return json;
        })
    });
 };

 export async function getMovieDetails() {
    return await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_APIKEY}&language=en-US`)
    .then((data) => {
        return data.json()
        .then((json) => {
            return json;
        })
    });
 };

 export async function getMovieRecommendationsByID(id) {
    return await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.REACT_APP_APIKEY}&language=en-US&page=1`)
    .then((data) => {
        return data.json()
        .then((json) => {
            console.log(json);
            return json;
        })
    });
}

export async function getMovieVideosByID(id) {
    return await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_APIKEY}&language=en-US`)
    .then((data) => {
        return data.json()
        .then((json) => {
            console.log(json);
            return json;
        })
    });
}

export async function getWatchProvidersByID(id) {
    return await fetch(`https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${process.env.REACT_APP_APIKEY}`)
    .then((data) => {
        return data.json()
        .then((json) => {
            return json.results.CA;
        })
    });
}

export async function getMoviesBySearch(search) {
    return await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_APIKEY}&language=en-US&query=${search}&page=1&include_adult=false`)
    .then((data) => {
        return data.json()
        .then((json) => {
            console.log(json);
            return json;
        })
    })
}