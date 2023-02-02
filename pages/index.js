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
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'



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
    <Head>
    <title>Medical Export</title>
    </Head>
    <Navbar/>
    <div>
   <Swiper
   pagination={{clickable: true,}}
   autoplay={{ delay: 3000,}}
   loop={true}
   modules={[Pagination, Autoplay]}
   > 
   {
    craousal.map((item,index)=>{
      return(
        <SwiperSlide key={index}>
        <div >
        <img  className='w-full brightness-50  lg:h-[600px] sm:h-[300px]' src={urlFor(item.image).url()}  />
        <p className='text-white font-semibold font-sans lg:text-5xl sm:text-3xl text-center lg:w-[30%] sm:w-full m-auto -translate-y-44 '>{item.content}</p>
        </div>
        </SwiperSlide>
      );
    })
   }

  </Swiper>
    </div>
    <h1 className='px-10 text-5xl font-bold mx-10 my-20'>Products</h1>

    <div className='w-[95%] m-auto h-[350px]  mt-2 flex  overflow-x-auto'>
     {
        products.map((item,index)=>{
          return(
            <Link href={"/shop/"+item._id} className="hover:scale-105 transition duration-500">
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
