import { z } from "zod";

export const storeConfigDataSchema = z
  .object({
    storeName: z.string().optional(),
    currency: z.string().optional(),
    features: z
      .object({
        wishlist: z.boolean().optional(),
        productComparison: z.boolean().optional(),
        reviews: z.boolean().optional(),
        liveChat: z.boolean().optional(),
        recentlyViewed: z.boolean().optional(),
      })
      .passthrough()
      .optional(),
    socialLinks: z
      .object({
        twitter: z.string().optional(),
        github: z.string().optional(),
        discord: z.string().optional(),
      })
      .passthrough()
      .optional(),
    seo: z
      .object({
        defaultTitle: z.string().optional(),
        titleTemplate: z.string().optional(),
        defaultDescription: z.string().optional(),
      })
      .optional(),
  })
  .passthrough();

export const storeConfigSuccessResponseSchema = z.object({
  success: z.literal(true),
  data: storeConfigDataSchema,
});

export const storeConfigResponseSchema = z.discriminatedUnion("success", [
  storeConfigSuccessResponseSchema,
  z.object({
    success: z.literal(false),
    error: z
      .object({
        code: z.string(),
        message: z.string(),
        details: z.unknown().optional(),
      })
      .optional(),
  }),
]);
