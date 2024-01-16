import { format } from "date-fns";
import prismadb from "@/lib/prismadb";
import { CategoryClient } from "./_components/category-client";
import { CategoryColumn } from "./_components/columns";

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const Categories = await prismadb.category.findMany({
    where: { storeId: params.storeId },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formatedCategories: CategoryColumn[] = Categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.id,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formatedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
