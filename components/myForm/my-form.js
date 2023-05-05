import config from "../../config.js";

export default class MySelect extends HTMLElement {
    static url = import.meta.url;
    static async components() {
        return await (await fetch(config.endPoint(MySelect.url))).text();
    }
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
    handleEvent(e) {
        (e.type === "submit") ? this.sendMessage(e) : undefined;

    }

    sendMessage(e) {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target).entries());
  
        // Obtener el valor del input de tipo "text"
        this.inputValue = data.input1;
        
        // Obtener el valor del input de tipo "radio"
        const radioInput = e.target.querySelector('input[name="radio"]:checked');
        this.radioValue = radioInput.value;
        
        // Cambiar el textContent del label con el valor del input de tipo "text"
        this.label = this.shadowRoot.querySelector('label[name="inputLabel"]');
        this.label.textContent = this.inputValue;
        console.log(data);
        e.target.reset();
    }

    connectedCallback() {
        Promise.resolve(MySelect.components()).then(html => {
            this.shadowRoot.innerHTML = html;
            let button = document.createElement("button");
            button.type = "submit";
            button.textContent = "Submit!";
            this.form = this.shadowRoot.querySelector("form");
            this.form.append(button);
            // El .bind es para que se renderice el metodo pero no se ejecuta hasta que se de click
            this.form.addEventListener("submit", this.handleEvent.bind(this));
        });
    }

    disconnectedCallback() {
        this.button.removeEventListener("submit", this);
    }
}
customElements.define(config.name(MySelect.url), MySelect);