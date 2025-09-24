type StaticElementsData = {
  playlist: {
    controls: {
      audio: string;
      duration: string;
      playButton: {
        play: string
        stop: string
      };
      mixButton: {
        shuffle: string;
        sort: string;
      };
    };
  };
  audioPreview: {
    shareButton: string;
    succesMessage: string;
  };
  postPreview: {
    detailsButton: string;
  };
  header: {
    siteName: string;
  };
  section: {
    schedule: {
      detailsButton: string;
    };
    filter: {
      input: {
        placeholder: string;
      };
      allCategoriesOption: {
        default: string;
        movies: string;
        audios: string;
        posts: string;
      };
    };
    catalog: {
      emptyMessage: string;
      loadingMessage: string;
    };
  };
  footer: {
    formButton: string;
  };
  form: {
    errors: {
      email: string;
      amount: string;
    };
  };
};

const staticElementsDataRu: StaticElementsData = {
  playlist: {
    controls: {
      audio: "аудио",
      duration: "часов",
      playButton: {
        play: "слушать",
        stop: "остановить"
      },
      mixButton: {
        shuffle: "перемешать",
        sort: "сортировать"
      }
    },
  },
  audioPreview: {
    shareButton: "поделиться",
    succesMessage: "ccылка скопирована",
  },
  postPreview: {
    detailsButton: "читать дальше",
  },
  header: {
    siteName: "Е.М.Радха Говинда Прабху",
  },
  section: {
    schedule: {
      detailsButton: "подробнее",
    },
    filter: {
      input: {
        placeholder: "Поиск",
      },
      allCategoriesOption: {
        default: "Все категории",
        movies: "Все видео",
        audios: "Все аудио",
        posts: "Все статьи",
      },
    },
    catalog: {
      emptyMessage: "Ничего не найдено",
      loadingMessage: "Загрузка...",
    },
  },
  footer: {
    formButton: "Отправить",
  },
  form: {
    errors: {
      email: "Введите корректный email",
      amount: "Поле обязательно",
    },
  },
};

const staticElementsDataEn: StaticElementsData = {
  playlist: {
    controls: {
      audio: "audios",
      duration: "hours",
      playButton: {
        play: 'listen',
        stop: "pause"
      },
      mixButton: {
        shuffle: "shuffle",
        sort: "sort"
      }
    },
  },
  audioPreview: {
    shareButton: "share",
    succesMessage: "link copied",
  },
  postPreview: {
    detailsButton: "read more",
  },
  header: {
    siteName: "H.G.Radha Govinda Prabhu",
  },
  section: {
    schedule: {
      detailsButton: "details",
    },
    filter: {
      input: {
        placeholder: "Search",
      },
      allCategoriesOption: {
        default: "All categories",
        movies: "All videos",
        audios: "All audios",
        posts: "All articles",
      },
    },
    catalog: {
      emptyMessage: "Nothing",
      loadingMessage: "Loading...",
    },
  },
  footer: {
    formButton: "Submit",
  },
  form: {
    errors: {
      email: "Input correct email",
      amount: "The field requared",
    },
  },
};

const staticTextsData = {
  en: staticElementsDataEn,
  ru: staticElementsDataRu,
};
export type Locale = "ru" | "en";
export const getLocalizedData = (
  locale: Locale | null
): StaticElementsData | undefined => {
  if (!locale) return;
  return staticTextsData[locale];
};
