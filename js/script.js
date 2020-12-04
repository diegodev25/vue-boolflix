/*
Milestone 4:
Trasformiamo quello che abbiamo fatto fino ad ora in una vera e propria webapp,
creando un layout completo simil-Netflix:
● Un header che contiene logo e search bar
● Dopo aver ricercato qualcosa nella searchbar, i risultati appaiono sotto forma
di “card” in cui lo sfondo è rappresentato dall’immagine di copertina ( consiglio
la poster_path con w342 )
● Andando con il mouse sopra una card (on hover), appaiono le informazioni
aggiuntive già prese nei punti precedenti più la overview
*/

const filmAPI = 'https://api.themoviedb.org/3/search/movie?api_key=e5c4638bfc15f5da668dafcb6d0b4b1b&query=';
const serieTvAPI = 'https://api.themoviedb.org/3/search/tv?api_key=e5c4638bfc15f5da668dafcb6d0b4b1b&query=';

var app = new Vue ({
  el: '#app',
  data: {
    film: [],
    query: ''
  },
  methods: {
    checkFilm: function () {
      // API film da chiamare
      axios.get(filmAPI + this.query)
      .then(risposta => {
        this.film = risposta.data.results;
        this.query = '';
        risposta.data.results.forEach(item => {
          Vue.set(item, 'vote_average', Math.ceil(item.vote_average / 2));
        });
        this.film = [...risposta.data.results];
      });
      // API serie TV da chiamare
      axios.get(serieTvAPI + this.query)
      .then(rispostaTV => {
        let dataTv = rispostaTV.data.results;
        this.query = '';
        let serieTvUniformate = dataTv.map(item => {
          item.original_title = item.original_name;
          item.title = item.name;
          return item;
        });
        this.film = [...this.film, ...serieTvUniformate];
      });
    },
    //funzione per inserire un poster di default nel caso mancasse la copertina
    posterDefault(event) {
      event.target.src = "img/poster-random.jpg";
    }
  }
})

/*
//li metto dentro this.film ciclando
serieTvUniformate.forEach(item => {
this.film.push(item)
})
*/
