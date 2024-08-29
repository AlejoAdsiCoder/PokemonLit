import { LitElement, html } from 'lit';

export class DataProvider extends LitElement {
    
    static properties = {
        apiUrl: { type: String },              // URL de la API o recurso desde donde obtener los datos.
        isLoading: { type: Boolean },          // Indica si los datos están siendo cargados.
        data: { type: Array },                 // Los datos obtenidos (en este caso, una lista de Pokémon).
        error: { type: Object },               // Error ocurrido durante la obtención de datos.
        method: { type: String },
    };

    
    constructor(parameters) {
        super();
        this.apiUrl = '';                      // Inicialización del URL, podría ser un archivo local o una API externa.
        this.isLoading = false;                // Inicialmente no está cargando.
        this.data = [];                        // Los datos se inicializan como un array vacío.
        this.error = null;    
        this.method = 'GET';         
    }

    connectedCallback() {
        super.connectedCallback();
        this.fetchData();
        console.log(this.apiUrl)
    }

    async fetchData() {
        this.isLoading = true;
        this.error = null;
    
        try {
          let response;
          if (this.cacheEnabled && sessionStorage.getItem('pokemonData')) {
            // Usar datos de la caché si están disponibles
            response = JSON.parse(sessionStorage.getItem('pokemonData'));
          } else {
            // Hacer la petición a la API
            const res = await fetch(this.apiUrl);
            if (!res.ok) {
              throw new Error(`HTTP error! Status: ${res.status}`);
            }
            response = await res.json();

            console.log(response)
    
            if (this.cacheEnabled) {
              sessionStorage.setItem('pokemonData', JSON.stringify(response));
            }
          }
    
            this.data = response.pokemon;

            const data = this.data

            this.dispatchEvent(new CustomEvent('data-changed', {
                detail: { data },
                bubbles: true,
                composed: true
            }));

        } catch (err) {
          this.error = err;
        } finally {
          this.isLoading = false;
        }
    }

    render() {
        return html`
        ${this.isLoading
            ? html`<p>Loading...</p>`
            : this.error
            ? html`<p>Error: ${this.error.message}</p>`
            : html`<slot></slot>`}
        `;
    }
}

customElements.define('data-provider', DataProvider);