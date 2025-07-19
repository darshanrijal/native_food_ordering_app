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
    rating: v.float64(),
    calories: v.int64(),
    protien: v.int64(),
    price: v.float64(),
    categoryId: v.id("categories"),
  }).index("category_id_fk", ["categoryId"]),
  customization: defineTable({
    name: v.string(),
    price: v.int64(),
    value: v.union(
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
    menuId: v.id("menu"),
    customizationId: v.id("customization"),
  }).index("fks", ["menuId", "customizationId"]),
});
