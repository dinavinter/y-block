import { YArray } from "@y-block/array";
import { define } from "@atomico/storybook";
import * as Y from 'yjs';
import {c,css} from "atomico";

export default {
    title: "@y-block/array",
    ...define( YArray)
};

export const Story = (props) =><y-array array={yarray(["from y-array!", "item 2"])}>
    <input $:placeholder="item" />
</y-array>;
  
export const WithObjects = (props) => <y-array array={yarray([
    {firstName: "Hello", lastName:"Array!", style:{padding: "5px", margin: "5px"}},
    {firstName: "So", lastName:"Sweet!", style:{padding: "5px", margin: "5px"}}])}>
    <input $:placeholder="firstName" $:style="style" />
    <input $:placeholder="lastName"  $:style="style" /> 
</y-array>;
    
    
 
export const Lazy = (props) => { 
    const lazyArray = new Y.Doc().getArray<{idx:number, text:string}>("array");
    lazyArray.push([{text: "Lazy loading.." , idx: 1}])
    setInterval(() =>{
        if(lazyArray.length >= 10) {
            lazyArray.delete(0, 5) 
        }
       
        const idx = lazyArray.get(lazyArray.length-1).idx + 1;
        lazyArray.push([{text: `item ${idx}` , idx: idx}])
    } , 1000)
    
    return <y-array  array={lazyArray}>
        <input $:placeholder="text"  />
    </y-array>;
}


 
 
export const Gallery = (props) => {
    const array = new Y.Doc().getArray("array");
    array.push([ {
        id: 1,
        name: 'Basic Tee',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
        price: '$35',
        color: 'Black',
    },   {
        id: 2,
        name: 'Fashion Hat',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
        imageAlt: "Fashion Hat.",
        price: '$25',
        color: 'Brown',
    },
        {
            id: 3,
            name: 'Long Sleeve Shirt',
            href: '#',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg',
            imageAlt: "Long Sleeve Shirt.",
            price: '$40',
            color: 'Blue',
        },
        {
            id: 4,
            name: 'Simple Backpack',
            href: '#',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-03.jpg',
            imageAlt: "Simple Backpack.",
            price: '$70',
            color: 'Gray',
        }])
    // array.push([{ name: "Product 2", price: 200, img: "https://via.placeholder.com/300" }])
 
    return  <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 ">
    <y-array array={array} style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "20px"
    }} >
       <product-card-example  $:name={"name"} $:id={"id"}  $:color={"color"} $:image-alt={"imageAlt"}  $:image-src="imageSrc" $:price="price" $:href="href"></product-card-example>
    </y-array>
    </div>
 
}



customElements.define("product-card-example", c(function({name, price, imageSrc, imageAlt, href, color}) {

    return <host   shadowDom>
        <div class={"block group relative px-6"}>
            <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80" >
                <img src={imageSrc} alt={imageAlt} class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
            </div>

            <div class="mt-4 flex justify-between">
                <div>
                    <h3 class="text-sm text-gray-700">
                        <a href={href}>
                            <span aria-hidden="true" class="absolute inset-0" />
                            { name }
                        </a>
                    </h3>
                    <p class="mt-1 text-sm text-gray-500">{ color }</p>
                </div>
                <p class="text-sm font-medium text-gray-900 relative">{ price }</p>
            </div>
        </div>
    </host>
}, {
    styles: css`
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
	@tailwind screens;
    :host {
        display: block;
    }
    `,

    props: {
        name: String,
        price: String,
        imageSrc: String,
        imageAlt: String,
        href: String,
        color: String

    }
}));


function yarray(elements) {
    const array = new Y.Doc().getArray("array");
    array.push(elements)
    return array;
}