import {c, css} from "atomico";
import {useRender} from "@atomico/hooks/use-render";

customElements.define("state-toggle-idle", c(function toggleIdle() {
    return <host shadowDom>
        <div class="border  shadow rounded-md p-4 max-w-sm w-full mx-auto">
            <div class="animate-pulse flex space-x-4">
                <div class="rounded-full bg-slate-200 h-10 w-10"></div>
                <div class="flex-1 space-y-6 py-1">
                    <div class="h-2 bg-slate-200 rounded"></div>
                    <div class="space-y-3">
                        <div class="grid grid-cols-3 gap-4">
                            <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                            <div class="h-2 bg-slate-200 rounded col-span-1"></div>
                        </div>
                        <div class="h-2 bg-slate-200 rounded"></div>
                    </div>
                </div>
            </div>
        </div>

    </host>
}, {
    styles: css`
         @tailwind base;
         @tailwind components;
         @tailwind utilities;
         @tailwind screens;
        :host{
            display: block;
        }
    `
    }   )
);




customElements.define("toggle-pending", c(function togglePending() {
    return <div>pending</div>
}   ));

customElements.define("toggle-resolved", c(function toggleResolved() {
    return <div>resolved</div>
}   ));

customElements.define("toggle-rejected", c(function toggleRejected() {
    return <div>rejected</div>
}   ));


            
