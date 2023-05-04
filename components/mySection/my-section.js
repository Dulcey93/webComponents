import config from "../../config.js";

export default class MySection extends HTMLElement {
    static url = import.meta.url;
    static async components(){
        return await (await fetch(config.endPoint(MySection.url).replace(".js", ".html"))).text();
    }
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        Promise.resolve(MySection.components()).then(html => {
            this.shadowRoot.innerHTML = html;
        });
    }
}
customElements.define(config.name(MySection.url), MySection);