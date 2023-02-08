import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React, { useState } from 'react'
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import Link from 'next/link';
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useEffect } from "react";
import { Rings } from  'react-loader-spinner'

export default function query({singleproduct,logo,category, subcategories}){
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
      const { query } = router.query
      var subcateg;
      singleproduct.map((it)=>{
     if(it._id==query){
         subcateg=it?.subcat?._ref
     }
     })
      var product=""
      singleproduct.map((item)=>{
         if(item._id==query){product=item.name}
      })
      let nav=[];
      category.map((item,index)=>{
         let x=item.name
         let y=item._id;
         nav.push({x,y});
      })
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
    <Head>
              <title>Inquire</title>
              </Head>
              <Navbar logo={logo[0].logoimage} cats={nav} />
       <div className='grid grid-flow-row lg:grid-cols-2 sm:grid-cols-1 px-10 '>
         <div>
          {
            singleproduct.map((item,index)=>{
                if(query==item._id){
                    return(
                        <div className='lg:mx-10 sm:mx-2 my-10' key={item.index}>
                        <div className='h-screen overflow-y-auto'>
                        <img className='lg:h-[500px] sm:h-[300px] w-full' src={urlFor(item.productimage).url()}  />
                        <div className='mt-4'>
                        <h1 className='font-semibold text-4xl'>{item.name}</h1>
                        <h2 className='font-normal mt-2 text-xl'>{item._id}</h2>
                         {
                          item?.moreimages?.map((it,ind)=>{
                             return(
                              <img className='lg:h-[500px] sm:h-[300px] mt-10 w-full' src={urlFor(it).url()}  />
                             );
                          })
                         }
                        </div>
                         </div>
                        </div>
                    );
                }
            })
          }
         </div>
         <div className='lg:mx-10 lg:w-5/6 sm:w-full  sm:mx-2 my-20'>
            <form className='flex flex-col' action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSfRIRC-vI5-i7Xpv1hh_Bp0KCDZZD1hZGLhNAqegBVU1Qe_HA/formResponse?embedded=true" target="_self" method="POST" > 
             <input  name="entry.1970324109" className='mx-2 my-3 px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white bg rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full'  type="text" placeholder='First Name' />
             <input  name="entry.2141827571" className='mx-2 my-3 px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white bg rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full' type="text" placeholder='Last Name' />
             <input  name="entry.2127117616" className='mx-2 my-3 px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white bg rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full' type="number" placeholder='Phone Numbmer' />
             <input  name="entry.946632364" className='mx-2 my-3 px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white bg rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full' type="text" placeholder='Location' />
             <input name="entry.113261900" className='mx-2 my-3 px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white bg rounded  text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full'  type="text"  placeholder='Prouduct' />
             <input name="entry.1471387974" className='mx-2 my-3 px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white bg rounded  text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full' type="text"  placeholder='Prouduct ID' />
              <button type='submit'  className='w-full text-center bg-black text-xl text-white py-2 m-auto block font-semibold ' >Submit</button>
            </form>
         </div>
       </div>
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
    const query2 = `*[_type == "product" ]`;
    const query = `*[_type == "logo" ]`;
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

