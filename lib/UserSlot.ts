import Vue from 'vue';

export class UserSlot extends Vue {
    public static __template = "#user-slot";
    public username: string;
    public password: string;
    public passwork_type: string;
    private loc_id: number;

    constructor() {
        super({
            template: UserSlot.__template,
            data: {
                username: "",
                password: "",
                password_type: "password",
                password_checked: false
            },
            watch: {
                password_checked: function (newval: boolean, oldval: boolean) {
                    if(newval)
                        this.password_type = "";
                    else
                        this.password_type = "password";
                }
            },
            methods: {
                delete_slot: function () {
                    this.$emit("delete", this.loc_id);
                }
            }
        });
        this.loc_id = -1;
    }

    public update_config(_username: string, _password: string, id: number) {
        this.username = _username;
        this.password = _password;

        this.loc_id = id;
    }
}

let registered: boolean = false;
export function registerVueComponentUserSlot() {
    if(registered) return;
    Vue.component("user-slot", UserSlot);
    console.debug("registered <user-slot> component");
    registered = true;
}
