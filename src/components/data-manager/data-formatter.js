import { LitElement } from "lit";

export class DataFormatter extends LitElement {
    static properties = {
        data: { type: Array },           // Los datos sin procesar que se formatearán.
        formattedData: { type: Array },  // Los datos formateados que resultan del proceso.
    };

    constructor() {
        super();
        this.data = [];
        this.formattedData = [];
    }

    updated(changedProperties) {
        super.updated(changedProperties)
        if (changedProperties.has('data')) {
            this.formattedData = this.formatData(this.data);
            this.dispatchEvent(new CustomEvent('data-loaded', {
              detail: { formattedData: this.formattedData },
              bubbles: true,
              composed: true
            }));
        }
    }

    formatData(data) {
           return data.map(pokemon => ({
            name: pokemon.name.toUpperCase(),
            type: pokemon.type.split('/').join(', '), // Cambia "Grass/Poison" a "Grass, Poison"
            image: pokemon.image,
            evolutions: pokemon.evolutions.map(evolution => ({
                name: evolution.name.toUpperCase(),
                type: evolution.type.split('/').join(', '),
                image: evolution.image,
            })),
        }));
    }
}

customElements.define('data-formatter', DataFormatter);