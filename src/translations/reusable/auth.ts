import { TranslationType } from "../types";

interface AuthTranslationType {
  email: string;
  password: string;
  userName: string;
}

export const authTranslation: TranslationType<AuthTranslationType> = {
  en: {
    email: "Email",
    password: "Password",
    userName: "User name",
  },
  ar: {
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    userName: "اسم المستخدم",
  },
};
