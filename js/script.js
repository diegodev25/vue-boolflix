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

const personalAPI = 'https://api.themoviedb.org/3/search/movie?api_key=e5c4638bfc15f5da668dafcb6d0b4b1b&language=it-IT&query=Movies&page=1&include_adult=false';

var app = new Vue ({
  el: '#app',
  data: {
    movie: []
  },
  mounted: function () {
    axios.get(personalAPI)
    .then(risposta => {
      this.movie = risposta.data.results;
      console.log(this.movie);
    });
  }
})
