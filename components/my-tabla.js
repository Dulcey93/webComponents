let pathName = new URL(import.meta.url).pathname;
let name = pathName.split("/").pop().replace(".js", "");
console.log(name);

export default class myTabla extends HTMLElement {
    static async components(){
        return await (await fetch(pathName.replace(".js", ".html"))).text();
    }
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        Promise.resolve(myTabla.components()).then(html => {
            this.shadowRoot.innerHTML = html;
        });
        console.log("Etiqueta renderizada");
    }
}
customElements.define(name, myTabla);