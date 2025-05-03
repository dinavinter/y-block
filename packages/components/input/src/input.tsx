import { c, css, useEffect, useMemo, useProp, Props } from "atomico";
import { useDocStore, useSyncedDoc } from "@y-block/store";
import { HocuspocusProvider } from "@hocuspocus/provider";
import * as Y from "yjs";
declare global {
  interface HTMLElementTagNameMap {
    "y-input": typeof YInput
  }
}
declare namespace JSX {
  interface IntrinsicElements {
    "y-input": typeof YInput
  }
}

function input({  component= "codemirror", required=false ,document}: Props<typeof input>) {
  const [value, setValue] = useProp<string>("value");
  const [_, setValidity] = useProp<Partial<ValidityState> &{message?:string}>("validity");
  const {doc} = document ?{doc:document} : useDocStore();

  const yText = useMemo(() => doc.getText(component), [doc, component]);

  
  useEffect(() => {
    setValue(yText.toJSON());
    const handler = (event: Y.YTextEvent) => {
      const newValue = event.target.toJSON();
      console.log("input:new", newValue);
      setValue(newValue);
      validate(newValue);
    };
    yText.observe(handler);
    return () => {
      // yText.unobserve(handler);
    };
  }, [yText]);

  function validate(val = value) {
    if (required && !val) {
      setValidity({ valueMissing: true, message: "This field is required" });
    } else {
      setValidity({});
    }
  }

  return (
    <host> 
      <slot></slot>
    </host>
  );
}

input.props ={
  value: {
    type: String,
    reflect: true,
    event: {
      type: "change", 
      bubbles: true,
      composed: true,
    }
  },
  
  component: {
    type: String,
    default: "codemirror",
    reflect: true,
  },
  required: {
    type: Boolean,
    required: false,
  },
  document: {
    type: Object,
    required: false,
    
  },
  validity: {
    type: Object ,
    value: {
      message: "",
    } as Partial<ValidityState> &{message?:string} ,
    event: {
      type: "validitychange", 
      bubbles: true,
      composed: true,
    }
  }
};
  

export function connectHocuspocus({url="ws://localhost:1234",name="default",broadcast=true,forceSyncInterval=1000,connect=true,document}: Props<typeof connectHocuspocus>){
  const {doc} = document ?{doc:document} : useDocStore();
 
  useEffect(()=>{
    const provider = new HocuspocusProvider({
      url: url ,
      name: name,
      document: doc,
      connect: connect,
      broadcast: broadcast,
      forceSyncInterval: forceSyncInterval,
      onConnect: () => {
          console.log("connected to", url, name, doc.guid);
      }
  });
  return  ()=>provider.destroy();
},[doc])

return <host></host>
}
connectHocuspocus.props={
  url: {
    type: String,
    required: true,
    default: "ws://localhost:1234",
  },
  name: {
    type: String,
    required: true,
    default: "default",
  },
  broadcast: {
    type: Boolean,
    required: false,
    reflect: true,
    default: true,
  },
  connect: {
    type: Boolean,
    required: false,
    reflect: true,
    default: true,
  },
  document: {
    type: Object,
    required: false,
    attribute: "document",
    reflect: false
  },
  forceSyncInterval: {
    type: Number,
    required: true,
    attribute: "force-sync-interval",
  }
}

customElements.define("y-hocuspocus", c(connectHocuspocus));

export const YInput =  c(input, {
  props: input.props,
  base:class extends HTMLElement {
    static formAssociated = true;
    internals: ElementInternals;
  
    constructor() {
      super();
      this.internals = this.attachInternals();
      this.addEventListener("change", (e) => {
         if(e.target && "value" in e.target && typeof e.target.value === "string"){
          console.log("input:change", e.target.value);
         this.internals.setFormValue(e.target.value);
         }
      });
    } 
  },  
  styles:css`
    :host {
      display: none; 
    }
  ` 
  
});

export default YInput;

customElements && customElements.define("y-input", YInput);



 