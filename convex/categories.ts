import { v } from "convex/values";
import { query } from "./_generated/server";

export const get = query({
  args: {
    name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const category = await ctx.db
      .query("categories")
      .filter((q) => q.eq(q.field("name"), args.name))
      .unique();

    return category;
  },
});
