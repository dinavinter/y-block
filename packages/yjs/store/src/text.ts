import { useEffect, useProp } from "atomico";
import * as Y from "yjs";
import { useDocStore } from "./doc";
import { useRender } from "@atomico/hooks/use-render";
import { usePropProxy } from "@atomico/hooks/use-prop-proxy";

function useYText(prop) {
    const [value, setValue] = useProp<string>(prop);
    const { doc } = useDocStore();

    useEffect(() => {
        doc &&
            doc.getText(prop).observe(() => {
                setValue(doc.getText(prop).toString());
            });
    }, [doc]);

    

    return {
        value,
        increment() {
            setValue(value + 1);
        },
    };
}

function useYTextPropProxy(prop) {
    const [value, setValue] = useProp(prop);
    const { doc } = useDocStore();

    usePropProxy(prop, {
        get() {
            return doc && doc.getText(prop);
        },
        set(value) {
            doc && doc.getText(prop).insert(0, value?.toJSON());
        },
    });
}
