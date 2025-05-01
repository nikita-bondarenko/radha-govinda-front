import { localizeHref } from '@/utils/localizeHref';
import { Maybe } from 'graphql/jsutils/Maybe';
import Link from 'next/link';
import React, { memo, ReactNode } from 'react'
import styles from './PreviewSection.module.css'
import clsx from 'clsx';
export type PreviewSectionProps = {
    children: ReactNode;
    title: Maybe<string>;
    locale: Maybe<string>;
    directedPageSlug: string;
    linkText: {
        en: string;
        ru: string
    }
}

export default memo(function PreviewSection({children,title,locale,directedPageSlug, linkText} : PreviewSectionProps) {
  return (
    <section>
    <div className="container">
      <h2 className={clsx(styles.title, "section-heading")}>{title}</h2>

      <Link className={styles.link}
        href={localizeHref({
          pageLocale: locale,
          pageSlug: directedPageSlug,
        })}
      >
        {locale === "ru" ? linkText.ru : linkText.en}
      </Link>
      {children}
    </div>
  </section>
  )
})
