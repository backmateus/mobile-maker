"use client";

import { useState } from "react";
import Image from "next/image";

export default function Logo({ size = 64 }: { size?: number }) {
  const [erro, setErro] = useState(false);

  if (erro) {
    return (
      <div
        className="flex items-center justify-center rounded-full border-2 border-gold text-gold font-bold tracking-wide"
        style={{ width: size, height: size, fontSize: size * 0.28 }}
      >
        MM
      </div>
    );
  }

  return (
    <Image
      src="/logo.png"
      alt="Mobile Maker"
      width={size}
      height={size}
      className="object-contain"
      onError={() => setErro(true)}
      priority
    />
  );
}
