/*
Milestone 5 (Opzionale):
Partendo da un film o da una serie, richiedere all'API quali sono gli attori che fanno
parte del cast aggiungendo alla nostra scheda Film / Serie SOLO i primi 5 restituiti
dall’API con Nome e Cognome, e i generi associati al film con questo schema:
“Genere 1, Genere 2, …”.
Milestone 6 (Opzionale):
Creare una lista di generi richiedendo quelli disponibili all'API e creare dei filtri con i
generi tv e movie per mostrare/nascondere le schede ottenute con la ricerca.
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
          Vue.set(item, 'vote_average', Math.ceil(item.vote_average / 2));
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
