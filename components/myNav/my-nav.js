import config from "../../config.js";

export default class MyNav extends HTMLElement {
    static url = import.meta.url;
    static async components(){
        return await (await fetch(config.endPoint(MyNav.url))).text();
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
        console.log(`entrò al sendMessage ${e.target}`);
        e.preventDefault();
    }

    connectedCallback() {
        Promise.resolve(MyNav.components()).then(html => {
            this.shadowRoot.innerHTML = html;
            let button = document.createElement("button");
            button.textContent = "Click me!";
            this.nav = this.shadowRoot.querySelector(".navbar");
            this.nav.append(button);
            // El .bind es para que se renderice el metodo pero no se ejecuta hasta que se de click
            this.nav.addEventListener("click", this.handleEvent.bind(this));
        });
    }

    disconnectedCallback() {
        this.nav.removeEventListener("click", this);
    }
}
customElements.define(config.name(MyNav.url), MyNav);