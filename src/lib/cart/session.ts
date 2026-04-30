import "server-only";

import { cookies } from "next/headers";

import { createCart, getCart } from "@/lib/api/cart";
import type { TCartSchema } from "@/lib/schemas";

const CART_COOKIE = "swag_cart_token";
const CART_COOKIE_MAX_AGE = 60 * 60 * 24;

const setCartToken = async (token: string): Promise<void> => {
  const store = await cookies();
  store.set(CART_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: CART_COOKIE_MAX_AGE,
  });
};

export const getCartToken = async (): Promise<string | undefined> => {
  const store = await cookies();
  return store.get(CART_COOKIE)?.value;
};

export const readCart = async (): Promise<TCartSchema | null> => {
  const token = await getCartToken();
  if (!token) return null;
  return getCart(token);
};

export const ensureCartToken = async (): Promise<string> => {
  const existing = await getCartToken();
  if (existing) {
    const cart = await getCart(existing);
    if (cart) return existing;
  }
  const { token } = await createCart();
  await setCartToken(token);
  return token;
};
