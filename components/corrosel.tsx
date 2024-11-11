"use client";
import { Carousel } from "flowbite-react";
import Image from "next/image";

type Props = {};

export default function Carrosel({}: Props) {
  return (
    <div className="mt-6 lg:mt-0 lg:col-span-6 lg:flex h-64 md:h-96  lg:h-96">
      <Carousel className="">
        <Image
          alt="..."
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/image/WhatsApp Image 2023-12-30 at 6-1704144549625-large.webp`}
          width={800}
          height={500}
          priority={true}
        />
        <Image
          alt="..."
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/image/IMG_1188-1699689713376-large.webp`}
          width={800}
          height={500}
          priority={true}
        />
        <Image
          alt="..."
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/image/IMG_1227-1699690484243-large.webp`}
          width={800}
          height={500}
        />
        <Image
          alt="..."
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/image/IMG_1238-1699690703163-large.webp`}
          width={800}
          height={500}
        />
      </Carousel>
    </div>
  );
}
