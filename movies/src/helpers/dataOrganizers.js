import { getMovieDetailsByID, getMovieListByGenre } from "./movieAPI";

export const genres = [
    {id: 28, name: 'Action'},
    {id: 12, name: 'Adventure'},
    {id: 16, name: 'Animation'},
    {id: 35, name: 'Comedy'},
    {id: 80, name: 'Crime'},
    {id: 99, name: 'Documentary'},
    {id: 18, name: 'Drama'},
    {id: 10751, name: 'Family'},
    {id: 14, name: 'Fantasy'},
    {id: 36, name: 'History'},
    {id: 27, name: 'Horror'},
    {id: 10402, name: 'Music'},
    {id: 9648, name: 'Mystery'},
    {id: 10749, name: 'Romance'},
    {id: 878, name: 'Science Fiction'},
    {id: 10770, name: 'TV Movie'},
    {id: 53, name: 'Thriller'},
    {id: 10752, name: 'War'},
    {id: 37, name: 'Western'},
]

export function getGenreByID(id) {
    for (let genre of genres) {
        if (genre.id === id) {
            return genre.name;
        }
    }
}

export function constructImagePath(imagePath) {
    return `https://image.tmdb.org/t/p/original${imagePath}`;
 };

export async function constructMovieLists(numberOfLists) {
    let sortedMovieLists = [];

    for (let i = 0; i < numberOfLists; i++) {
        sortedMovieLists.push([]);
    }

    return getMultipleMovieLists(numberOfLists).then((res) => {
        for (let i = 0; i < numberOfLists; i++) {
            for (let movie of res[i].list.results) {
                if (movie.backdrop_path) {
                    sortedMovieLists[i].push(
                        {
                            title: movie.original_title,
                            description: movie.overview,
                            poster: movie.poster_path,
                            backdrop: movie.backdrop_path,
                            releaseDate: movie.release_date,
                            genres: movie.genre_ids,
                            mainGenre: res[i].genre,
                            movieID: movie.id
                        }
                    )
                }
            }
        }
        return sortedMovieLists;
    });
 };

 export async function formatMyList(list) {

    return getMultipleMoviesByID(list)
    .then((res) => {
        return res;
    })
 }

 async function getMultipleMoviesByID(list) {
    let formattedList = [];

    for (let i = 0; i < list.length; i++) {
        await getMovieDetailsByID(list[i])
        .then((response) => {
            console.log(response);
            formattedList.push({
                title: response.original_title,
                description: response.overview,
                poster: response.poster_path,
                backdrop: response.backdrop_path,
                releaseDate: response.release_date,
                genres: response.genre_ids,
                movieID: response.id
            });
        })
    }

    return formattedList;
 }

 export function formatRecommendationList(list) {
    let formattedList = [];
    for (let movie of list) {
        if (movie.backdrop_path) {
            formattedList.push(
                {
                    title: movie.original_title,
                    description: movie.overview,
                    poster: movie.poster_path,
                    backdrop: movie.backdrop_path,
                    releaseDate: movie.release_date,
                    genres: movie.genre_ids,
                    mainGenre: 'Recommendations',
                    movieID: movie.id
                }
            )
        }
    }
    return formattedList.slice(0,20);
 }

 export function formarWatchProviders(data) {
    let formattedProviders = {
        buy: [],
        rent: [],
        stream: []
    };

    for (let provider of data.buy) {
        formattedProviders.buy.push({
            name: provider.provider_name,
            icon: provider.logo_path
        })
    }

    for (let provider of data.rent) {
        formattedProviders.rent.push({
            name: provider.provider_name,
            icon: provider.logo_path
        })
    }

    for (let provider of data.flatrate) {
        formattedProviders.stream.push({
            name: provider.provider_name,
            icon: provider.logo_path
        })
    }

    console.log(formattedProviders);
    return formattedProviders;
 }

async function getMultipleMovieLists(numberOfLists) {
    let selectedGenres = [];
    let movieLists = [];
    shuffleArray(genres);

    for (let i = 0; i < numberOfLists; i++) {
        selectedGenres.push(genres[i].id);
    }

    for (let i = 0; i < numberOfLists; i++) {
        await getMovieListByGenre(selectedGenres[i])
        .then((response) => {
            movieLists.push({genre: selectedGenres[i], list: response});
        })
    }

    return movieLists;
 }

 /* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

