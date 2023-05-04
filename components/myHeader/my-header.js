import config from "../../config.js";

export default class MyHeader extends HTMLElement {
    static url = import.meta.url;
    static async components() {
        return await (await fetch(config.endPoint(MyHeader.url).replace(".js", ".html"))).text();
    }
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    handleEvent(e) {
        (e.type === "click") ? this.sendMessage(e) : undefined;
        console.log("Hola se activó el handleEvent del Header");
    }

    sendMessage(e) {
        console.log(e);
        e.preventDefault();
    }

    connectedCallback() {
        Promise.resolve(MyHeader.components()).then(html => {
            this.shadowRoot.innerHTML = html;
            let button = document.createElement("button");
            button.textContent = "Press me Header!";
            this.shadowRoot.append(button);
            this.button = this.shadowRoot.querySelector("button");
            // El .bind es para que se renderice el metodo pero no se ejecuta hasta que se de click
            this.button.addEventListener("click", this.handleEvent.bind(this));
        });
    }

    disconnectedCallback() {
        this.button.removeEventListener("click", this);
    }
}
customElements.define(config.name(MyHeader.url), MyHeader);