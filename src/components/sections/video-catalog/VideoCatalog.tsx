import Filter from '@/components/ui/filter/Filter'
import { Movie } from '@/components/sections/video-preview/VideoPreview'
import React from 'react'

export type Category = {
    __typename?: string;
    Name: string;
    documentId: string;
} | null

type Props = {
    movies: Movie[]
    videoCategories: Category[]
}

const VideoCatalog = ({movies, videoCategories}: Props) => {
  return (
    <div>
        <Filter></Filter>

    </div>
  )
}

export default VideoCatalog