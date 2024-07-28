import {YProps} from "./props";
import {define} from "@atomico/storybook";
import {c, css} from "atomico";
import "./array";
import * as Y from 'yjs';

export default {
    title: "@y-block/primitives/props",
    ...define(YProps),
    args: {
        title: "This is a title",
        content: "fugiat veniam quis incididunt anim eiusmod nulla minim sunt  ullamco ipsum nisi anim culpa dolore ex ut consectetur commodo",
        date: "2021-01-01"
    }

};

customElements.define("example-component", c(({title, content, date}) => {
    return <host shadowDom>
        <div>
         <pre prettytext style={{
             padding: "10px",
             border: "1px solid #ccc",
             borderRadius: "5px",
             boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
             whiteSpace: "pre-wrap",
             overflow: "hidden",
         }}> <span>
             <h1 style="display: inline;  text-align: left;">{title}</h1>
           <p style="display: inline; inset-inline-start: 20px; padding: 10px;  overflow: hidden;">{content}</p>
         <footer style="display:block; float: right;">
             <span>{date}</span>
         </footer>
             </span> 
        </pre>
        </div>
    </host>
}, {
    props: {
        title: String,
        content: String,
        date: String
    },
    styles: css`
		:host {
			display: block;
			padding: 20px;
			border: 1px solid #ccc;
			border-radius: 5px;
			box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
			margin-bottom: 20px;
		}

		h1 {
			font-size: 20px;
			margin: 0 0 10px;
		}

		p {
			margin: 0;
		}

		footer {
			color: #666;
			font-size: 14px;
		}
    `

}))

export const Story = (props) => {
    return <y-props props={props}>
        <example-component/>
    </y-props>
}


export const WithYArray = (props) => {
    const productCard = () => {

    }
    const array = new Y.Doc().getArray("array");
    array.push([{
        title: "This is a title",
        content: "fugiat veniam quis incididunt anim eiusmod nulla minim sunt  ullamco ipsum nisi anim culpa dolore ex ut consectetur commodo",
        date: "2021-01-01"
    }, {
        title: "This is also a title",
        content: "get the latest news from the world of fashion. what's new this season, what's trending, and what's hot. find out more about the latest fashion trends and styles.",
        date: "2022-03-03"
    }, {
        title: "This is another title",
        content: "incididunt anim eiusmod nulla minim sunt  ullamco ipsum nisi anim culpa dolore ex ut consectetur commodo",
        date: "2024-09-01"
    }, {
        title: "This is a title",
        content: "commedo fugiat veniam quis incididunt anim eiusmod nulla minim sunt",
        date: "2022-01-23"
    }])

    //component
    return <y-array array={array} style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "20px"
    }}>
        <y-props>
            <example-component/>
        </y-props>
    </y-array>

}
