"use client";

import React, {useState} from "react";
import clsx from "clsx";
import Background from "@/components/utils/Background";
import { Image } from "@/components/utils/Picture";
import {parseMarkdown} from "@/lib/markdown";
import styles from "./Biography.module.css";
import {ScheduleItem} from "@/components/sections/schedule/Schedule";
import {useLocalizedStaticData} from "@/hooks/useLocalizedStaticData";
import ButtonMain from "@/components/ui/button/button-main/ButtonMain";

export type Biography = {
  section: {
    __typename?: "ComponentHomePageBiografiya";
    SectionTitle?: string | null;
    BioigrafyPeriods?: Array<{
      __typename?: "ComponentHomePageBiografy";
      PeriodName?: string | null;
      PeriodDescription?: string | null;
      id: string;
    } | null> | null;
    Image?: Image;
  };
  locale?: string | null;
};

const MD_CONTENT_EN = `
Radha Govinda dasa is a Bhakti Yoga follower with an experience of over 33 years of spiritual practice under the guidance of his revered spiritual master H.H.Srila Sivarama Swami.

He is a member of the International Society of Krishna Consciousness (ISKCON) founded by His Divine Grace. A.C. Bhaktivedanta Swami Prabhupada.

He joined ISKCON in 1991 in Chisinau, at the age of 16, and got initiation in 1993 from Suhotra Prabhu.

Since 1992 til 1996 he was the Bhakta leader in the Brahmacari Asrama in ISKCON Kishinev Moldova.

Since 1998 till 2006 Radha Govinda dasa became the temple president for the ISKCON Dmitrievskaya Temple, in Kiev Ukraine.

Simultaneously during those years he was the head of the department of ISKCON Communication for Ukraine, and the head of the councilor system in Moldova/Ukraine.

In 2005, after Suhotra Prabhu's fall down he was reinitiated by H.H. Srila Sivarama Swami, during the Radhastami day in New Vraja Dhama.

From 2006 till 2008 he served as the temple president for ISKCON Oradea, Romania.

From 2009 till 2017 he served as the temple president for ISKCON Baltsi, Moldova, and also traveled in the capacity of a traveling preacher in Moldova, Ukraine and sometimes in Romania and Belorus.

From 2017 he is serving as the temple president for ISKCON Bucharest, Romania and as the zonal supervisor for Romania.

In 2021 he graduated from ISKCON GBC College.

In 2022, following the direct order of his spiritual master H.H. Srila Sivarama Swami, Radha Govinda dasa accepted the service of a Guru.

On the 23 February 2022 Radha Govinda dasa was oficially nominated by the GBC to serve as an ISKCON diksa-guru.

On the 10 of September 2022, in the presence of his spiritual master H.H. Srila Sivarama Swami, Radha Govinda dasa initiated his first 12 disciples.

In the spring of 2024 Radha Govinda dasa was assigned by GBC as the zonal supervisor for Romania.

On the 4 of September 2025 at the Turkish Bahakti Camp H.H. Srila Sivarama Swami conducted for Radha Govinda dasa the ceremony of Vanaprastha, offered him the Lunghi of a Vanaprastha and the title Vanachari.

[Listen to the podcast by H.H. Srila Sivarama Swami - Rādhā Govinda Dāsa enters the vānaprastha-āśrama.](https://sivaramaswami.media/audio/20251004_TUR_SRS_Radha_Govinda_Vanacari_EN.mp3)
`

const MD_CONTENT_RU = `
Радха Говинда даса — последователь бхакти-йоги, имеющий более чем 33-летний опыт духовной практики под руководством своего уважаемого духовного учителя Его Святейшества Шрилы Шиварамы Свами.

Он является членом Международного общества сознания Кришны (ИСККОН), основанного Его Божественной Милостью А.Ч. Бхактиведанта Свами Прабхупадой.

Он присоединился к ИСККОН в 1991 году в Кишиневе в возрасте 16 лет и получил посвящение в 1993 году от Сухотра Прабху.

С 1992 по 1996 год он был руководителем бхакт в ашраме «Брахмачари» ИСККОН в Кишиневе (Молдова).

С 1998 по 2006 год Радха Говинда дас занимал должность президента храма ИСККОН «Дмитриевская» в Киеве (Украина).

Одновременно в те годы он возглавлял отдел коммуникаций ИСККОН в Украине и систему советников в Молдове и Украине.

В 2005 году, после падения Сухотра Прабху, он был повторно посвящён Его Святейшеством Шрилой Шиварамой Свами в день Радха-стами в Нью-Враджа-Дхаме.

С 2006 по 2008 год он служил президентом храма ИСККОН в Орадее, Румыния.

С 2009 по 2017 год он служил президентом храма ИСККОН в Балчи, Молдова, а также путешествовал в качестве проповедника по Молдове, Украине, а иногда и по Румынии и Беларуси.

С 2017 года он занимает должность президента храма ИСККОН в Бухаресте (Румыния) и является зональным супервайзером по Румынии.

В 2021 году он окончил колледж ИСККОН GBC.

В 2022 году, следуя прямому указанию своего духовного учителя Его Святейшества Шрилы Шиварамы Свами, Радха Говинда даса принял служение гуру.

23 февраля 2022 года Радха Говинда даса был официально назначен GBC на должность дикша-гуру ИСККОН.

10 сентября 2022 года в присутствии своего духовного учителя Его Святейшества Шрилы Шиварамы Свами Радха Говинда даса посвятил своих первых 12 учеников.

Весной 2024 года Радха Говинда даса был назначен GBC зональным супервайзером для Румынии.

4 сентября 2025 года в турецком лагере Бахакти Его Святейшество Шрила Шиварама Свами провел для Радхи Говинды даса церемонию ванапрастхи, вручил ему лунги ванапрастхи и присвоил титул ваначари.

[Послушайте подкаст Его Святейшества Шрилы Шиварамы Свами — «Радха Говинда Даса вступает в ванапрастха-ашрам».](https://sivaramaswami.media/audio/20251004_TUR_SRS_Radha_Govinda_Vanacari_EN.mp3)
`

export default function NewBiography({ section, locale }: Biography) {
    const [isFullTextVisible, setFullTextVisible] = useState(false);
    const mdContent = locale === 'en' ? MD_CONTENT_EN : MD_CONTENT_RU;
    const localizedData = useLocalizedStaticData()
  return (
    <section className={clsx(styles.section)}>
      <div className={styles.gradient}></div>
      <Background
        className={clsx(styles.background)}
        imageUrl={'/sections/biography/bio-new.jpg'}
      ></Background>
      <div className={clsx("container")}>
        <h2 className={clsx(styles.title, "section-heading")}>
            {locale === 'en' ? "Biography" : "Биография"}
        </h2>
        <div className={clsx(styles.body)}>
          <div className={clsx(styles.display, !isFullTextVisible && styles.displayCollapsed)}>
              {parseMarkdown(mdContent)}
          </div>
            {!isFullTextVisible && (
                <button
                    className="text-[18px] sm:text-[14px] justify-self-end text-grey-dark sm:col-start-2 sm:justify-self-start underline-offset-2 underline hover:text-[#7A66D5] transition-all sm:block hidden"
                    onClick={() => setFullTextVisible(true)}
                >
                    {localizedData?.postPreview.detailsButton}
                </button>
            )}
        </div>
      </div>
    </section>
  );
}
