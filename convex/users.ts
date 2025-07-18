import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
export const registerUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .unique();

    if (existingUser) {
      return {
        error: "User already exists, Please sign in",
      };
    }
    const newUserId = await ctx.db.insert("users", args);
    return {
      id: newUserId,
    };
  },
});

export const signIn = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .unique();

    if (!existingUser) {
      return {
        error: "Invalid email or password",
      };
    }

    if (existingUser.password !== args.password) {
      return {
        error: "Invalid email or password",
      };
    }

    return {
      id: existingUser._id,
    };
  },
});

export const getUser = query({
  args: {
    userId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (!args.userId) {
      return null;
    }
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("_id"), args.userId))
      .unique();

    return user;
  },
});
