// auth.config.ts
import Spotify from "@auth/core/providers/spotify";
import { defineConfig } from 'auth-astro'

export default defineConfig({
	providers: [
		Spotify({
			clientId: import.meta.env.SPOTIFY_CLIENT_ID,
			clientSecret: import.meta.env.SPOTIFY_CLIENT_SECRET,
            authorization: "https://accounts.spotify.com/authorize?scope=user-read-currently-playing,user-read-recently-played,user-top-read,user-read-email"
		}),
	],
    callbacks: {
        async session({ session, token, user }) {
            //@ts-ignore
            session.accessToken = token.accessToken;

            return session;
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            if (account) {
                token.accessToken = account.access_token;
            }

            return token;
        }
    }
})
