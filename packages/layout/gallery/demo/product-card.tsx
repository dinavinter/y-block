import {c, css} from "atomico";

export const ProductCard =c(function ({name, price, image, summary, href, spec}) {

    return <host shadowDom>
        <div class={"group relative ease-in-out duration-300  h-96 overflow-y-hidden rounded-lg"}>
            <div
                class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 transition-all ">
                <img src={image} alt={summary}
                     class="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
            </div>

            <div class="mt-4 flex justify-between  ">
                <div  class="w-9/12">
                    <h3 class="text-sm text-gray-700 overflow-ellipsis h-full overflow-y-hidden	z-9 overflow-x-hidden text-pretty ">
                        <span aria-hidden="true" class="absolute inset-0 overflow-ellipsis" />
                        {name}
                    </h3>
                    {spec?.split(" ")?.map(x=>x.split(':')?.[1]?.replaceAll('\'', ''))?.map((item, index) =>
                        <p key={index} class="mt-1 text-sm text-gray-500  float-left absolute bg-auto backdrop-blur-2xl rounded-3xl z-10">{item}</p>)
                    }
                </div>
                <p class="text-sm font-medium text-gray-900 start-full">{price}</p>
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
            @apply block;
            display: inline-block;
        }
        
        img{
            @apply transition-all;
            @apply duration-300;
            @apply ease-in-out;
            @apply transform;
            
            
        }
        
        
    `,

    props: {
        name: {
            type: String,
            reflect: true
        },
        price: {
            type: String,
            reflect: true
        },
        image: {
            type: String,
            reflect: true
        },
        summary: {
            type: String,
            reflect: true
        },
        href: {
            type: String,
            reflect: true
        },
        spec: {
            type: String,
            reflect: true
        }

    }
});

customElements.define("product-card", ProductCard);