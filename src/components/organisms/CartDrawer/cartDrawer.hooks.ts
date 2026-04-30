"use client";

import { useEffect } from "react";

import { useBodyScrollLock, useEscapeKey } from "@/hooks";

import type { TUseCartDrawerEffectsParams } from "./types";

export const useCartDrawerEffects = ({
  close,
  isOpen,
  clearMessage,
}: TUseCartDrawerEffectsParams) => {
  useBodyScrollLock({ isLocked: isOpen });
  useEscapeKey({ isActive: isOpen, onEscape: close });

  useEffect(() => {
    if (!isOpen) clearMessage();
  }, [clearMessage, isOpen]);
};
