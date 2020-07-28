import Vue from 'vue';

/** user defined components */
import { ConfigPage,  registerVueComponentConfigPage} from './configPage';
import { ConfigUsers, registerVueComponentConfigUsers } from './configUsers';
import { IUsersInfo, IConfigInfo, AConfig, IServerStatus, ServerStatus } from './Datas';
registerVueComponentConfigPage();
registerVueComponentConfigUsers();


export class ConfigTab extends Vue implements IServerStatus //{
{
    public static __template = "#config-tab";
    is_actived: boolean = false;
    configName: string = "";
    serverId: number = -1;
    run: boolean = false;
    locationId: number = -1;

    constructor() //{
    {
        super({
            template: ConfigTab.__template,
            data: {"is_actived": false}
        });
    } //}

    private getConfig(): ConfigPage //{
    {
        let vnode = this.vnode();
        if(!vnode || !vnode.children || vnode.children.length == 0) return null;
        return vnode.children[0].componentInstance as ConfigPage;
    } //}
    private getUsers(): ConfigUsers //{
    {
        let vnode = this.vnode();
        if(!vnode || !vnode.children || vnode.children.length <= 1) return null;
        return vnode.children[2].componentInstance as ConfigUsers;
    } //}

    private vnode(): Vue.VNode {return this["_vnode"];} // TODO ($vnode === undefined)

    public update_config(config: AConfig) //{
    {
        this.getConfig().update_config(config);
        this.getUsers().update_config(config);
        this.__update_config(config);
    } //}

    private __update_config(config: IServerStatus) {
        this.configName = config.configName;
        this.serverId = config.serverId;
        this.run = config.run;
        this.locationId = config.locationId;
    }

    public get_config(): AConfig {return null;}
    public show() {this.is_actived = true;}
    public hide() {this.is_actived = false;}
} //}

let registered: boolean = false;
export function registerVueComponentConfigTab() {
    if(registered) return;
    Vue.component("config-tab", ConfigTab);
    console.debug("registered <config-tab> component");
    registered = true;
}
