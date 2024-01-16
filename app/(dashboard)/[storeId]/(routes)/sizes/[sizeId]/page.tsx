import prismadb from "@/lib/prismadb";
import { SizeForm } from "./_components/size-form";
import { notFound } from "next/navigation";

const SizePage = async ({ params }: { params: { sizeId: string } }) => {
  if (!params.sizeId) {
    return notFound();
  }

  const size = await prismadb.size.findUnique({
    where: { id: params.sizeId },
  });

  return (
    <div className="flex-col flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
};

export default SizePage;
