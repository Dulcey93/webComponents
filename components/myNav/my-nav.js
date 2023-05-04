import config from "../../config.js";

export default class MyNav extends HTMLElement {
    static url = import.meta.url;
    static async components(){
        return await (await fetch(config.endPoint(MyNav.url).replace(".js", ".html"))).text();
    }
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        Promise.resolve(MyNav.components()).then(html => {
            this.shadowRoot.innerHTML = html;
        });
    }
}
customElements.define(config.name(MyNav.url), MyNav);