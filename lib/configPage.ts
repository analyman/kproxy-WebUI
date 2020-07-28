import Vue from 'vue';

interface IConfigInfo {
    name: string;
    bind_addr: string;
    bind_port: number;
    certificate: string;
    private_key: string;
    ciphers: string;
}
export class ConfigInfo implements IConfigInfo //{
{
    public name: string = "";
    public bind_addr: string = "";
    public bind_port: number = 0;
    public certificate: string = "";
    public private_key: string = "";
    public ciphers: string = "";
} //}

export class ConfigPage extends Vue implements IConfigInfo //{
{
    public static __template = "#config-page";

    public name: string;
    public bind_addr: string;
    public bind_port: number;
    public certificate: string;
    public private_key: string;
    public ciphers: string;

    constructor() //{
    {
        super({
            template: ConfigPage.__template,
            data: new ConfigInfo(),
        });
    } //}

    public update_config(info: IConfigInfo) //{
    {
        this.name      = info.name;
        this.bind_addr = info.bind_addr;
        this.bind_port = info.bind_port;
        this.certificate = info.certificate;
        this.private_key = info.private_key;
        this.ciphers = info.ciphers;
    } //}
} //}

let registered: boolean = false;
export function registerVueComponentConfigPage() {
    if(registered) return;
    Vue.component("config-page", ConfigPage);
    console.debug("registered <config-page> component");
    registered = true;
}

