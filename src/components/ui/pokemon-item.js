import { LitElement, html, css } from 'lit';

export class PokemonItem extends LitElement {
  static properties = {
    name: { type: String },
    type: { type: String },
    image: { type: String }
  };

  static styles = css`
    .card {
      border: 1px solid #ddd;
      border-radius: 5px;
      padding: 10px;
      margin: 10px;
      text-align: center;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s ease-in-out;
      width: 200px; /* Establece un ancho fijo */
      height: 300px; /* Establece una altura fija */
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .card:hover {
      transform: translateY(-5px);
    }

    .pokemon-image {
      max-width: 100px;
      margin: 0 auto 10px;
    }

    .pokemon-name {
      font-size: 1.5em;
      font-weight: bold;
      margin-bottom: 5px;
    }

    .pokemon-type {
      font-size: 1em;
      color: #555;
    }
  `;

  render() {
    return html`
      <div class="card">
        <img class="pokemon-image" src="${this.image}" alt="${this.name}">
        <div class="pokemon-name">${this.name}</div>
        <div class="pokemon-type">${this.type}</div>
      </div>
    `;
  }
}

customElements.define('pokemon-item', PokemonItem);
