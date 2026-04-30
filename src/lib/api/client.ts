import "server-only";

import { z } from "zod";

import { env } from "@/lib/env";
import { errorResponseSchema } from "@/lib/schemas";

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly details?: unknown;

  constructor(
    status: number,
    code: string,
    message: string,
    details?: unknown
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

type FetchInit = Omit<RequestInit, "body" | "headers"> &
  Partial<{
    body: unknown;
    cache: RequestCache;
    cartToken: string;
    headers: Record<string, string>;
    next: { revalidate?: number | false; tags?: string[] };
  }>;

type ApiRequest<TSchema extends z.ZodTypeAny> = {
  path: string;
  schema: TSchema;
  init?: FetchInit;
  searchParams?: Record<string, string | number | boolean | undefined | null>;
};

const buildUrl = (
  path: string,
  searchParams?: ApiRequest<z.ZodTypeAny>["searchParams"]
): string => {
  const url = new URL(`${env.NEXT_PUBLIC_API_BASE_URL}${path}`);
  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (value === undefined || value === null || value === "") continue;
      url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
};

export const apiRequest = async <TSchema extends z.ZodTypeAny>({
  path,
  schema,
  init,
  searchParams,
}: ApiRequest<TSchema>): Promise<z.infer<TSchema>> => {
  const headers: Record<string, string> = {
    "x-vercel-protection-bypass": env.API_BYPASS_TOKEN,
    accept: "application/json",
    ...init?.headers,
  };

  if (init?.body !== undefined) headers["content-type"] = "application/json";
  if (init?.cartToken) headers["x-cart-token"] = init.cartToken;

  const response = await fetch(buildUrl(path, searchParams), {
    ...init,
    headers,
    body: init?.body !== undefined ? JSON.stringify(init.body) : undefined,
  });

  const text = await response.text();
  const json: unknown = text ? safeParseJson(text) : null;

  if (!response.ok) {
    const parsedError = errorResponseSchema.safeParse(json);
    if (parsedError.success) {
      throw new ApiError(
        response.status,
        parsedError.data.error.code,
        parsedError.data.error.message,
        parsedError.data.error.details
      );
    }
    throw new ApiError(
      response.status,
      "HTTP_ERROR",
      `Request failed (${response.status})`
    );
  }

  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    throw new ApiError(
      500,
      "INVALID_RESPONSE",
      "Upstream response failed schema validation",
      parsed.error.issues
    );
  }

  return parsed.data;
};

const safeParseJson = (text: string): unknown => {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
};

export const apiRequestWithHeaders = async <TSchema extends z.ZodTypeAny>(
  args: ApiRequest<TSchema>
): Promise<{ data: z.infer<TSchema>; headers: Headers }> => {
  const headers: Record<string, string> = {
    "x-vercel-protection-bypass": env.API_BYPASS_TOKEN,
    accept: "application/json",
    ...args.init?.headers,
  };
  if (args.init?.body !== undefined)
    headers["content-type"] = "application/json";
  if (args.init?.cartToken) headers["x-cart-token"] = args.init.cartToken;

  const response = await fetch(buildUrl(args.path, args.searchParams), {
    ...args.init,
    headers,
    body:
      args.init?.body !== undefined
        ? JSON.stringify(args.init.body)
        : undefined,
  });

  const text = await response.text();
  const json: unknown = text ? safeParseJson(text) : null;

  if (!response.ok) {
    const parsedError = errorResponseSchema.safeParse(json);
    if (parsedError.success) {
      throw new ApiError(
        response.status,
        parsedError.data.error.code,
        parsedError.data.error.message
      );
    }
    throw new ApiError(
      response.status,
      "HTTP_ERROR",
      `Request failed (${response.status})`
    );
  }

  const { success, data } = args.schema.safeParse(json);

  if (!success) {
    throw new ApiError(
      500,
      "INVALID_RESPONSE",
      "Upstream response failed schema validation"
    );
  }

  return { data, headers: response.headers };
};
