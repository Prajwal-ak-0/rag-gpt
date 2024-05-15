import Image from "next/image"
import { useEffect, useState } from "react";
export const Loader = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
    }, 500);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      <div className="w-20 h-20 relative animate-spin">
        <Image
          alt="Logo"
          src="/logo.svg"
          fill
        />
      </div>
      <p className="text-sm text-muted-foreground">
        <p className="text-sm text-muted-foreground">
          Generating {dots}
        </p>
      </p>
    </div>
  );
};