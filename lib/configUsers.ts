import Vue from 'vue';
import { IUsersInfo, UsersInfo } from './Datas';
import { UserSlot, registerVueComponentUserSlot } from './UserSlot';
registerVueComponentUserSlot();


export class ConfigUsers extends Vue implements IUsersInfo //{
{
    public static __template = "#config-users";
    public users: [string, string][];
    private m_update_config: boolean;

    constructor() {
        super({
            template: ConfigUsers.__template,
            data: new UsersInfo(),
            updated: function () {
                if(!this.m_update_config) return;
                this.m_update_config = false;
                this.__update_config();
            }
        });
        this.m_update_config = false;
    }

    public update_config(config: IUsersInfo) //{
    {
        this.users = config.users;
        this.m_update_config = true;
    } //}

    private __update_config() //{
    {
        for(let i=0;i<this.getChildrenLength();i++)
            this.getChildren(i).update_config(this.users[i][0], this.users[i][1]);
    } //}

    private vnode(): Vue.VNode {return this["_vnode"];} // TODO ($vnode === undefined)

    private validIndexOfChild(i: number): boolean //{
    {
        if(this.vnode().children.length <= i) return false;
        for(let k=0;k<this.vnode().children.length;k++) {
            let child = this.vnode().children[i];
            if(!child.tag || child.tag.toLowerCase() != 'li') return false;
            if(child.children.length != 1) return false;
            if(!child.children[0].componentInstance) return false;
        }
        return true;
    } //}

    private getChildren(i: number): UserSlot //{
    {
        if(!this.validIndexOfChild(i)) {
            console.error("bad index");
            return null;
        }

        return this.vnode().children[i].children[0].componentInstance as UserSlot;
    } //}

    private getChildrenLength(): number //{
    {
        if(!this.validIndexOfChild(0)) return 0;
        return this.vnode().children.length;
    } //}
} //}

let registered: boolean = false;
export function registerVueComponentConfigUsers() {
    if(registered) return;
    Vue.component("config-users", ConfigUsers);
    console.debug("registered <config-users> component");
    registered = true;
}
