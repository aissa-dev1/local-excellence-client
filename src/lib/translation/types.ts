import { SUPPORTED_LANGUAGES } from "../constants";

export type TranslationLanguage =
  (typeof SUPPORTED_LANGUAGES)[keyof typeof SUPPORTED_LANGUAGES];

export interface PagesTranslationTree {
  home: {
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
  stores: {
    header: {
      title: string;
    };
    search: {
      label: string;
      placeholder: string;
      button: string;
    };
    noStoresFound: string;
    loadMoreBtn: string;
  };
  products: {
    header: {
      title: string;
    };
    search: {
      label: string;
      placeholder: string;
      button: string;
    };
    noProductsFound: string;
    loadMoreBtn: string;
  };
  signUp: {
    agreeText: string;
    haveAccountText: string;
  };
  login: {
    noAccountText: string;
  };
  dashboard: {
    greeting: string;
    sponsorsSectionTxt: string;
    createSponsor: {
      title: string;
      storeSelectLabel: string;
      storeSelectPlaceholder: string;
      bgColorLabel: string;
      colorLabel: string;
      descriptionLabel: string;
      descriptionPlaceholder: string;
      createSponsorBtn: string;
    };
    createStore: {
      title: string;
      nameLabel: string;
      namePlaceholder: string;
      descriptionLabel: string;
      descriptionPlaceholder: string;
      storeTypeSelectLabel: string;
      storeTypeSelectPlaceholder: string;
      createStoreBtn: string;
    };
    createProduct: {
      title: string;
      storeSelectLabel: string;
      storeSelectPlaceholder: string;
      nameLabel: string;
      namePlaceholder: string;
      descriptionLabel: string;
      descriptionPlaceholder: string;
      priceLabel: string;
      pricePlaceholder: string;
      createProductBtn: string;
    };
  };
  store: {
    hasNoProducts: string;
  };
}

export interface ComponentsTranslationTree {
  dashboard: {
    navBar: {
      sheet: {
        name: string;
        mineTxt: string;
        actionsTxt: string;
        advancedActionsTxt: string;
      };
    };
  };
  reusable: {
    footer: {
      copyright: string;
      rightsReserved: string;
    };
    languageSwitchSheet: {
      name: string;
    };
  };
}

export interface ReusableTranslationTree {
  auth: {
    email: string;
    password: string;
    userName: string;
  };
  links: {
    home: string;
    stores: string;
    products: string;
    dashboard: string;
    createSponsor: string;
    createStore: string;
    createProduct: string;
    signUp: string;
    login: string;
    signOut: string;
    termsOfService: string;
  };
  toast: {
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
  };
}

export interface TranslationTree {
  pages: PagesTranslationTree;
  components: ComponentsTranslationTree;
  reusable: ReusableTranslationTree;
}
