import config from "../../config.js";

export default class MySelect extends HTMLElement {
    static url = import.meta.url;
    static async components(){
        return await (await fetch(config.endPoint(MySelect.url))).text();
    }
    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }
    handleEvent(e) {
        (e.type === "submit") ? this.sendMessage(e) : undefined;

    }

    sendMessage(e) {
        //El e.target apunta al formulario
        console.log(e.target);
        //El FormData es un objeto que contiene todos los datos del formulario en forma de clave valor
        const data = Object.fromEntries(new FormData(e.target));
        console.log(data);
        /* console.log(e); */
        e.preventDefault();
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