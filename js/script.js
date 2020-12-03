/*
Milestone 3:
In questa milestone come prima cosa aggiungiamo la copertina del film o della serie
al nostro elenco. Ci viene passata dall’API solo la parte finale dell’URL, questo
perché poi potremo generare da quella porzione di URL tante dimensioni diverse.
Dovremo prendere quindi l’URL base delle immagini di TMDB:
https://image.tmdb.org/t/p/ per poi aggiungere la dimensione che vogliamo generare
(troviamo tutte le dimensioni possibili a questo link:
https://www.themoviedb.org/talk/53c11d4ec3a3684cf4006400 ) per poi aggiungere la
parte finale dell’URL passata dall’API.
Esempio di URL che torna la copertina di BORIS:
https://image.tmdb.org/t/p/w185/s2VDcsMh9ZhjFUxw77uCFDpTuXp.jpg
*/

const filmAPI = 'https://api.themoviedb.org/3/search/movie?api_key=e5c4638bfc15f5da668dafcb6d0b4b1b&query=';
const serieTvAPI = 'https://api.themoviedb.org/3/search/tv?api_key=e5c4638bfc15f5da668dafcb6d0b4b1b&query=';

var app = new Vue ({
  el: '#app',
  data: {
    film: [],
    search: '',
    stars: 5
  },
  methods: {
    checkFilm: function () {
      // API film da chiamare
      axios.get(filmAPI + this.search)
      .then(risposta => {
        this.film = risposta.data.results;
        this.search = '';
        risposta.data.results.forEach(item => {
          Vue.set(item, 'vote_average', Math.ceil(item.vote_average / 2));
        });
        this.film = [...risposta.data.results];
      });
      // API serie TV da chiamare
      axios.get(serieTvAPI + this.search)
      .then(rispostaTV => {
        let dataTv = rispostaTV.data.results;
        this.search = '';
        let serieTvUniformate = dataTv.map(item => {
          item.original_title = item.original_name;
          item.title = item.name;
          return item;
        });
        console.log(serieTvUniformate);
        this.film = [...this.film, ...serieTvUniformate];
      })
    }
  }
})

/*
//li metto dentro this.film ciclando
serieTvUniformate.forEach(item => {
this.film.push(item)
})
*/
