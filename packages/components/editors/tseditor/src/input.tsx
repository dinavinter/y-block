import { c, css, useEffect, useRef, useProp, Props } from "atomico";
import * as Y from "yjs";
import { HocuspocusProvider } from "@hocuspocus/provider";

 
declare global {
  interface HTMLElementTagNameMap {
    "yjs-text-input": ReturnType<typeof YjsTextInput>;
  }
}

function YjsTextInput({ url= "ws://localhost:1234" , room= "default", component= "codemirror", required=false }: Props<typeof YjsTextInput>) {
  const [value, setValue] = useProp<string>("value");
  const [_, setValidity] = useProp<Partial<ValidityState> &{message?:string}>("validity");
  const yDocRef = useRef<Y.Doc>(new Y.Doc({guid:room}));
  const yTextRef = useRef<Y.Text>(yDocRef.current.getText(component));


  useEffect(()=>{
        const provider = new HocuspocusProvider({
          url: url ,
          name: room,
          document: yDocRef.current,
          connect: true,
          broadcast: true,
          forceSyncInterval: 1000,
          onConnect: () => {
              console.log("connected to", url, room);
          }
      });
      return  ()=>provider.destroy();
  },[yDocRef.current])
  
  // Setup Yjs connection
  useEffect(() => { 
    setValue(yTextRef.current.toJSON());
    const handler = (event: Y.YTextEvent) => {
      const newValue = event.target.toJSON();
      setValue(newValue);
      validate(newValue); 
    };
    yTextRef.current.observe(handler);
    return () => {
      yTextRef.current.unobserve(handler);
    };
  }, [yTextRef.current]);

  // Validation
  function validate(val = value) {
    if (required && !val) {
      setValidity(
        { valueMissing: true ,message:"This field is required"}
      );
    } else {
       setValidity({});
    }
  } 

  return  <host>
    <slot></slot>
  </host>
}

YjsTextInput.props = {
  value: {
    type: String,
    event: {
      type: "change", 
      bubbles: true,
      composed: true,
    }
  },
  url: {
    type: String,
    default: "ws://localhost:1234",
  },
  room: {
    type: String,
    required: false,
  },
  component: {
    type: String,
    default: "codemirror",
  },
  required: {
    type: Boolean,
    required: false,
  },
  validity: {
    type: Object as Partial<ValidityState> &{message?:string},
    default: {
      message: "",
    },
    event: {
      type: "validitychange", 
      bubbles: true,
      composed: true,
    }
  },
};
  

export const yjsTextInput = c(YjsTextInput, {
  props: YjsTextInput.props,
  base:class extends HTMLElement {
    static formAssociated = true;
    internals: ElementInternals;
  
    constructor() {
      super();
      this.internals = this.attachInternals();
      this.addEventListener("change", (e) => {
         if(e.target && "value" in e.target && typeof e.target.value === "string"){
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

customElements && customElements.define("yjs-text-input", yjsTextInput);

export default yjsTextInput;
export { YjsTextInput }; 