import config from "../../config.js";

export default class MySection extends HTMLElement {
    static url = import.meta.url;
    static async components(){
        return await (await fetch(config.endPoint(MySection.url).replace(".js", ".html"))).text();
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
        Promise.resolve(MySection.components()).then(html => {
            this.shadowRoot.innerHTML = html;
            let button = document.createElement("button");
            button.textContent = "Press me Section!";
            this.section = this.shadowRoot.querySelector("section");
            this.section.appendChild(button);
            // El .bind es para que se renderice el metodo pero no se ejecuta hasta que se de click
            this.section.addEventListener("click", this.handleEvent.bind(this));
        });
    }

    disconnectedCallback() {
        this.button.removeEventListener("click", this);
    }
}
customElements.define(config.name(MySection.url), MySection);