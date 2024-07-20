/*
   Simple mock data to use for the catalog
*/
/* 
await fetch('https://fakestoreapi.com/products?sort=desc').catch(err => console.error(err));
        const data = await response.json();
        data .filter(({category}) =>  category !== 'electronics')
            .map(({id, price, image, title, description, category, ...item}) => ({
                id, 
                categories:category,
                title:title,
                name: title,
                href: `https://fakestoreapi.com/products/category/${item.id}`,
                image: image,
                summary: description,
                price: `$${price}`,
                spec: 'color:Black'  })) 
*/

import data from './data.json';
 


export type  Product = typeof data[0];

function fixImageUrl({image, ...product}: Product){
    return {
        ...product,
        image: `${image.startsWith('http')?'' : 'http://' }${image}`
    }
}

export function catalog(): Record<Product["category"], Product[]>{
    return data
        .map(fixImageUrl)
        .reduce((acc, item) => {
            acc[item.category] = [...(acc[item.category] || []), item];
            return acc;
        }, {} as Record<string, Product[]>);

}
 

 export default catalog();

