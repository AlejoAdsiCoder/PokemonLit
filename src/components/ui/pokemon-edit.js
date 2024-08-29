import { LitElement, html, css } from 'lit';
import './pokemon-modal.js';  // Importa el componente del modal
import { property } from 'lit/decorators.js';

export class PokemonEdit extends LitElement {
    static properties = {
        pokemon: { type: Object },  // El Pokémon que se está editando
        isDuplicate: { type: Boolean },  // Estado del checkbox para Pokémon repetido
        showModal: { type: Boolean }  // Controla la visibilidad del modal
    };

    constructor() {
        super();
        this.pokemon = { name: '', type: '', image: '', evolutions: [] };
        this.isDuplicate = false;
        this.showModal = false;  // Inicialmente, el modal no se muestra
    }

    static styles = css`
        /* Estilos para el formulario y el modal */
        .form-group {
            margin-bottom: 1rem;
        }

        .form-check {
            margin-bottom: 1rem;
        }

        .btn {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            cursor: pointer;
            border-radius: 0.25rem;
            font-size: 1rem;
        }

        .btn:hover {
            background-color: #0056b3;
        }

        .btn:focus {
            outline: none;
            box-shadow: 0 0 0 0.2rem rgba(38,143,255,.5);
        }

        .evolution-group {
            margin-top: 2rem;
        }

        h3 {
            margin-top: 2rem;
            font-size: 1.5rem;
            color: #333;
        }
    `;

    _handleInput(event) {
        const field = event.target.id;
        this.pokemon = { ...this.pokemon, [field]: event.target.value };
    }

    _handleDuplicateCheck(event) {
        this.isDuplicate = event.target.checked;
        if (this.isDuplicate) {
            this.showModal = true;
        }
    }

    handleInputChange(event) {
        const { name, value } = event.target;
        this.pokemon = { ...this.pokemon, [name]: value };
    }

    handleEvolutionChange(index, event) {
        const { name, value } = event.target;
        const evolutions = [...this.pokemon.evolutions];
        evolutions[index] = { ...evolutions[index], [name]: value };
        this.pokemon = { ...this.pokemon, evolutions };
    }

    handleSave() {
        this.dispatchEvent(new CustomEvent('pokemon-edited', {
            detail: { pokemon: this.pokemon },
            bubbles: true,
            composed: true
        }));
    }

    _handleCloseModal() {
        this.showModal = false;  // Cierra el modal
    }

    render() {
        return html`
            <div>
                <h2>Editar Pokémon</h2>
                <form>
                    <div class="form-group">
                        <label for="name">Nombre:</label>
                        <input type="text" id="name" name="name" class="form-control" .value="${this.pokemon.name}" @input="${this.handleInputChange}">
                    </div>
                    <div class="form-group">
                        <label for="type">Tipo:</label>
                        <input type="text" id="type" name="type" class="form-control" .value="${this.pokemon.type}" @input="${this.handleInputChange}">
                    </div>
                    <div class="form-check">
                        <input id="isDuplicate" type="checkbox" class="form-check-input" @change="${this._handleDuplicateCheck}">
                        <label for="isDuplicate" class="form-check-label">¿Este Pokémon está repetido?</label>
                    </div>
                    <div class="form-group">
                        <label for="image">URL de Imagen:</label>
                        <input type="text" id="image" name="image" class="form-control" .value="${this.pokemon.image}" @input="${this.handleInputChange}">
                    </div>

                    <div class="evolution-group">
                        <h3>Evoluciones</h3>
                        ${this.pokemon.evolutions.map((evolution, index) => html`
                            <div class="form-group">
                                <label for="evolution-name-${index}">Nombre de la Evolución:</label>
                                <input type="text" id="evolution-name-${index}" name="name" class="form-control" .value="${evolution.name}" @input="${(e) => this.handleEvolutionChange(index, e)}">
                            </div>
                            <div class="form-group">
                                <label for="evolution-type-${index}">Tipo:</label>
                                <input type="text" id="evolution-type-${index}" name="type" class="form-control" .value="${evolution.type}" @input="${(e) => this.handleEvolutionChange(index, e)}">
                            </div>
                            <div class="form-group">
                                <label for="evolution-image-${index}">URL de Imagen:</label>
                                <input type="text" id="evolution-image-${index}" name="image" class="form-control" .value="${evolution.image}" @input="${(e) => this.handleEvolutionChange(index, e)}">
                            </div>
                        `)}
                    </div>

                    <button type="button" class="btn" @click="${this.handleSave}">Guardar</button>
                </form>

                ${this.showModal ? html`
                    <pokemon-modal @close-modal="${this._handleCloseModal}">
                        <p>Este Pokémon está repetido. Puedes cambiarlo en el centro Pokémon más cercano.</p>
                    </pokemon-modal>
                ` : ''}
            </div>
        `;
    }
}

customElements.define('pokemon-edit', PokemonEdit);
