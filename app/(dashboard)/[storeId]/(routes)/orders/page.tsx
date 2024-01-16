import { format } from "date-fns";
import prismadb from "@/lib/prismadb";
import { OrderClient } from "./_components/order-client";
import { OrderColumn } from "./_components/columns";
import { formatter } from "@/lib/utils";

const OrderPage = async ({ params }: { params: { storeId: string } }) => {
  const orders = await prismadb.order.findMany({
    where: { storeId: params.storeId },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formatedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    isPaid: item.isPaid,
    products: item.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(", "),
    totalPrice: formatter.format(
      item.orderItems.reduce((sum, cur) => sum + Number(cur.product.price), 0)
    ),
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formatedOrders} />
      </div>
    </div>
  );
};

export default OrderPage;
