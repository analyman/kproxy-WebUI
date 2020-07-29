import Vue from 'vue';


export class Manager extends Vue {
    public static __template = "#manager";

    constructor() {
        super({
            template: Manager.__template,
            methods: {
                start: function() {},
                stop : function() {},

                _delete: function() {},

                update_all: function() {},
                update_current: function() {},
                update_remain: function() {},

                upload_all: function() {},
                upload_current: function() {},
                upload_remain: function() {},
            }
        });
    }
}

let registered: boolean = false;
export function registerVueComponentManager() {
    if(registered) return;
    Vue.component("manager", Manager);
    console.debug("registered <manager> component");
    registered = true;
}

