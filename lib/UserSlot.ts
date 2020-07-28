import Vue from 'vue';

export class UserSlot extends Vue {
    public static __template = "#user-slot";
    public username: string;
    public password: string;

    constructor() {
        super({
            template: UserSlot.__template,
            data: {
                username: "",
                password: ""
            }
        });
    }

    public update_config(_username: string, _password: string) {
        this.username = _username;
        this.password = _password;
    }
}

let registered: boolean = false;
export function registerVueComponentUserSlot() {
    if(registered) return;
    Vue.component("user-slot", UserSlot);
    console.debug("registered <user-slot> component");
    registered = true;
}
