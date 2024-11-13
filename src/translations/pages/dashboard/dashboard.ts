import { TranslationType } from "~/translations/types";

interface DashboardTranslationType {
  greeting: string;
  sponsorsSectionTxt: string;
}

export const dashboardTranslation: TranslationType<DashboardTranslationType> = {
  en: {
    greeting: "Hi",
    sponsorsSectionTxt: "Sponsors",
  },
  ar: {
    greeting: "مرحبا",
    sponsorsSectionTxt: "الاعلانات",
  },
};
