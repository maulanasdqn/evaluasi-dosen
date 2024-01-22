import { Typography } from "@/components/ui/typography";
import { FC, PropsWithChildren, ReactElement } from "react";
import Image from "next/image";

const AuthTemplate: FC<PropsWithChildren> = ({ children }): ReactElement => {
  return (
    <section className="min-h-screen bg-green-100 h-full w-full flex items-center justify-center flex-col">
      <div className="bg-white flex flex-col gap-y-3 h-auto w-fit md:min-w-[500px] rounded-lg justify-center p-6 items-center">
        <figure className="flex gap-x-3">
          <Image
            src="/img/neo-uninus.png"
            width={135}
            height={40}
            alt="logo uninus"
            className="w-auto h-auto"
            priority
          />
          <Image
            src="/img/hybrid.png"
            className="w-auto h-auto"
            width={135}
            height={40}
            alt="logo hybrid"
            priority
          />
        </figure>
        <div className="flex flex-col mt-[40px] items-center">
          <Typography color="text-black" variant="bold" size="body-1">
            Portal Administrasi
          </Typography>
          <Typography color="text-black" variant="bold" size="body-1">
            Administrasi Evaluasi Dosen
          </Typography>
        </div>
        {children}
        <Typography size="caption" variant="reguler" color="text-black">
          © NEO UNIVERSITAS ISLAM NUSANTARA 2023
        </Typography>
      </div>
    </section>
  );
};

export default AuthTemplate;
