import Vue from 'vue';
import Component from 'vue-class-component';

/** user defined components */
import { Manager, registerVueComponentManager } from './Manager';
import { AllTabs, registerVueComponentAllTabs } from './AllTabs';
registerVueComponentManager();
registerVueComponentAllTabs();


export class TheApp extends Vue {
    public static __template = "#the-app";
    constructor() {
        super({template: TheApp.__template});
    }

    private getManager(): Manager //{
    {
        let vnode = this.vnode();
        if(!vnode || !vnode.children || vnode.children.length == 0) return null;
        return vnode.children[0].componentInstance as Manager;
    } //}
    private getConfigTabs(): AllTabs //{
    {
        let vnode = this.vnode();
        if(!vnode || !vnode.children || vnode.children.length <= 1) return null;
        return vnode.children[2].componentInstance as AllTabs;
    } //}

    private vnode(): Vue.VNode {return this["_vnode"];} // TODO ($vnode === undefined)
}

