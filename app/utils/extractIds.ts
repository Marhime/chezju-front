// utils/extractIDs.ts
import type { ContentRelationshipField } from "@prismicio/client";

export function extractRelationshipIDs<T extends string>(
  items: { produit: ContentRelationshipField<T> }[]
): string[] {
  return items
    .map((item) =>
      item.produit && "id" in item.produit ? item.produit.id : null
    )
    .filter((id): id is string => id !== null);
}
