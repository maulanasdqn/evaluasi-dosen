import { Sidebar } from "@/components/ui/sidebar";
import { Typography } from "@/components/ui/typography";
import { FC, PropsWithChildren, ReactElement } from "react";

const DashboardTemplate: FC<PropsWithChildren> = ({
  children,
}): ReactElement => {
  return (
    <section className="w-full flex items-start justify-center px-6 bg-grey-100 min-h-screen h-full overflow-x-hidden">
      <Sidebar
        user={{
          id: "",
          fullname: "Admin EDOM Uninus",
          image: undefined,
          email: "admin@admin.com",
          isPasswordSet: false,
          role: {
            id: "",
            name: "Admin",
            permissions: ["Read Setting", "Read Dosen", "Dashboard"],
          },
        }}
      />
      <div className="flex flex-col w-full max-w-[1200px] bg-white my-8 rounded-lg min-h-screen h-full px-4 ml-[254px]">
        {children}
      </div>
    </section>
  );
};

export default DashboardTemplate;
