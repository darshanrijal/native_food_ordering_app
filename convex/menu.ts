import { v } from "convex/values";
import { query } from "./_generated/server";

export const get = query({
  args: {
    category: v.optional(v.string()),
    name: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const menus = await ctx.db
      .query("menu")
      .filter((q) =>
        q.and(
          ...(args.category
            ? [q.eq(q.field("categoryId"), args.category)]
            : []),
          ...(args.name ? [q.eq(q.field("name"), args.name)] : []),
        ),
      )
      .take(args.limit ?? Number.POSITIVE_INFINITY);

    return menus;
  },
});
