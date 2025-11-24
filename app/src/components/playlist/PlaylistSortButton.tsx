import React from 'react'
import { text } from 'stream/consumers';
import Shuffle from '../../shared/ui/icons/Shuffle';
import PlaylistButton from './PlaylistButton';
import CircleArrowsIcon from '../../shared/ui/icons/CircleArrowsIcon';
import ParallelArrows from '../../shared/ui/icons/ParallelArrows';
type PlaylistSortButtonProps = {
    onClick: () => void
    text?: string
    isVisible: boolean
}

export default function PlaylistSortButton({onClick, text, isVisible}: PlaylistSortButtonProps) {
 return (
     <PlaylistButton
       text={text}
       onClick={onClick}
       icon={ <ParallelArrows fill="#7A66D5"></ParallelArrows>}
       className="bg-[#EDEDED] text-[#7A66D5] absolute top-0 left-0 [&_.icon-wrapper]:translate-y-[0px] z-10"
       isVisible={isVisible}
     ></PlaylistButton>
   );
}
