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
            },
            methods: {
                add_user_listener: function () {
                    if(this.users.length > 0) {
                        let mm = this.getChildren(this.getChildrenLength() - 1);
                        if(mm && mm.username == "" && mm.password == "")
                            return;
                    }
                    this.users.push(["", ""]);
                }
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
        let valid_children: number = this.getChildrenLength();
        if(valid_children <= i) return false;
        return true;
    } //}

    private getChildren(i: number): UserSlot //{
    {
        if(!this.validIndexOfChild(i)) {
            console.error("bad index");
            return null;
        }

        let valid_children: number = -1;
        for(let k=0;k<this.vnode().children.length;k++) {
            let child = this.vnode().children[k];
            if(!this.valid_child_vnode(child)) continue;
            valid_children++;
            if(valid_children == i) return child.children[0].componentInstance as UserSlot;
        }

        return null;
    } //}

    private getChildrenLength(): number //{
    {
        if(this.vnode().children.length == 0) return 0;
        let valid_children: number = 0;
        for(let k=0;k<this.vnode().children.length;k++) {
            let child = this.vnode().children[k];
            if(!this.valid_child_vnode(child)) continue;
            valid_children++;
        }
        return valid_children;
    } //}

    private valid_child_vnode(vn: Vue.VNode): boolean //{
    {
        if(!vn.tag || vn.tag.toLowerCase() != 'li') return false;
        if(vn.children.length != 1) return false;
        if(!vn.children[0].componentInstance) return false;
        return true;
    } //}
} //}

let registered: boolean = false;
export function registerVueComponentConfigUsers() {
    if(registered) return;
    Vue.component("config-users", ConfigUsers);
    console.debug("registered <config-users> component");
    registered = true;
}
