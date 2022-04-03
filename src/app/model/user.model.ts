import { Movie } from "./movie.model";

export class User {
    username: string;
    password: string;
    movies: Movie[];

    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    setMovies(movies: Movie[]) {
        this.movies = movies;
    }
}