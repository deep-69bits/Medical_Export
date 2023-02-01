import React from 'react'
import { Inter } from '@next/font/google'
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

const inter = Inter({ subsets: ['latin'] })

const ProductSlider = ({products}) => {
  console.log(products)
  const client = createClient({
    projectId: "b5hbcmsc",
    dataset: "production",
    useCdn: false,
  });
  const builder = imageUrlBuilder(client);
  function urlFor(source) {
    return builder.image(source);
  }

  return (
    <div>
    <div>
    {
       products.map((item,index)=>{
         return(
           <div key={index}>
           <img src={urlFor(item.productimage).width(200).url()}  />
           </div>
         );
       })
    }
   </div>
    </div>
  )
}
export async function getServerSideProps(context) {
    const client = createClient({
      projectId: "b5hbcmsc",
      dataset: "production",
      useCdn: false,
    });
    const query = `*[_type == "product"]`;
    const products = await client.fetch(query);
    console.log(products);
    return {
      props: {
        products
      },
    };
  }
export default ProductSlider