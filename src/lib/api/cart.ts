import "server-only";

import { cartResponseSchema, type TCartSchema } from "@/lib/schemas";

import { apiRequest, apiRequestWithHeaders } from "./client";

export const createCart = async (): Promise<{
  cart: TCartSchema;
  token: string;
}> => {
  const { data, headers } = await apiRequestWithHeaders({
    path: "/cart/create",
    schema: cartResponseSchema,
    init: { method: "POST", cache: "no-store" },
  });

  const token = headers.get("x-cart-token") ?? data.data.token;

  return { cart: data.data, token };
};

export const getCart = async (token: string): Promise<TCartSchema | null> => {
  try {
    const result = await apiRequest({
      path: "/cart",
      schema: cartResponseSchema,
      init: { cartToken: token, cache: "no-store" },
    });
    return result.data;
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "status" in error &&
      ((error as { status: number }).status === 404 ||
        (error as { status: number }).status === 400)
    ) {
      return null;
    }

    throw error;
  }
};

export const addItemToCart = async (
  token: string,
  productId: string,
  quantity: number
): Promise<TCartSchema> => {
  const result = await apiRequest({
    path: "/cart",
    schema: cartResponseSchema,
    init: {
      method: "POST",
      cartToken: token,
      cache: "no-store",
      body: { productId, quantity },
    },
  });

  return result.data;
};

export const updateCartItem = async (
  token: string,
  productId: string,
  quantity: number
): Promise<TCartSchema> => {
  const result = await apiRequest({
    path: `/cart/${encodeURIComponent(productId)}`,
    schema: cartResponseSchema,
    init: {
      method: "PATCH",
      cartToken: token,
      cache: "no-store",
      body: { quantity },
    },
  });

  return result.data;
};

export const removeCartItem = async (
  token: string,
  productId: string
): Promise<TCartSchema> => {
  const result = await apiRequest({
    path: `/cart/${encodeURIComponent(productId)}`,
    schema: cartResponseSchema,
    init: {
      method: "DELETE",
      cartToken: token,
      cache: "no-store",
    },
  });
  return result.data;
};
