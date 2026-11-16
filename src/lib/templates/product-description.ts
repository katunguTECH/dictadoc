// src/lib/templates/product-description.ts

import type { Template } from "@/types/document";
import { SHARED_JSON_INSTRUCTIONS } from "@/types/llm-output";

export const productDescriptionTemplate: Template = {
  id: "product-description",
  name: "Product Description",
  description: "E-commerce product description with features and benefits.",
  category: "creator",
  filenameStem: "product-description",
  systemPrompt: `
You are a documentation assistant for e-commerce sellers.
Convert the spoken product details into a polished product description.

Produce EXACTLY these sections, in this order:
1. "Product Name" — clear, search-friendly title
2. "Short Description" — 1-2 sentences, under 200 characters
3. "Key Features" — 4-6 bullet points with feature + benefit
4. "Full Description" — 2-3 paragraphs of detailed copy
5. "Specifications" — any dimensions, materials, or technical details mentioned
6. "SEO Keywords" — 8-12 relevant keywords, comma-separated

Tone: persuasive but factual. No exaggerated claims. If a section is missing, write "Not specified".

${SHARED_JSON_INSTRUCTIONS}
  `.trim(),
  examples: [
    {
      transcript: "Selling a ceramic coffee mug. It is 12 ounces, stoneware, made by hand in Portugal. It has a matte finish on the outside and glossy on the inside. Dishwasher safe and microwave safe. Comes in three colors - sand, charcoal, and deep blue. Good for people who want a mug that feels special to use every day. Price point is around 32 dollars. I want it to feel premium but not stuffy.",
      output: [
        { heading: "Product Name", body: "Hand-Thrown Stoneware Coffee Mug — 12 oz, Made in Portugal" },
        { heading: "Short Description", body: "A hand-thrown 12 oz stoneware mug with a matte exterior and glossy interior, made in Portugal. Dishwasher and microwave safe." },
        { heading: "Key Features", body: "Hand-thrown in Portugal — each piece has subtle variations that make it one of a kind.\nMatte exterior, glossy interior — feels good in the hand and easy to clean.\n12 oz capacity — the right size for a proper morning coffee.\nDishwasher safe — everyday convenience without compromising the finish.\nMicrowave safe — reheat without worry.\nThree colorways: sand, charcoal, deep blue — pick the one that matches your kitchen." },
        { heading: "Full Description", body: "There is something different about a mug that was made by hand. The weight, the texture, the way the rim sits against your lip. This 12 oz stoneware mug is thrown by hand in Portugal, with a matte exterior that feels warm to hold and a glossy interior that makes cleanup effortless.\n\nIt is the kind of mug you reach for every morning without thinking — because it just feels right. Dishwasher safe, microwave safe, and built to last through years of daily use.\n\nChoose from three versatile colorways: sand, charcoal, or deep blue." },
        { heading: "Specifications", body: "Material: Stoneware.\nCapacity: 12 oz.\nOrigin: Portugal.\nFinish: Matte exterior, glossy interior.\nCare: Dishwasher safe, microwave safe.\nColors: Sand, charcoal, deep blue." },
        { heading: "SEO Keywords", body: "ceramic coffee mug, stoneware mug, hand-thrown mug, Portuguese ceramic, 12 oz mug, matte finish mug, dishwasher safe mug, microwave safe mug, artisan coffee mug, premium coffee mug" },
      ],
    },
  ],
};
