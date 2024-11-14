import { TranslationType } from "../types";

interface ToastTranslationType {
  title: {
    success: string;
    error: string;
    info: string;
    done: string;
    oops: string;
    auth: {
      signedOut: string;
      loginFailed: string;
      loginSuccessful: string;
      signUpFailed: string;
      signUpSuccessful: string;
    };
    product: {
      cannotCreate: string;
      created: string;
    };
    store: {
      cannotCreate: string;
      created: string;
    };
    sponsor: {
      cannotCreate: string;
      created: string;
    };
  };
  description: {
    auth: {
      sessionExpired: string;
      signedOut: string;
    };
  };
  closeBtn: string;
}

export const toastTranslation: TranslationType<ToastTranslationType> = {
  en: {
    title: {
      success: "Success",
      error: "Error",
      info: "Info",
      done: "Done",
      oops: "Oops",
      auth: {
        signedOut: "Logged out",
        loginFailed: "Login failed",
        loginSuccessful: "Login successful",
        signUpFailed: "Sign up failed",
        signUpSuccessful: "Sign up successful",
      },
      product: {
        cannotCreate: "Cannot create product",
        created: "Product created",
      },
      store: {
        cannotCreate: "Cannot create store",
        created: "Store created",
      },
      sponsor: {
        cannotCreate: "Cannot create sponsor",
        created: "Sponsor created",
      },
    },
    description: {
      auth: {
        sessionExpired: "Your session has expired",
        signedOut: "You have been signed out",
      },
    },
    closeBtn: "Close",
  },
  ar: {
    title: {
      success: "نجاح",
      error: "خطأ",
      info: "معلومة",
      done: "تم",
      oops: "عذرا",
      auth: {
        signedOut: "تم تسجيل الخروج",
        loginFailed: "فشل تسجيل الدخول",
        loginSuccessful: "تم تسجيل الدخول بنجاح",
        signUpFailed: "فشل انشاء الحساب",
        signUpSuccessful: "تم انشاء الحساب بنجاح",
      },
      product: {
        cannotCreate: "لا يمكن إنشاء المنتج",
        created: "تم إنشاء المنتج",
      },
      store: {
        cannotCreate: "لا يمكن إنشاء المتجر",
        created: "تم إنشاء المتجر",
      },
      sponsor: {
        cannotCreate: "لا يمكن إنشاء الاعلان",
        created: "تم إنشاء الاعلان",
      },
    },
    description: {
      auth: {
        sessionExpired: "انتهت صلاحية الجلسة",
        signedOut: "تم تسجيل الخروج من الحساب",
      },
    },
    closeBtn: "اغلاق",
  },
};
