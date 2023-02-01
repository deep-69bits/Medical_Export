import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import ProductSlider from '@/components/ProductSlider';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


const inter = Inter({ subsets: ['latin'] })

export default function Home({products,craousal}) {
  // console.log(products)
  // console.log(craousal)
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
    <Carousel>
    
    {
      craousal.map((item,index)=>{
        return(
          <div key={index}>
          <img src={urlFor(item.image).width(1300).height(500).url()}  />
          <p className="legend">{item.content}</p>
          </div>
        );
      })
    }
</Carousel>
    </div>
    <div>
     {
        products.map((item,index)=>{
          return(
            <div key={index}>
            <img src={urlFor(item.productimage).width(200).url()}  />
            <h1>{item.name}</h1>
            <h1>{item.content}</h1>
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
  const query2 = `*[_type == "craousal"]`;
  const products = await client.fetch(query);
  const craousal = await client.fetch(query2)
  console.log(products);
 
  return {
    props: {
      products,
      craousal
    },
  };
}
