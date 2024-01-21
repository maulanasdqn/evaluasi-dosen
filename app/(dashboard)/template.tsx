import { Sidebar } from "@/components/ui/sidebar";
import { Typography } from "@/components/ui/typography";
import { FC, PropsWithChildren, ReactElement } from "react";

const DashboardTemplate: FC<PropsWithChildren> = ({
  children,
}): ReactElement => {
  return (
    <section className="w-full flex bg-grey-50 min-h-screen h-full ml-[280px] overflow-x-hidden">
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
      <div className="flex flex-col w-full h-auto p-4">{children}</div>
    </section>
  );
};

export default DashboardTemplate;
