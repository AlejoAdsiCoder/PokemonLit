import { LitElement, css, html } from "lit";
import './pokemon-item.js';

export class PokemonList extends LitElement {
    static properties = {
        pokemons: { type: Array },  // Lista de Pokémon a mostrar
    };

    constructor() {
        super();
        this.pokemons = [];  // Inicializamos la lista de Pokémon vacía
    }

    static styles = css`
      .list-pokemon {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          max-width: 973px;
      }

      .pokemon-list-container {
        padding: 20px;
        margin: 0;
        min-height: 100vh; /* Asegura que ocupe toda la altura de la ventana */
        box-sizing: border-box;
      }

      h1 {
        margin-top: 0; /* Asegura que el título esté alineado en la parte superior */
        text-align: center;
      }
  `;

  render () {
    return html`
    <div class="pokemon-list-container">
      <h1>PokeAPI</h1>
        <section class="list-pokemon">
          ${this.pokemons.map(pokemon => html`
            <div @click="${() => this._onPokemonClick(pokemon.name)}" class="list-item">
                <pokemon-item
                  name="${pokemon.name}"
                  type="${pokemon.type}"
                  image="${pokemon.image}"
                ></pokemon-item>
            </div>
          `)}
        </section>
    </div>
    `;
  }

  _onPokemonClick(pokemonName) {
    this.dispatchEvent(new CustomEvent('pokemon-clicked', {
      detail: { pokemonName },
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define('pokemon-list', PokemonList);