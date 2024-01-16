import prismadb from "@/lib/prismadb";
import { ColorForm } from "./_components/color-form";
import { notFound } from "next/navigation";

const ColorPage = async ({ params }: { params: { colorId: string } }) => {
  if (!params.colorId) {
    return notFound();
  }

  const color = await prismadb.color.findUnique({
    where: { id: params.colorId },
  });

  return (
    <div className="flex-col flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={color} />
      </div>
    </div>
  );
};

export default ColorPage;
