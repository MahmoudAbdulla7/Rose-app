export type TOrderStatus =
    | 'PENDING'
    | 'CONFIRMED'
    | 'PROCESSING'
    | 'SHIPPED'
    | 'DELIVERED'
    | 'CANCELLED'
    | 'REFUNDED';

export type TPaymentMethod = 'CASH_ON_DELIVERY' | 'CREDIT_CARD';

export type TPaymentStatus =
    | 'PENDING'
    | 'PROCESSING'
    | 'SUCCEEDED'
    | 'FAILED'
    | 'REFUNDED'
    | 'CANCELLED';

export interface IOrderUser {
    id: string;
    username: string;
    email: string;
}

export interface IOrderAddress {
    id: string;
    userId: string;
    title: string;
    isPrimary: boolean;
    city: string;
    street: string;
    phone: string;
    latitude: string;
    longitude: string;
    createdAt: string;
    updatedAt: string;
}

export interface IOrderCoupon {
    id: string;
    code: string;
    type: string; 
    value: string;
    minPurchase: string;
    maxDiscount: string;
    usageLimit: number;
    usedCount: number;
    validFrom: string;
    validUntil: string;
    isActive: boolean;
    immutable: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface IOrderItemProductSummary {
    id: string;
    title: string;
    cover: string;
}

export interface IOrderItemProductDetail {
    id: string;
    title: string;
    description: string;
    rating: number;
    ratings: number;
    stock: number;
    price: string;
    discountType: string | null;
    discountValue: string | null;
    cover: string;
    gallery: string; 
    categoryId: string;
    subCategoryId: string;
    immutable: boolean;
    deletedAt: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface IOrderItem<TProduct = IOrderItemProductSummary> {
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
    price: string;
    createdAt: string;
    product: TProduct;
}

interface IOrderBase extends Omit<IDBFields, 'productId'> {
    userId: string;
    addressId: string;
    couponId: string | null;
    status: TOrderStatus;
    paymentMethod: TPaymentMethod;
    paymentStatus: TPaymentStatus;
    stripePaymentIntentId: string | null;
    stripeCheckoutSessionId: string | null;
    subtotal: string;
    discount: string;
    shipping: string;
    total: string;
    trackingNumber: string | null;
    notes: string | null;
}

export interface IOrder extends IOrderBase {
    user: IOrderUser;
    address: IOrderAddress;
    coupon: IOrderCoupon | null;
    orderItems: IOrderItem<IOrderItemProductSummary>[];
}

export interface IOrderDetail extends IOrderBase {
    user: IOrderUser;
    address: IOrderAddress;
    coupon: IOrderCoupon | null;
    orderItems: IOrderItem<IOrderItemProductDetail>[];
}

export interface ICreatedOrder extends IOrderBase {
    orderItems: IOrderItem<IOrderItemProductDetail>[];
}

export interface ICheckoutSession {
    checkoutUrl: string;
    sessionId: string;
    expiresAt: string;
    reused: boolean;
}

export type IOrderResponse = IAPIResponse<IPaginatedData<IOrder>>;
export type ISingleOrderResponse = IAPIResponse<{ order: IOrderDetail }>;
export type ICreateOrderResponse = IAPIResponse<{ order: ICreatedOrder; checkout: ICheckoutSession }>;

export interface IOrderSearchParams {
    page: string;
    limit?: string;
    status?: TOrderStatus;
    paymentStatus?: TPaymentStatus;
    search?: string;
}