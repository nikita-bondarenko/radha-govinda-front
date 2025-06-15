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
  form: {
    errors: {
        email: string
        amount: string
    }
  }
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
    },
    form: {
        errors: {
            email: "Введите корректный email",
            amount: "Поле обязательно"
        }
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
    },
    form: {
        errors: {
            email: "Input correct email",
            amount: "The field requared"
        }
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
