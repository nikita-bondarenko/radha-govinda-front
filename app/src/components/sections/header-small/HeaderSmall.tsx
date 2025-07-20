import Header from '@/components/header/Header';
import { Menu } from '@/components/ui/nav/Nav';
import React from 'react'
import Picture, { Image } from "@/components/utils/Picture";
import HeaderLogo from '@/components/header/HeaderLogo';

type Props = {
    logo: Image  | undefined;
    locale: string | null  | undefined;
    pageSlug: string | undefined;
    menu: Menu   | undefined;
}

const HeaderSmall = (props: Props) => {
  return (
    <div className='container'> <Header
    logo={<HeaderLogo {...props.logo} locale={props.locale} />}
    menu={props.menu}
    pageSlug={props.pageSlug || ''}
    locale={props.locale}
    dark={true}
    lectureBarClassName="hidden"
    isSiteName
    IsLanguageButtonVisible
  ></Header></div>
  )
}

export default HeaderSmall