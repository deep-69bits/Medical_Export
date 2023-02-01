import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'
import { Inter } from '@next/font/google'
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export default function index({shop}){
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
      <h1 className='text-center mt-10 font-normal text-5xl block px-10'>{shop[0].title}</h1>
      <hr  className=' mt-10 mb-10 w-9/12  m-auto'/>
      <h3 className='mt-10 font-light text-2xl px-10'>{shop[0].content}</h3>
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
  const shop = await client.fetch(query);
  console.log(shop);
 
  return {
    props: {
     shop
    },
  };
}



