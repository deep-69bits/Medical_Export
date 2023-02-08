import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import Link from 'next/link';
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useEffect,useState } from "react";
import { Rings } from  'react-loader-spinner'

export default function product({singleproduct,logo,category,subcategories}){
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
  let nav=[];
  category.map((item,index)=>{
     let x=item.name
     let y=item._id;
     nav.push({x,y});
  })
   var subcateg;
   singleproduct.map((it)=>{
     if(it._id==product){
         subcateg=it?.subcat?._ref
     }
   })
   console.log(subcateg)
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
                <div className='h-[400px] overflow-y-auto'>
                <h3 className='text-xl font-light'> {item.content}</h3>
                </div>
                <Link href={"/inquery/"+item._id} className='w-full text-center bg-black text-xl text-white py-2 my-4 block font-semibold ' >Inquire</Link>
              </div>
                
              </div>
            );
          }
        })
       }
       <h1 className='w-[90%] m-auto font-semibold text-2xl'>Realted Products</h1>
       <div className='lg:w-[90%] sm:w-full m-auto'>
       
       <div className=' grid grid-flow-row lg:grid-cols-4 sm:grid-cols-1'>
       {
        singleproduct.map((item,index)=>{
          
          if(subcateg!=null && item.subcat?._ref==subcateg  && item._id!=product){
            return(
              <Link href={"/shop/" + item._id}>
          <div className="mt-8 lg:w-[350px]  sm:w-[300px] shadow-lg ">
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
        })
       }
       </div>
       </div>
      <Footer/>
    </div>
  ):(
    <div>
    <Head>
    {
      singleproduct.map((item,index)=>{
        if(item._id==product){
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
  const query2 = `*[_type == "product"]`;
  const query = `*[_type == "logo"]`;
  const singleproduct = await client.fetch(query2)
  const logo = await client.fetch(query)
  const query4 = `*[_type == "catergory"]`;
  const category = await client.fetch(query4);
  const query5 = `*[_type == "subcatergory"]`;
    const subcategories = await client.fetch(query5);
  return {
    props: {
     singleproduct,
     logo,
     category,
     subcategories
    },
  };
}


