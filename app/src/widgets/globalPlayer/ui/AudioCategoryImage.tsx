import Picture, { Image } from "@/components/utils/Picture";

type Props = {
  image?: Image;
};
export const AudioCategoryImage = ({ image }: Props) => {
  return (
      <Picture className="overflow-hidden rounded-[5px] w-[40px] h-[40px] shrink-0" {...image}></Picture>
  );
};
