import {injectGlobal} from "@twind/core";
// import config from '../twind.config.js'
// import install from '@twind/with-web-components'
//  
// injectGlobal`
//     main .splitpanes.default-theme .splitpanes__pane {
//       background-color: inherit;
//       overflow: visible;
//     }
//
//     main .splitpanes.default-theme {
//       & .splitpanes__splitter {
//         @apply bg-brand-6 border-brand-7;
//
//         &::before,&::after {
//           @apply z-30;
//         }
//       }
//
//       &.splitpanes--vertical .splitpanes__splitter {
//         @apply w-px;
//       }
//
//       &.splitpanes--horizontal .splitpanes__splitter {
//         @apply h-px;
//       }
//     }
//   `

     // Based on https://github.com/tailwindlabs/play.tailwindcss.com/blob/master/src/css/main.css

import {c, css, useEffect, useHost, useRef, useState} from 'atomico';
import {useDragResize} from "./useDragResize";
 
export const Layout =c(function Layout() {
  const [size, setSize] = useState(50);
  const refDragTrigger = useRef();
  const refParent = useRef();
    const host = useHost();

    const { active, position }  = useDragResize(
      refDragTrigger,
      0.5 
      
  );
    
    useEffect(() => {
        console.log("changed", active,{position});
        const {left: hostLeft, right: hostRight} = host.current.getBoundingClientRect();
        const hostWidth = hostRight - hostLeft;
        const rhsMinWidth = 100;
        const rhsMaxWidth = hostWidth - 100;
        const rhs= refParent.current;
        const rhsStyle = rhs.style;
        const rhsWidth = Math.min(
            rhsMaxWidth,
            Math.max(rhsMinWidth, hostRight - position.x)
        );
        const percent = (rhsWidth / hostWidth) * 100;
        rhsStyle.setProperty('--split-x', `${rhsWidth / hostWidth}`);
        rhsStyle.setProperty('--split-y', `${rhsWidth / hostWidth}`);

    })
    
    
  //
    
    
  const onDrag = ({pointerId}: PointerEvent) => {
      const bar = refDragTrigger.current;
      bar.setPointerCapture(pointerId);
      const rhs= refParent.current;
      const rhsStyle = rhs.style; 
      const {left: hostLeft, right: hostRight} = host.current.getBoundingClientRect();
      const hostWidth = hostRight - hostLeft;
      const rhsMinWidth = 100;
      const rhsMaxWidth = hostWidth - 100;
      const onPointermove = (event: PointerEvent) => {
          const rhsWidth = Math.min(
              rhsMaxWidth,
              Math.max(rhsMinWidth, hostRight - event.clientX)
          );
          const percent = (rhsWidth / hostWidth) * 100;
          rhsStyle.setProperty('--split-x', `${rhsWidth / hostWidth}`);
          rhsStyle.setProperty('--split-y', `${rhsWidth / hostWidth}`);
          
      };

      bar.addEventListener('pointermove', onPointermove);
      const onPointerup = () => {
          bar.releasePointerCapture(pointerId);
          bar.removeEventListener('pointermove', onPointermove);
          bar.removeEventListener('pointerup', onPointerup);
      };
      bar.addEventListener('pointerup', onPointerup);


  };

    useEffect(() => {
        if (active) {
            // setSize(s=> s + x);
            console.log("changed", active,{position});

            //     console.log("changed", {x, y});
        //     refParent.current.style.width = x * 100 + "%";
        }
    }, [active,position]);
    //style={{width : `${x * 100}%` }}
    // pointerdown={onDrag}

    return (
      <host shadowDom>

              <div className={` bg-brand-2  code`} ref={refParent}>
                  <div ref={refDragTrigger}
                       // onDrag={onDrag}
                       className={`absolute start-1/2 z-20  drag w-[20px] min-w-12 bg-gray-900 cursor-col-resize    h-full     `}></div>

                  <slot name={"col-1"}/>
              </div>

              <div className={`preview  bg-brand-2 `}>

                  <slot name={"w-full col-2"}/>
              </div>

              {/*<div class="splitter" onmousedown={() => document.addEventListener('mousemove', onDrag)}></div>*/}

      </host>
    );
}, {
    styles: css`
		@tailwind base;
		@tailwind components;
		@tailwind utilities;
		@tailwind screens;

	    :host {
		    height: 100%;
		    display: flex;
		    gap: 0;
		    padding: 2rem;
		    box-sizing: border-box;
		    background: var(--container-background);
	    }

		.code {
			width: 100%;
			max-width: calc(100% * var(--split-x));
	    }
	    .preview {
		    flex: 0%;
		    min-width: 280px;
	    }

		#resizeBar {
			position: relative;
			top: 0;
			left: -5px;
			width: 10px;
			height: 100%;
			z-index: 9;
			cursor: col-resize;
		}

		#resizeOverlay {
			display: none;
		}

		#resizeOverlay.resizing {
			display: block;
			position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 99999;
      cursor: col-resize;
    }
    
    

    .splitter {
      width: 10px;
      cursor: col-resize;
      background: #ddd;
    }
  `,
});
 
customElements.define("y-splitter", Layout);

