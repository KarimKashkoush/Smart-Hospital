import zod from "zod";
import { signInSchema } from "./auth.validation";
type SignInData = zod.infer<typeof signInSchema>;
export declare const signIn: ({ username, password, }: SignInData) => Promise<{
    token: string;
    user: Record<string, unknown>;
}>;
export {};
