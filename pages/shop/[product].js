import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import Link from 'next/link';
import { useRouter } from 'next/router'

export default function product({singleproduct}){
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
   console.log(router.query)
  return (
    <div>
      <Navbar/>
       {
        singleproduct.map((item,index)=>{
          if(item._id==product){
            return(
              <div className='grid grid-flow-row grid-cols-2 mt-10 px-10'>
              <div>
              <img className='h-[600px] w-full' src={urlFor(item.productimage).url()}  />
              </div>
              <div className='w-5/6 px-10 py-10'>
                <h1 className='text-5xl font-semibold'>{item.name}</h1>
                <h1 className='text-2xl mt-5 mb-5'>${item.price}</h1>
                <h3 className='text-xl font-light'> {item.content}</h3>
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
  const singleproduct = await client.fetch(query2)
  return {
    props: {
     singleproduct
    },
  };
}


