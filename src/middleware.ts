import { defineMiddleware } from "astro:middleware";
// import { getSession } from 'auth-astro/server';

export const onRequest = defineMiddleware(async (_context, next) => {
    return next();
})
