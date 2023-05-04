import config from "../../config.js";

export default class MyFooter extends HTMLElement {
    static url = import.meta.url;
    static async components(){
        return await (await fetch(config.endPoint(MyFooter.url))).text();
    }
    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }
    handleEvent(e) {
        (e.type === "click") ? this.sendMessage(e) : undefined;
    }

    sendMessage(e) {
        console.log(e);
        e.preventDefault();
    }

    connectedCallback() {
        Promise.resolve(MyFooter.components()).then(html => {
            this.shadowRoot.innerHTML = html;
            let button = document.createElement("button");
            button.textContent = "Press me Footer!";
            this.footer = this.shadowRoot.querySelector("footer");
            this.footer.appendChild(button);
            // El .bind es para que se renderice el metodo pero no se ejecuta hasta que se de click
            this.footer.addEventListener("click", this.handleEvent.bind(this));
        });
    }

    disconnectedCallback() {
        this.button.removeEventListener("click", this);
    }
}
customElements.define(config.name(MyFooter.url), MyFooter);