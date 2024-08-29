import { LitElement, html, css } from 'lit';

export class PokemonModal extends LitElement {
    static styles = css`
        .modal {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 1rem;
            border: 1px solid #ccc;
            border-radius: 0.25rem;
            box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.5);
            z-index: 1000;
        }

        .modal-header {
            font-weight: bold;
            margin-bottom: 1rem;
        }

        .modal-footer {
            text-align: right;
        }

        .btn-close {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            cursor: pointer;
        }

        .btn-close:hover {
            background-color: #0056b3;
        }
    `;

    render() {
        return html`
            <div class="modal">
                <div class="modal-header">
                    Aviso
                </div>
                <div class="modal-body">
                    <slot></slot>
                </div>
                <div class="modal-footer">
                    <button class="btn-close" @click="${this._closeModal}">Cerrar</button>
                </div>
            </div>
        `;
    }

    _closeModal() {
        this.dispatchEvent(new CustomEvent('close-modal'));
    }
}

customElements.define('pokemon-modal', PokemonModal);
