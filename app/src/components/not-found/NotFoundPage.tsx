"use client";
import { NextPage } from "next/types";
import Footer, { FooterDocument } from "../sections/footer/Footer";
import HeaderSmall from "../sections/header-small/HeaderSmall";
import { Menu } from "../ui/nav/Nav";
import { SupportForm } from "../sections/footer/FooterForm";
import { SocialMediaList } from "../sections/footer/SocialMediaLink";
import { Image } from "@/components/utils/Picture";
import typograph from "@/utils/typograph";
import { setLocale } from "@/lib/store/localeSlice";
import { Locale } from "@/utils/getLocalizedData";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import ButtonMain from "../ui/button/button-main/ButtonMain";
import { useRouter } from "next/navigation";

type Props = {
  logo: Image | undefined;
  locale?: string | null;
  menu: Menu;
  footer:
    | {
        __typename?: "Footer";
        SiteName?: string | null;
        Documents?: Array<FooterDocument> | null;
        SocialMedia?: SocialMediaList;
        SupportForm?: SupportForm;
      }
    | null
    | undefined;
};

const NotFoundPage: NextPage<Props> = ({
  locale,
  menu,
  footer,
  logo,
}: Props) => {
  const title = useRef(
    locale === "ru" ? "Страница не найдена" : "Page not found"
  );
  const buttonText = useRef(locale === "ru" ? "На главную" : "Go homepage");
  const buttonHref = useRef(locale === "ru" ? "/" : "/en");
  const backButtonText = useRef(locale === "ru" ? "Вернуться" : "Go back");

  const router = useRouter();

  const backPage = () => {
    router.back();
  };

  const dispatch = useDispatch();

  // Устанавливаем локаль только один раз при монтировании компонента
  useEffect(() => {
    if (locale) {
      dispatch(setLocale(locale as Locale));
    }
  }, [dispatch, locale]);
  return (
    <>
      <main className="main">
        <HeaderSmall
          pageSlug={"not-found"}
          menu={menu}
          logo={logo}
          locale={locale}
          isLanguageButtonVisible={true}
        ></HeaderSmall>
        <section className="container flex flex-col items-center">
          <h1 className="relative text-[40px] font-bold tracking-[0.8px] uppercase mb-[40px]  md:text-[24px] md:tracking-[0.48px] md:mb-[50px]  sm:text-[16px] sm:tracking-[0.32px] sm:mt-[18px]">
            {typograph(title.current)}
          </h1>
          <div className="flex flex-col items-center gap-[20px]">
            <ButtonMain className="" href={buttonHref.current}>
              {buttonText.current}
            </ButtonMain>
            <ButtonMain onClick={backPage} className="opacity-50">
              {backButtonText.current}
            </ButtonMain>
          </div>
        </section>
        <Footer menu={menu} footer={footer} />
      </main>
    </>
  );
};

export default NotFoundPage;
