import Vue from 'vue';

/** user defined components */
import { ConfigTab, registerVueComponentConfigTab} from './ConfigTab';
import { SelectList, registerVueComponentSelectList } from './SelectList';
import { AConfig } from './Datas';
registerVueComponentConfigTab();
registerVueComponentSelectList();


export class AllTabs extends Vue {
    public static __template = "#all-tabs";
    private m_configs: AConfig[];
    private m_run_updated_hook: boolean;
    private m_display_index: number;


    constructor() //{
    {
        super({
            template: AllTabs.__template,
            data: {"m_configs": []},
            updated: function () {
                if(this.m_run_updated_hook) {
                    this.__update_config();
                    this.m_run_updated_hook = false;
                }
            },
            mounted: function() {
                this.__init__this();
            }
        });

        this.m_display_index = -1;
        this.m_run_updated_hook = false;
    } //}

    private __init__this() //{
    {
        this.update_config([]);

        this.getSelector().$on("change", (loc: number) => {
            if(loc < 0) return;
            this.selectDisplay(loc);
        });

        setTimeout(() => {              // FIXME
            let n = new AConfig();
            n.bind_addr = "www.example.com";
            n.users = [["user", "pass"]];
            n.configName = "something";
            this.update_config([n]);
        }, 50);
    } //}

    public update_config(configs: AConfig[]) //{
    {
        let empty_config = new AConfig();
        empty_config.run = false;
        empty_config.serverId = -1;

        let names = [];
        configs.map(x => names.push(x.configName));
        this.getSelector().update_config(names);

        configs.push(empty_config);
        this.m_configs = configs;

        this.m_run_updated_hook = true;
    } //}

    private __update_config() //{
    {
        for(let i=0;i<this.getChildrenLength(); i++)
            this.getChildren(i).update_config(this.m_configs[i]);

        if(this.m_display_index < this.getChildrenLength() && this.m_display_index >= 0)
            this.selectDisplay(this.m_display_index);
        else
            this.selectDisplay(0);
    } //}

    private vnode(): Vue.VNode {return this["_vnode"];} // TODO ($vnode === undefined)

    private validIndexOfChild(i: number): boolean //{
    {
        let valid_children: number = this.getChildrenLength();
        if(valid_children <= i) return false;
        return true;
    } //}

    private getChildren(i: number): ConfigTab //{
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
            if(valid_children == i) return child.children[0].componentInstance as ConfigTab;
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

    private getSelector(): SelectList //{
    {
        return this.vnode().children[0].componentInstance as SelectList;
    } //}

    private valid_child_vnode(vn: Vue.VNode): boolean //{
    {
        if(!vn.tag || vn.tag.toLowerCase() != 'li') return false;
        if(vn.children.length != 1) return false;
        if(!vn.children[0].componentInstance) return false;
        return true;
    } //}

    private selectDisplay(i: number) //{
    {
        if(!this.validIndexOfChild(i)) {
            console.error("bad index");
            return;
        }

        if(this.m_display_index >= 0 && this.validIndexOfChild(i))
            this.getChildren(this.m_display_index).hide();

        this.getChildren(i).show();
        this.m_display_index = i;
    } //}
}

let registered: boolean = false;
export function registerVueComponentAllTabs() {
    if(registered) return;
    Vue.component("all-tabs", AllTabs);
    console.debug("registered <all-tabs> component");
    registered = true;
}

