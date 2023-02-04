import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import Link from 'next/link';
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function product({singleproduct,logo}){
  const client = createClient({
    projectId: "b5hbcmsc",
    dataset: "production",
    useCdn: false,
  });
  const builder = imageUrlBuilder(client);
  function urlFor(source) {
    return builder.image(source);
  }
  const router = useRouter()
  const { product } = router.query
  return (
    <div>
    <Navbar logo={logo[0].logoimage} />
       {
        singleproduct.map((item,index)=>{
          if(item._id==product){
            return(
              <div className='grid grid-flow-row lg:grid-cols-2 sm:grid-cols-1 mt-10 px-10'>
              <Head>
              <title>{item.name}</title>
              </Head>
              <div>
              <img className='lg:h-[600px] sm:h-[300px] w-full' src={urlFor(item.productimage).url()}  />
              </div>
              <div className='lg:w-5/6 sm:w-ful lg:px-10 py-10'>
                <h1 className='text-5xl font-semibold'>{item.name}</h1>
                <h1 className='text-2xl mt-5 mb-5'>${item.price}</h1>
                <h3 className='text-xl font-light'> {item.content}</h3>
                <Link href={"/inquery/"+item._id} className='w-full text-center bg-black text-xl text-white py-2 my-4 block font-semibold ' >Inquire</Link>
              </div>
                
              </div>
            );
          }
        })
       }
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
  const query2 = `*[_type == "product"]`;
  const query = `*[_type == "logo"]`;
  const singleproduct = await client.fetch(query2)
  const logo = await client.fetch(query)
  return {
    props: {
     singleproduct,
     logo
    },
  };
}


