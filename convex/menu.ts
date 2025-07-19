import { v } from "convex/values";
import { query } from "./_generated/server";

export const get = query({
  args: {
    query: v.optional(v.string()),
    category: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let q;

    if (args.query) {
      q = ctx.db
        .query("menu")
        .withSearchIndex("search_by_name", (q) =>
          q.search("name", args.query!),
        );
    } else {
      q = ctx.db.query("menu");
    }

    if (args.category && args.category !== "all") {
      q = q.filter((q) => q.eq(q.field("categoryId"), args.category!));
    }

    return await q.take(args.limit ?? 100);
  },
});

export const getOne = query({
  args: {
    id: v.string(),
  },
  handler: async (ctx, args) => {
    const item = await ctx.db
      .query("menu")
      .filter((q) => q.eq(q.field("_id"), args.id))
      .unique();
    if (!item) {
      return null;
    }

    const category = await ctx.db
      .query("categories")
      .filter((q) => q.eq(q.field("_id"), item.categoryId))
      .unique();
    if (!category) {
      return null;
    }

    const data = { ...item, category };
    return data;
  },
});
