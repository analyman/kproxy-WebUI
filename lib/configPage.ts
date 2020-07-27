import Vue from 'vue';
import Component from 'vue-class-component';


@Component({
    template: "#config-page",
})
export class Configpage extends Vue {
    public name: string;
    public bind_addr: string;
    public bind_port: number;
    public certificate: string;
    public private_key: string;
    public ciphers: string;

    constructor() {
        super();
        this.name      = "";
        this.bind_addr = "";
        this.bind_port = -1;
        this.certificate = "";
        this.private_key = "";
        this.ciphers = "";
    }
}
Vue.component("config-page", Configpage);

