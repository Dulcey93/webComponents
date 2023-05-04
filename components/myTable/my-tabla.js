import config from "../../config.js";

export default class MyTabla extends HTMLElement {
    static url = import.meta.url;
    static async components(){
        return await (await fetch(config.endPoint(MyTabla.url).replace(".js", ".html"))).text();
    }
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        Promise.resolve(MyTabla.components()).then(html => {
            this.shadowRoot.innerHTML = html;
        });
        console.log("Etiqueta renderizada");
    }
}
customElements.define(config.name(MyTabla.url), MyTabla);