type StaticElementsData = {
  header: {};
  section: {
    schedule: {
        detailsButton: string
    };
    filter: {
          input: {
            placeholder: string
          },
          allCategoriesOption: {
            default: string
            movies: string
            audios: string
            posts: string
          }
    }
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
        },
      filter: {
        input : {
            placeholder: "Поиск"
        },
        allCategoriesOption: {
            default: "Все категории",
            movies: "Все видео",
            audios: "Все аудио",
            posts: "Все статьи"
        }
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
        },
        filter: {
            input: {
                placeholder: "Search"
            },
            allCategoriesOption: {
                default: "All categories",
                movies: "All videos",
                audios: "All audios",
                posts: "All articles"
            }
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
