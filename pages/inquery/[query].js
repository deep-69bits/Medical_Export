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

export default function query({singleproduct,logo,category}){
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
                        <img className='lg:h-[600px] sm:h-[300px] w-full' src={urlFor(item.productimage).url()}  />
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
             <input name="entry.1471387974" className='mx-2 my-3 px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white bg rounded  text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full' type="text"  placeholder='Prouduct' />
              <button type='submit'  className='w-full text-center bg-black text-xl text-white py-2 m-auto block font-semibold ' >Submit</button>
            </form>
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
    return {
      props: {
       singleproduct,
       logo,
       category
      },
    };
  }

