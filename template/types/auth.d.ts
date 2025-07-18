// auth.d.ts
declare module "#auth-utils" {
  interface User {
    // Add your own fields
    id: string;
    nickName: string;
    avatar: string;
  }
}

export {};
