import { LitElement, html } from 'lit';
import './data-provider/data-provider.js';
import './data-manager/data-formatter.js';
import './ui/pokemon-list.js';
import './ui/pokemon-evolution.js';
import './ui/pokemon-edit.js'

export class App extends LitElement {
    
  static properties = {
    data: { type: Array },
    formattedData: { type: Array },
    route: { type: String }
  };

  constructor() {
    super();
    this.data = [];
    this.formattedData = [];
    this.route = window.location.pathname;

    window.onpopstate = () => {
      this.route = window.location.pathname;
      this.requestUpdate(); // Solicita una actualización para reflejar los cambios de ruta
    };

    // Escuchar el evento route-changed
    this.addEventListener('route-changed', (event) => {
        this.route = event.detail.route;
        this.requestUpdate();
      });
  }

  render() {
    const pokemon = this._getPokemonFromRoute();
    return html`
      ${this.route === '/' ? html`
        <data-provider apiUrl="../../pokemon.json" @data-changed="${this.handleData}">
            <pokemon-list .pokemons="${this.formattedData}" @pokemon-clicked="${this._navigateToEvolutionPage}"></pokemon-list>
                <data-formatter .data="${this.data}" @data-loaded="${this.handleDataLoaded}"></data-formatter>
        </data-provider>
      ` : ''}

      ${this.route.startsWith('/evolution/') ? html`
        <pokemon-evolution .pokemonName="${pokemon.name}" .evolutions="${pokemon.evolutions}" @edit-evolutions="${this._navigateToEditEvolutionsPage}"></pokemon-evolution>
      ` : ''}

      ${this.route.startsWith('/edit/') ? html`
        <pokemon-edit .pokemon="${pokemon}"></pokemon-edit>
      ` : ''}
    `;
  }

  handleData(event) {
    // console.log(event)
    this.data = event.detail.data;  // Recibe los datos del DataProvider
    // console.log(this.data)

  }

  handleDataLoaded(event) {
    // console.log(event)
    this.formattedData = event.detail.formattedData
    // console.log("datos formateados", this.formattedData)
  }

  _navigateToEvolutionPage(event) {
    const pokemonName = event.detail.pokemonName;
    window.history.pushState({}, '', `/evolution/${pokemonName}`);
    this.route = `/evolution/${pokemonName}`;
    this.requestUpdate();
  }

  _getPokemonFromRoute() {
    const pathParts = this.route.split('/');
    const pokemonName = pathParts.pop();
    return this.formattedData.find(p => p.name.toLowerCase() === pokemonName.toLowerCase()) || { name: '', evolutions: [] };
  }

}

customElements.define('pokemon-app', App);
