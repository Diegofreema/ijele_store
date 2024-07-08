export type OrderItemType = {
  id: number;
  orderId: number | null;
  createAt: Date | null;
  quantity: string;
  productId:
    | (number & {
        id: number;
        name: never;
        description: string;
        price: string;
        imagePath: string;
        numberInStock: string;
        createdAt: Date | null;
        category: string;
      })
    | null;
};
