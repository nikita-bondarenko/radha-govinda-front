import Background from '@/components/utils/Background'
import { Image } from '@/components/utils/Picture';
import React from 'react'

type Props = {
  section: {
    __typename?: 'ComponentCommonSectionIzobrazhenie';
    image?: Image;
  }
}
const SectionImage = (props: Props) => {  
  return (
    <section className='max-w-[1512px] mx-auto'>
      <div className='relative w-full aspect-[16/9] rounded-[20px] overflow-hidden sm:aspect-auto sm:h-[567px]'>
      <Background
        className={"w-full h-full  sm:bg-[position:63%_50%]"}
        image={props.section.image}
        mdImageUrl={props.section.image?.url}
        smImageUrl={props.section.image?.url}
      ></Background>
      </div>
    
    </section>
  )
}

export default SectionImage