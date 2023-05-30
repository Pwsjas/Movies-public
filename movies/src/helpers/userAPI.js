export async function createNewUser(user, pw) {
    console.log('called', user, pw);
    fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: user, password: pw })
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
}

export async function addMovie(movie_id) {
    console.log('called', movie_id);
    fetch('http://localhost:5000/api/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ movie: movie_id })
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
}

export async function getMyList(user) {
    console.log('called', user);
    return fetch(`http://localhost:5000/api/users/${user}/movies`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(data => {
        return data.json()
        .then((data) => {
            return data;
        })
      })
      .catch(error => {
        console.error(error);
      });
}

export async function addMovieToMyList(user, movie_id) {
    console.log('called', movie_id);
    fetch('http://localhost:5000/api/users_movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: user, movie: movie_id })
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
}

export async function verifyMovieWithinMyList(user, movie_id) {
    console.log('verify', user,  movie_id);
    return fetch('http://localhost:5000/api/users/movies/read', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: user, movie: movie_id })
      })
      .then(data => {
        console.log(data);
        if (data.status === 200) {
            return true;
        } else {
            return false;
        }
      })
      .catch(error => {
        console.error(error);
      });
}

export async function removeMovieFromMyList(user, movie_id) {
    console.log('verify', user,  movie_id);
    return fetch('http://localhost:5000/api/users/movies/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: user, movie: movie_id })
      })
      .then(data => {
        console.log(data);
        if (data.status === 200) {
            return true;
        } else {
            return false;
        }
      })
      .catch(error => {
        console.error(error);
      });
}

export async function login(user, pw) {
    console.log('called login', user, pw);
    return fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: user, password: pw })
      })
      .then(data => {
        console.log(data);
        if (data.status === 200) {
            return true;
        } else {
            return false;
        }
      })
      .catch(error => {
        console.error(error);
        return false;
      });
}