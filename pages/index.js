import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import ProductSlider from '@/components/ProductSlider';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Footer from '../components/Footer';
import Navbar from '@/components/Navbar';
import Link from 'next/link';


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
    <Navbar/>
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
    <h1 className='px-10 text-5xl font-bold mx-10 my-20'>Products</h1>
    <div className='w-[95%] m-auto h-[350px]  mt-2 flex  overflow-x-auto'>
     {
        products.map((item,index)=>{
          return(
            <Link href={"/shop/"+item._id}>
            <div key={index} className='flex-none w-[300px] h-[300px]  mx-10 md:pb-4   '>
            <img className='w-[400px] h-[300px]' src={urlFor(item.productimage).url()}  />
            <div className='w-full flex mt-2 justify-between'>
            <h1 className='font-bold text-xl'>{item.name}</h1>
            <h1 className='font-bold text-xl'>${item.price}</h1>
            </div>
            </div>
            </Link>
          );
        })
     }
    </div>
      
    <Footer/>
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
