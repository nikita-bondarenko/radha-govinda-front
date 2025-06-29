import { DocumentQuery } from '@/gql/generated/graphql'
import React from 'react'
import HeaderSmall from './sections/header-small/HeaderSmall'
import PageContent from './sections/pageContent/PageContent'
import Footer from './sections/footer/Footer'
import { setLocale } from '@/lib/store/localeSlice'
import { Locale } from '@/utils/getLocalizedData'
import { useDispatch } from 'react-redux'

const DocumentGenerator = ({menu, logo,doc,footer}: DocumentQuery) => {
  const dispatch = useDispatch();
  dispatch(setLocale(doc?.locale as Locale));
  return (
    <>
    <main className="main">
      <HeaderSmall
        pageSlug={doc?.Slug}
        menu={menu}
        logo={logo}
        locale={doc?.locale}
      ></HeaderSmall>
      <PageContent
        content={doc?.DocumentContent}
        title={doc?.DocumentName}
      ></PageContent>
      <Footer menu={menu} footer={footer} />
    </main>
  </>
  )
}

export default DocumentGenerator