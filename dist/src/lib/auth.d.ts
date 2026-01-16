export declare const auth: import("better-auth").Auth<{
    database: (options: import("better-auth").BetterAuthOptions) => import("better-auth").DBAdapter<import("better-auth").BetterAuthOptions>;
    trustedOrigins: string[];
    user: {
        additionalFields: {
            role: {
                type: "string";
                defaultValue: string;
                required: false;
            };
            phone: {
                type: "string";
                required: false;
            };
            status: {
                type: "string";
                defaultValue: string;
                required: false;
            };
        };
    };
    emailAndPassword: {
        enabled: true;
        autoSignIn: false;
        requireEmailVerification: true;
    };
    emailVerification: {
        sendOnSignUp: true;
        autoSignInAfterVerification: true;
        sendVerificationEmail: ({ user, url, token }: {
            user: import("better-auth").User;
            url: string;
            token: string;
        }, request: Request | undefined) => Promise<void>;
    };
    socialProviders: {
        google: {
            clientId: string;
            clientSecret: string;
            accessType: "offline";
            prompt: "select_account consent";
        };
    };
}>;
//# sourceMappingURL=auth.d.ts.map