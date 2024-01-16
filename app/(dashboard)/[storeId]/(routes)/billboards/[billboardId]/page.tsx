import prismadb from "@/lib/prismadb";
import { BillboardForm } from "./_components/billboard-form";
import { notFound } from "next/navigation";

const BillboardPage = async ({
  params,
}: {
  params: { billboardId: string };
}) => {
  if (!params.billboardId) {
    return notFound();
  }

  const billboard = await prismadb.billboard.findUnique({
    where: { id: params.billboardId },
  });

  return (
    <div className="flex-col flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
};

export default BillboardPage;
