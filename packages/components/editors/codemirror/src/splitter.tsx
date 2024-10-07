import {c, css, useCallback, useRef} from "atomico";
//https://phuoc.ng/collection/react-drag-drop/create-resizable-split-views/
export const Splitter =c(function ()  {
    const containerRef =  useRef<HTMLDivElement>();
    const firstHalfRef =  useRef<HTMLDivElement>();
    const secondHalfRef =  useRef<HTMLDivElement>();
    const resizerRef =  useRef<HTMLDivElement>();

    const handleMouseDown =  useCallback((e: MouseEvent) => {
        if(!firstHalfRef.current || !containerRef.current || !secondHalfRef.current || !resizerRef.current ) {
            console.debug("splitter:handleMouseDown:missing", {firstHalfRef: firstHalfRef.current, containerRef: containerRef.current, secondHalfRef: secondHalfRef.current, resizerRef: resizerRef.current})
        }
        
        const startPos = {
            x: e.clientX,
            y: e.clientY,
        };
        const currentLeftWidth = firstHalfRef.current.getBoundingClientRect().width;

        const handleMouseMove = (e: MouseEvent) => {
            const dx = e.clientX - startPos.x;
            const dy = e.clientY - startPos.y;
            updateWidth(currentLeftWidth, dx);
            updateCursor();
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            resetCursor();
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, [firstHalfRef.current]);

    const handleTouchStart = useCallback((e: TouchEvent) => {
        const touch = e.touches[0];
        const startPos = {
            x: touch.clientX,
            y: touch.clientY,
        };
        const currentLeftWidth = firstHalfRef.current.getBoundingClientRect().width;

        const handleTouchMove = (e: TouchEvent) => {
            const touch = e.touches[0];
            const dx = touch.clientX - startPos.x;
            const dy = touch.clientY - startPos.y;
            updateWidth(currentLeftWidth, dx);
            updateCursor();
        };

        const handleTouchEnd = () => {
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
            resetCursor();
        };

        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);
    }, []);

    const updateWidth = (currentLeftWidth: number, dx: number) => {
        const container = containerRef.current;
        const firstHalfEle = firstHalfRef.current;

        if (!container || !firstHalfEle) {
            return;
        }

        const containerWidth = container.getBoundingClientRect().width;
        const delta = currentLeftWidth + dx;
        const newFirstHalfWidth = delta * 100 / containerWidth;
        firstHalfEle.style.width = `${newFirstHalfWidth}%`;
    };

    const updateCursor = () => {
        const container = containerRef.current;
        const firstHalfEle = firstHalfRef.current;
        const resizerEle = resizerRef.current;
        const secondHalfEle = secondHalfRef.current;

        if (!container || !firstHalfEle || !resizerEle || !secondHalfEle) {
            return;
        }

        resizerEle.style.cursor = 'ew-resize';
        document.body.style.cursor = 'ew-resize';
        firstHalfEle.style.userSelect = 'none';
        firstHalfEle.style.pointerEvents = 'none';
        secondHalfEle.style.userSelect = 'none';
        secondHalfEle.style.pointerEvents = 'none';
    };

    const resetCursor = () => {
        const container = containerRef.current;
        const firstHalfEle = firstHalfRef.current;
        const resizerEle = resizerRef.current;
        const secondHalfEle = secondHalfRef.current;

        if (!container || !firstHalfEle || !resizerEle || !secondHalfEle) {
            return;
        }

        resizerEle.style.removeProperty('cursor');
        document.body.style.removeProperty('cursor');
        firstHalfEle.style.removeProperty('user-select');
        firstHalfEle.style.removeProperty('pointer-events');
        secondHalfEle.style.removeProperty('user-select');
        secondHalfEle.style.removeProperty('pointer-events');
    };

    return (<host shadowDom>
        <div className="splitter" ref={containerRef}>
            <div className="splitter__first" ref={firstHalfRef}>
                Left
            </div>
            <div
                className="splitter__resizer"
                ref={resizerRef}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
            />
            <div className="splitter__second" ref={secondHalfRef}>
                Right
            </div>
        </div>
        </host>
    );
}, {
    styles: css`
    .splitter {
    border: 1px solid rgb(203 213 225);
    align-items: center;
    display: flex;

    height: 24rem;
    width: 100%;
}
.splitter__first {
    width: 50%;
    height: 100%;

    align-items: center;
    display: flex;
    justify-content: center;
}
.splitter__resizer {
    background: rgb(203 213 225);
    height: 100%;
    width: 2px;

    cursor: ew-resize;
    user-select: none;
    touch-action: none;
}
.splitter__second {
    flex: 1;

    align-items: center;
    display: flex;
    justify-content: center;
}`

})

customElements && customElements.define && customElements.define("y-split", Splitter);