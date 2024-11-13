import { TranslationType } from "~/translations/types";

interface DashboardNavBarTranslationType {
  sheet: {
    name: string;
    mineTxt: string;
    actionsTxt: string;
    advancedActionsTxt: string;
  };
}

export const dashboardNavBarTranslation: TranslationType<DashboardNavBarTranslationType> =
  {
    en: {
      sheet: {
        name: "Dashboard",
        mineTxt: "Mine",
        actionsTxt: "Actions",
        advancedActionsTxt: "Advanced actions",
      },
    },
    ar: {
      sheet: {
        name: "لوحة التحكم",
        mineTxt: "الخاص بي",
        actionsTxt: "الإجراءات",
        advancedActionsTxt: "إجراءات متقدمة",
      },
    },
  };
