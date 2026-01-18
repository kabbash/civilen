"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PromoCodePopup } from "./PromoCodePopup";
import { PromoCode } from "@/types";

interface PromoCodeWrapperProps {
  promoCode: PromoCode | null;
}

export function PromoCodeWrapper({ promoCode }: PromoCodeWrapperProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const code = searchParams.get("code");

  useEffect(() => {
    // Show popup if there's a valid code param and promo code exists
    if (code && promoCode) {
      setShowPopup(true);
    }
  }, [code, promoCode]);

  const handleClose = () => {
    setShowPopup(false);
    // Remove the code param from URL
    const params = new URLSearchParams(searchParams.toString());
    params.delete("code");
    const newUrl = params.toString() ? `?${params.toString()}` : "/";
    router.replace(newUrl, { scroll: false });
  };

  if (!showPopup || !promoCode) {
    return null;
  }

  return (
    <PromoCodePopup
      promoCode={promoCode}
      onClose={handleClose}
    />
  );
}
