import { TranslationType } from "../types";

interface SignUpTranslationType {
  agreeText: string;
  haveAccountText: string;
}

export const signUpTranslation: TranslationType<SignUpTranslationType> = {
  en: {
    agreeText: "By creating an account, you agree to our",
    haveAccountText: "Already have an account?",
  },
  ar: {
    agreeText: "بإنشائك لحساب، فإنك توافق على",
    haveAccountText: "هل لديك حساب؟",
  },
};
