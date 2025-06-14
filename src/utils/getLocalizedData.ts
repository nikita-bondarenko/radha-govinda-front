type StaticElementsData = {
  header: {};
  section: {
    schedule: {
        detailsButton: string
    };
  };
  footer: {
      formButton: string
  };
};

const staticElementsDataRu: StaticElementsData = {
    header: {},
    section: {
        schedule: {
            detailsButton: "подробнее"
        }
    },
    footer: {
        formButton: "Отправить"
    }
};

const staticElementsDataEn: StaticElementsData = {
    header: {},
    section: {
        schedule: {
            detailsButton: "details"
        }
    },
    footer: {
        formButton: "Submit"
    }
};

const staticTextsData = {
    en: staticElementsDataEn,
    ru: staticElementsDataRu
}
export type Locale = "ru" | "en"
export const getLocalizedData = (locale: Locale | null): StaticElementsData | undefined => {
    if(!locale) return
  return staticTextsData[locale];
};
