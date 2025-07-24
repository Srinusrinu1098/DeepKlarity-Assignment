import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Headers() {
  return (
    <div className="flex  p-3 shadow-2xl   justify-between items-center  bg-gray-300">
      <Image
        src="/aiImage.jpg"
        alt="AI image"
        height={100}
        width={100}
        className="rounded-2xl"
      />
      <Link href={"/resumes"}>
        <Button>Previous resumes</Button>
      </Link>
    </div>
  );
}

export default Headers;
