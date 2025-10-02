import { type DefaultSession } from "next-auth";
import { JWT } from "next-auth/JWT";

declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"];
  }
}

declare module "next-auth" {
  interface JWT {
    sub: string;
  }
}
