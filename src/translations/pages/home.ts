import { TranslationType } from "../types";

type HomeTranslationType = {
  header: {
    title: string;
    discoverBtn: string;
  };
  sponsors: {
    title: string;
    description: string;
    makeYoursBtn: string;
    card: {
      exploreBtn: string;
    };
  };
  stores: {
    title: string;
    description: string;
    createYoursBtn: string;
    seeMoreBtn: string;
    noStoresToShow: string;
    card: {
      goForItBtn: string;
    };
  };
  products: {
    title: string;
    description: string;
    createYoursBtn: string;
    seeMoreBtn: string;
    noProductsToShow: string;
    card: {
      goForItBtn: string;
    };
  };
  joinUs: {
    title: string;
    description1: string;
    description2: string;
  };
};

export const homeTranslation: TranslationType<HomeTranslationType> = {
  en: {
    header: {
      title: "Discover Local Excellence your all in one store",
      discoverBtn: "Discover",
    },
    sponsors: {
      title: "Sponsors",
      description: "Become a sponsor and get your store listed here.",
      makeYoursBtn: "Make Yours",
      card: {
        exploreBtn: "Explore",
      },
    },
    stores: {
      title: "Stores",
      description:
        "These are the stores of our valued clients who have subscribed to our service.",
      createYoursBtn: "Create Yours",
      seeMoreBtn: "See More",
      noStoresToShow: "No stores to show.",
      card: {
        goForItBtn: "Go For It",
      },
    },
    products: {
      title: "Products",
      description:
        "These are the products of our valued clients who have subscribed to our service.",
      createYoursBtn: "Create Yours",
      seeMoreBtn: "See More",
      noProductsToShow: "No products to show.",
      card: {
        goForItBtn: "Go For It",
      },
    },
    joinUs: {
      title: "Join Us",
      description1:
        "Sign up now to unlock exclusive access to our products and deals.",
      description2: "Already a member? Log in and start exploring!",
    },
  },
  ar: {
    header: {
      title: "اكتشف Local Excellence حيث كل شيء في متجر واحد",
      discoverBtn: "اكتشف",
    },
    sponsors: {
      title: "الاعلانات",
      description: "قم بالاعلان واعرض متجرك هنا.",
      makeYoursBtn: "انشئ اعلان لمتجرك",
      card: {
        exploreBtn: "انطلق",
      },
    },
    stores: {
      title: "المتاجر",
      description: "هذه هي المتاجر للعملاء الذين قاموا بالاشتراك في خدمتنا.",
      createYoursBtn: "انشئ المتجر الخاص بك",
      seeMoreBtn: "المزيد",
      noStoresToShow: "لا يوجد متاجر لعرضها.",
      card: {
        goForItBtn: "استكشاف",
      },
    },
    products: {
      title: "المنتجات",
      description: "هذه هي المنتجات للعملاء الذين قاموا بالاشتراك في خدمتنا.",
      createYoursBtn: "انشئ المنتج الخاص بك",
      seeMoreBtn: "المزيد",
      noProductsToShow: "لا يوجد منتجات لعرضها.",
      card: {
        goForItBtn: "استكشاف",
      },
    },
    joinUs: {
      title: "انضم الينا",
      description1: "انشئ حسابك الان لاستكشاف المنتجات والعروض الخاصة بنا.",
      description2: "هل انت عضو؟ سجل الدخول وابدا بالاستكشاف!",
    },
  },
};
