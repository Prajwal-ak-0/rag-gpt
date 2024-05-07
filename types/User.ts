export interface User {
    id: number;
    clerkId: string;
    username: string;
    email: string;
    provider?: string;
    apiKey?: string;
    isApiVerified?: boolean;
  }