/*
Milestone 2:
Trasformiamo il voto da 1 a 10 decimale in un numero intero da 1 a 5, così da
permetterci di stampare a schermo un numero di stelle piene che vanno da 1 a 5,
lasciando le restanti vuote (troviamo le icone in FontAwesome).
Arrotondiamo sempre per eccesso all’unità successiva, non gestiamo icone mezze
piene (o mezze vuote :P)
Trasformiamo poi la stringa statica della lingua in una vera e propria bandiera della
nazione corrispondente, gestendo il caso in cui non abbiamo la bandiera della
nazione ritornata dall’API (le flag non ci sono in FontAwesome).
Allarghiamo poi la ricerca anche alle serie tv. Con la stessa azione di ricerca
dovremo prendere sia i film che corrispondono alla query, sia le serie tv, stando
attenti ad avere alla fine dei valori simili (le serie e i film hanno campi nel JSON di
risposta diversi, simili ma non sempre identici)
Qui un esempio di chiamata per le serie tv:
https://api.themoviedb.org/3/search/tv?api_key=e99307154c6dfb0b4750f6603256716d&language=it_IT&query=s
crubs
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
        this.film = [...risposta.data.results]
      });
      // API serie TV da chiamare
      axios.get()
      .then(rispostaTV => {

      })
    }
  }
})
