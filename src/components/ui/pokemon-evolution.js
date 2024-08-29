import { LitElement, html, css } from 'lit';

export class PokemonEvolution extends LitElement {
  static properties = {
    evolutions: { type: Array },
    pokemonName: { type: String }
  };

  constructor() {
    super();
    this.evolutions = [];
    this.pokemonName = '';
  }

  static styles = css`
    .container {
      padding: 1rem;
      max-width: 800px;
      margin: auto;
    }

    .buttons-container {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .card {
      border: 1px solid #dee2e6;
      border-radius: 0.25rem;
      padding: 1rem;
      margin-bottom: 1rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    }

    ul li {
      list-style-type: none;
    }

    .card img {
      border-radius: 50%;
      margin-right: 1rem;
    }

    .card-body {
      display: flex;
      align-items: center;
    }

    .card-title {
      font-size: 1.25rem;
      font-weight: bold;
      margin: 0;
    }

    .card-subtitle {
      font-size: 1rem;
      color: #6c757d;
    }

    button {
      display: inline-block;
      font-weight: 400;
      color: #fff;
      text-align: center;
      vertical-align: middle;
      cursor: pointer;
      background-color: #007bff;
      border: 1px solid #007bff;
      padding: 0.375rem 0.75rem;
      border-radius: 0.25rem;
      text-decoration: none;
      transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
    }

    button:hover {
      background-color: #0056b3;
      border-color: #004085;
      box-shadow: 0 0.25rem 0.5rem rgba(0, 123, 255, 0.5);
    }

    button:active {
      background-color: #004085;
      border-color: #00306f;
      box-shadow: 0 0.5rem 1rem rgba(0, 123, 255, 0.75);
    }

    button:focus {
      outline: 0;
      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
    }

    .back-button {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      cursor: pointer;
      text-align: center;
    }

    .back-button:hover {
      background-color: #0056b3;
    }
  `;

  handleEdit() {
    // Cambia la ruta para redirigir a la página de edición
    window.history.pushState({}, '', `/edit/${this.pokemonName}`);
    this.dispatchEvent(new CustomEvent('route-changed', {
      detail: { route: `/edit/${this.pokemonName}` },
      bubbles: true,
      composed: true
    }));
  }

  _navigateBack() {
    window.history.back();  // Navega a la página anterior en el historial del navegador
  }

  render() {
    return html`
      <div class="container">
        <h2>Evoluciones de ${this.pokemonName}:</h2>
        <ul>
          ${this.evolutions.length > 0 ? 
            this.evolutions.map(evo => html`
              <li class="card">
                <div class="card-body">
                  <img src="${evo.image}" alt="${evo.name}" width="50" height="50">
                  <div>
                    <h3 class="card-title">${evo.name}</h3>
                    <p class="card-subtitle">${evo.type}</p>
                  </div>
                </div>
              </li>
            `) :
            html`<li>No hay evoluciones disponibles.</li>`
          }
        </ul>
        <div class="buttons-container">
          <button class="back-button" @click="${this._navigateBack}">Regresar</button>
          <button @click="${this.handleEdit}">Editar Evoluciones</button>
        </div>
      </div>
    `;
  }
}

customElements.define('pokemon-evolution', PokemonEvolution);
