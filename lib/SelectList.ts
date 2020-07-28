import Vue from 'vue';


const active_str = "active"


export class SelectList extends Vue {
    public static __template = "#select-list";
    private m_names: [number, string][];
    private m_display_index: number;


    constructor() //{
    {
        super({
            template: SelectList.__template,
            data: {"m_names": []},
            mounted: function () {
                this.$el.firstElementChild.dispatchEvent(new CustomEvent("click", {}));
            },
            methods: {
                click_listener: function (event: CustomEvent) {
                    console.log("change emit");
                    let elem = event.target as HTMLElement;
                    if(!elem.tagName || elem.tagName.toLowerCase() != "li") return;
                    event.stopPropagation();
                    let loc__ = elem.dataset["location"] || "-1";
                    let loc   = parseInt(loc__);
                    this.$emit("change", loc);

                    let p = elem.previousElementSibling;
                    while(p) {
                        p.classList.remove(active_str);
                        p = p.previousElementSibling;
                    }
                    let n = elem.nextElementSibling;
                    while(n) {
                        n.classList.remove(active_str);
                        n = n.nextElementSibling;
                    }

                    elem.classList.add(active_str);
                }
            }
        });

        this.m_display_index = -1;

        this.update_config([]);
    } //}

    public update_config(names: string[]) //{
    {
        let the = [];
        let i = 0;
        names.push("+");
        names.map(x => the.push([i++, x]));
        this.m_names = the;
    } //}
}

let registered: boolean = false;
export function registerVueComponentSelectList() {
    if(registered) return;
    Vue.component("select-list", SelectList);
    console.debug("registered <select-list> component");
    registered = true;
}

