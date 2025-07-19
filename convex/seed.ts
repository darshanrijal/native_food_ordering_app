// convex/seed.ts
import { dummyData } from "../lib/data"; // adjust path
import { mutation, query } from "./_generated/server";

export const seed = mutation(async ({ db }) => {
  const data = dummyData;

  // 1. Clear all existing data
  const deleteAllFrom = async (
    table: "menuCustomizations" | "menu" | "customization" | "categories",
  ) => {
    const docs = await db.query(table).collect();
    await Promise.all(docs.map((doc) => db.delete(doc._id)));
  };

  await deleteAllFrom("menuCustomizations");
  await deleteAllFrom("menu");
  await deleteAllFrom("customization");
  await deleteAllFrom("categories");

  // 2. Insert Categories
  const categoryMap: Record<string, string> = {};
  for (const cat of data.categories) {
    const id = await db.insert("categories", {
      name: cat.name,
      description: cat.description,
    });
    categoryMap[cat.name] = id;
  }

  // 3. Insert Customizations
  const customizationMap: Record<string, string> = {};
  for (const cus of data.customizations) {
    const id = await db.insert("customization", {
      name: cus.name,
      price: cus.price,
      type: cus.type as
        | "topping"
        | "side"
        | "size"
        | "crust"
        | "bread"
        | "spice"
        | "base"
        | "sauce",
    });
    customizationMap[cus.name] = id;
  }

  // 4. Insert Menu Items
  const menuMap: Record<string, string> = {};
  for (const item of data.menu) {
    const menuId = await db.insert("menu", {
      name: item.name,
      description: item.description,
      imageUrl: item.image_url, // You could upload it and store URL if needed
      price: item.price,
      rating: item.rating,
      calories: item.calories,
      protien: item.protein,
      categoryId: categoryMap[item.category_name],
    });

    menuMap[item.name] = menuId;

    // 5. Create menu_customizations
    for (const cusName of item.customizations) {
      await db.insert("menuCustomizations", {
        menuId,
        customizationId: customizationMap[cusName],
      });
    }
  }

  return "✅ Seeding complete.";
});

export const getData = query({
  handler: async (ctx) => {
    const customization = await ctx.db.query("customization").collect();
    const categories = await ctx.db.query("categories").collect();
    const menu = await ctx.db.query("menu").collect();
    const menuCustomizations = await ctx.db
      .query("menuCustomizations")
      .collect();

    return {
      customization,
      categories,
      menu,
      menuCustomizations,
    };
  },
});
