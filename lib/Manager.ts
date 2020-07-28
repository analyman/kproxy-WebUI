import Vue from 'vue';
import Component from 'vue-class-component';


@Component({
    template: "#manager",
})
export class Manager extends Vue {
    constructor() {
        super();
    }
}

let registered: boolean = false;
export function registerVueComponentManager() {
    if(registered) return;
    Vue.component("manager", Manager);
    console.debug("registered <manager> component");
    registered = true;
}

