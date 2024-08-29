import { LitElement, html } from 'lit';
import '../data-provider/data-provider.js';
import '../data-manager/data-formatter.js';
import { PokemonList } from './pokemon-list.js';
import './pokemon-evolution.js';
import './pokemon-edit.js'

class PokemonApp extends LitElement {

    static properties = {
        data: { type: Array },
        formattedData: { type: Array },
        route: { type: String }
    }

    constructor() {
        super();
        this.data = []; 
        this.formattedData = [];
        this.route = window.location.pathname;
        window.onpopstate = () => {
            this.route = window.location.pathname;
            this.requestUpdate(); // Solicita una actualización para reflejar los cambios de ruta
        };
    }
  render() {
    const pokemon = this._getPokemonFromRoute();
    return html`
    <h1>PokeAPI</h1>
    <data-provider apiUrl="../../../pokemon.json" @data-changed="${this.handleData}">
      <pokemon-list .pokemons="${this.formattedData}" @pokemon-clicked="${this._navigateToEvolutionPage}"></pokemon-list>
        <data-formatter .data="${this.data}" @data-loaded="${this.handleDataLoaded}"></data-formatter>
      </data-provider>

      ${pokemon ? html`
        <pokemon-evolution-page .pokemonName="${pokemon.name}" .evolutions="${pokemon.evolutions}"></pokemon-evolution-page>
      ` : ''}

      ${this.route.startsWith('/edit/') ? html`
        <pokemon-edit .pokemon="${pokemon}" @pokemon-edited="${this._handlePokemonEdited}"></pokemon-edit>
      ` : ''}

      ${this.route.startsWith('/edit-evolutions/') ? html`
        <pokemon-edit .pokemon="${pokemon}" @pokemon-edited="${this._handlePokemonEdited}"></pokemon-edit>
      ` : ''}
    `;
  }

  _navigateToEvolutionPage(event) {
    const pokemonName = event.detail.pokemonName;
    window.history.pushState({}, '', `/evolution/${pokemonName}`);
    this.route = `/evolution/${pokemonName}`;
    this.requestUpdate();
  }

  _getPokemonFromRoute() {
    const pokemonName = this.route.split('/').pop();
    return this.formattedData.find(p => p.name === pokemonName) || { name: '', evolutions: [] };
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
}

customElements.define('pokemon-app', PokemonApp);
