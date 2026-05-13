import type { CartItem } from "./types";

// Build a Walmart deep-link URL that pre-fills the user's cart.
//   https://affil.walmart.com/cart/buynow?items=<itemId>|<qty>,...&upcs=<upc>|<qty>,...
//
// Walmart's affiliate cart parser accepts both `items` (Walmart Item IDs from
// product URLs) and `upcs` (universal product codes) in the same URL. We hand
// each cart item to whichever channel has a value — empirically, some products
// only resolve via one path or the other depending on the user's local catalog.
// Both params can appear in the same URL; their items are merged at the cart.
//
// Items with neither identifier are silently skipped.
export function buildWalmartCartUrl(items: CartItem[]): string | null {
  const itemIdSegments: string[] = [];
  const upcSegments: string[] = [];
  for (const i of items) {
    if (i.cartQty <= 0) continue;
    if (i.walmartItemId) {
      itemIdSegments.push(`${i.walmartItemId}|${i.cartQty}`);
    } else if (i.walmartUpc) {
      upcSegments.push(`${i.walmartUpc}|${i.cartQty}`);
    }
  }
  if (itemIdSegments.length === 0 && upcSegments.length === 0) return null;
  const params: string[] = [];
  if (itemIdSegments.length) params.push(`items=${itemIdSegments.join(",")}`);
  if (upcSegments.length) params.push(`upcs=${upcSegments.join(",")}`);
  return `https://affil.walmart.com/cart/buynow?${params.join("&")}`;
}
