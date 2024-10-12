import {c, css} from "atomico";

export const Splitter= c(function Split() {
    return (
        <host shadowDom class={"container"}>
            <div class={"block horizontal max-h-full  right-auto border-2 w-2/3"}>
                <slot name="col-1"></slot>
            </div>

            <div class={"block horizontal max-h-full  right-auto border-2 w-1/3"}>
                <slot name="col-2"></slot>
            </div>
        </host>
    );
}, {
    styles: css`
		@tailwind base;
        @tailwind components;
        @tailwind utilities;
        @tailwind screens;
	    :host {
            width: 100%;
            height: 100%;
		    display: flex;
		    align-items: center;
		    justify-content: center;
		    min-height: 100%;
            max-height: 100%;
	    }

	    div {
		    height: 90%; 
		    margin: 0 1rem;
		    overflow-x: auto;
		    &.both {
			    resize: both;
		    }
            &.horizontal {
                resize: horizontal;
            }
            &.vertical {
                resize: vertical;
            }
		 
	    }
        ::slotted(*) {
 	        height: 100%;
            min-width: 100%; 
            width: 100%;
        }
     
    `
});

