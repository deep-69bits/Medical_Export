import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'
import { Inter } from '@next/font/google'
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import Link from 'next/link';
import Head from 'next/head'
export default function index({shop,product}){
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
     <Head>
     <title>Medical Export | Shop</title>
     </Head>
     <div className='px-10'>
     <h1 className='text-center mt-10 font-normal text-5xl block '>{shop[0].title}</h1>
     <hr  className=' mt-10 mb-10 w-9/12  m-auto'/>
     <h3 className='mt-10 font-light text-2xl '>{shop[0].content}</h3>
     <div  className='grid grid-flow-row lg:grid-cols-3 sm:grid-cols-1 m-auto align-middle w-[90%] mt-20'>
     {
       product.map((item,index)=>{
         return(
          <Link href={"/shop/"+item._id}>
          <div  className='mt-8 w-[400px] h-[400px] shadow-lg ' >
          <img className='h-[300px] w-full' src={urlFor(item.productimage).url()}  />
          </div>
          </Link>
           );
          })
        }
    </div>
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
  const query = `*[_type == "shop"]`;
  const query2 = `*[_type == "product"]`;
  const shop = await client.fetch(query);
  const product = await client.fetch(query2)
  console.log(shop);
 
  return {
    props: {
     shop,
     product
    },
  };
}



