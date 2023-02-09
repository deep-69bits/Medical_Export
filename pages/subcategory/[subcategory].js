import React from 'react'
import { useEffect,useState } from "react";
import {Sugar} from 'react-preloaders';
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter } from 'next/router'
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import Head from "next/head";
import index from '../shop';
import { Rings } from  'react-loader-spinner'

export default function subcategory({ products, craousal, logo, categories,subcategories }){
    const router = useRouter()
      const { subcategory } = router.query
  const client = createClient({
    projectId: "b5hbcmsc",
    dataset: "production",
    useCdn: false,
  });
  let nav = [];
  categories.map((item, index) => {
    let x = item.name;
    let y = item._id;
    nav.push({ x, y });
  });

  const builder = imageUrlBuilder(client);
  function urlFor(source) {
    return builder.image(source);
  }
  const [loading, setLoading] = useState(false)
  const delay = 3
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, delay * 1000)
  }, [])
  return !loading ? (
    <div>
    <Navbar logo={logo[0].logoimage} cats={nav} />
    <Head>
    {
      subcategories.map((item,ind)=>{
        if(item._id==subcategory){
          return(
            <title>{item.name}</title>
          );
        }
      })
    }
    </Head>
    <div className='mt-10 lg:w-[85%] sm:w-full m-auto'>
    {
        subcategories.map((item,ind)=>{
          if(item._id==subcategory){
            return(
              <div>
              <div className="lg:flex  mt-10 sm:block justify-between">
              <h1 className="text-2xl font-semibold my-4">{item.name}</h1>
              </div>
              <h3 className="font-light">{item.content}</h3>
              </div>
            );
          }
        })
      }
    </div>
    <div className='lg:w-[85%] sm:w-full m-auto '> 
  
    <div className="grid grid-flow-row lg:grid-cols-4 sm:grid-cols-1  lg:w-[85%] sm:w-full align-middle lg:first-letter:w-5/6  sm:mx-2 sm:px-4  m-auto mt-20">
    {products.map((item, index) => {
      if(item?.subcat?._ref==subcategory){
        return (
          <Link href={"/shop/" + item._id} className="mx-2 overflow-x-hidden ">
          <div className="mt-8 lg:w-[350px] mx-2  shadow-lg ">
          <img
          className="lg:h-[300px]  h-[250px] w-screen"
          src={urlFor(item.productimage).url()}
          />
          <div className="py-4 px-4 lg:w-full w-screen space-y-4">
          <h1 className="font-light text-2xl">{item.name}</h1>
          <h1 className="font-light text-xl">PRICE:${item.price}</h1>
          <p className="font-light text-xl truncate">
          {item.content}
          </p>
          </div>
          </div>
          </Link>
          );
        }
      })}
     </div>
     </div>
    <Footer/>
    </div>
  ):(
    <div>
    <Head>
    {
      subcategories.map((item,ind)=>{
        if(item._id==subcategory){
          return(
            <title>{item.name}</title>
          );
        }
      })
    }
    </Head>
   <div className="flex w-screen justify-center items-center mt-[20%]">
   <div >
   <Rings
   className="block"
   height="120"
   width="120"
   color="#000000"
   radius="12"
   wrapperStyle={{}}
   wrapperClass=""
   visible={true}
   ariaLabel="rings-loading"
   />
   </div>
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
    const query3 = `*[_type == "logo"]`;
    const products = await client.fetch(query);
    const craousal = await client.fetch(query2);
    const logo = await client.fetch(query3);
    const query4 = `*[_type == "catergory"]`;
    const categories = await client.fetch(query4);
    const query5 = `*[_type == "subcatergory"]`;
    const subcategories = await client.fetch(query5);
  
    return {
      props: {
        products,
        craousal,
        logo,
        categories,
        subcategories
      },
    };
  }
