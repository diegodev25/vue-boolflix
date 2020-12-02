/*
Milestone 1:
Creare un layout base con una searchbar (una input e un button) in cui possiamo
scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il
bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni
film trovato:
1. Titolo
2. Titolo Originale
3. Lingua
4. Voto
*/

const personalAPI = 'https://api.themoviedb.org/3/search/movie?api_key=e5c4638bfc15f5da668dafcb6d0b4b1b&query=';

var app = new Vue ({
  el: '#app',
  data: {
    film: [],
    search: ''
  },
  methods: {
    checkFilm: function () {
      axios.get(personalAPI + this.search)
      .then(risposta => this.film = risposta.data.results);
      this.search = '';
    }
  }
})
