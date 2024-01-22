import { Sidebar } from "@/components/ui/sidebar";
import { TUser } from "@/entities";
import { auth } from "@/utils/auth";
import { PropsWithChildren, ReactElement } from "react";

const DashboardTemplate = async ({
  children,
}: PropsWithChildren): Promise<ReactElement> => {
  const session = await auth();
  return (
    <section className="w-full flex items-start justify-center px-6 bg-grey-100 min-h-screen h-full overflow-x-hidden">
      <Sidebar user={session?.user as TUser} />
      <div className="flex flex-col w-full max-w-[1200px] bg-white my-8 rounded-lg min-h-screen h-full px-4 ml-[254px]">
        {children}
      </div>
    </section>
  );
};

export default DashboardTemplate;
