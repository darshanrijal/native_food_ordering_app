import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    password: v.string(),
    avatarUrl: v.optional(v.string()),
  }).index("email_uniq_idx", ["email"]),
  categories: defineTable({
    name: v.string(),
    description: v.string(),
  }),
  menu: defineTable({
    name: v.string(),
    description: v.string(),
    imageUrl: v.string(),
    rating: v.number(),
    calories: v.number(),
    protien: v.number(),
    price: v.number(),
    categoryId: v.string(),
  })
    .index("category_id_fk", ["categoryId"])
    .index("name_idx", ["name"])
    .searchIndex("search_by_name", {
      searchField: "name",
    }),

  customization: defineTable({
    name: v.string(),
    price: v.number(),
    type: v.union(
      v.literal("topping"),
      v.literal("side"),
      v.literal("size"),
      v.literal("crust"),
      v.literal("bread"),
      v.literal("spice"),
      v.literal("base"),
      v.literal("sauce"),
    ),
  }),
  menuCustomizations: defineTable({
    menuId: v.string(),
    customizationId: v.string(),
  }).index("fks", ["menuId", "customizationId"]),
});
