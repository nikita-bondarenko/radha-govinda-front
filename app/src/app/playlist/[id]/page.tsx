import { MetadataPropsType } from '@/app/[[...slug]]/page'
import Playlist from '@/components/playlist/Playlist'
import { getPageMetadata } from '@/utils/pageMetadata'
import React from 'react'

export const generateMetadata = getPageMetadata


export default async function Page(props: MetadataPropsType) {

  return <Playlist {...props}></Playlist>
}
