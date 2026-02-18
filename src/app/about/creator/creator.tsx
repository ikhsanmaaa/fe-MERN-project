"use client";

import { Card, CardBody } from "@heroui/react";
import Image from "next/image";

const Creator = () => {
  return (
    <section className="max-w-screen-md mx-auto px-4 py-12">
      <Card shadow="sm" radius="lg" className="p-6 bg-gray-200">
        <CardBody className="flex flex-col items-center text-center gap-6">
          <div className="relative w-40 h-40">
            <Image
              src="/images/general/ikhsan.jpg"
              alt="Ikhsan Maulana Akbar"
              fill
              className="rounded-full object-cover"
            />
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Ikhsan Maulana Akbar
            </h1>
            <p className="text-default-500 mt-1">Full Stack Web Developer</p>
          </div>

          <p className="text-default-600 leading-relaxed max-w-xl">
            Saya adalah Full Stack Developer dengan latar belakang Teknik
            Industri yang memiliki pendekatan sistematis dalam membangun
            aplikasi web. Saya terbiasa menggabungkan pemahaman proses bisnis
            dengan implementasi teknis menggunakan JavaScript ecosystem (React,
            Next.js, Express, MongoDB). Melalui project seperti sistem ticketing
            konser dengan integrasi payment gateway, saya mengembangkan
            kemampuan dalam merancang arsitektur aplikasi, mengelola
            autentikasi, serta menangani alur transaksi end-to-end.
            <br />
            <br />
            Saya tertarik membangun sistem yang scalable, efisien, dan memiliki
            dampak nyata bagi pengguna.
          </p>
        </CardBody>
      </Card>
    </section>
  );
};

export default Creator;
