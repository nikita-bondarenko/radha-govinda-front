"use client";

import React, { memo, ReactNode, useState } from "react";
import styles from "./Schedule.module.css";
import Modal from "@/components/utils/modal/Modal";
import CloseButton from "@/components/ui/closeButton/CloseButton";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { getLocalizedData, type Locale } from "@/utils/getLocalizedData";
import { LocaleState, LocaleStore } from "@/lib/localeStore/localeStore";
import clsx from "clsx";

export type ParentElement = {
  children: ReactNode;
  className?: string;
};

export type ScheduleItemData = {
  __typename?: "ComponentHomePageSobytie";
  Place?: string | null;
  Period?: string | null;
  Name?: string | null;
  MoreButtonHref?: string | null;
  EventDescription?: string | null;
  id: string;
};

export type ComponentCommonSectionRaspisanieType = {
  __typename?: "ComponentCommonSectionRaspisanie";
  TextBelow?: string | null;
  SectionTitle?: string | null;
  ScheduleItem?: Array<ScheduleItemData | null> | null;
};

export type ScheduleItem = {
  data: ScheduleItemData | null;
  detailsButtonText: string | undefined;
  onDetailsButtonClick: (id: string | undefined) => void;
};

export const ScheduleItem = memo(
  ({ data, detailsButtonText, onDetailsButtonClick }: ScheduleItem) => {
    return (
      <div className="py-[20px] border-b-[1px] border-grey-middle first:border-t-[1px] min-h-[96px]  items-center grid grid-cols-[1fr_1fr_1fr_300px] justify-between  tracking-[0.36px] md:min-h-[58px] sm:grid-cols-[1fr_140px]">
        <div className="text-grey-middle sm:col-start-2">{data?.Period}</div>{" "}
        <div>{data?.Place}</div>{" "}
        <div className="font-bold sm:col-start-2 font-manrope">
          {data?.Name}
        </div>{" "}
        <button
          className="justify-self-end text-grey-dark sm:col-start-2 sm:justify-self-start"
          onClick={() => onDetailsButtonClick(data?.id)}
        >
          {detailsButtonText}
        </button>
      </div>
    );
  }
);

export type ScheduleProps = {
  section: ComponentCommonSectionRaspisanieType;
  locale?: Locale;
};

export default memo(function Schedule({ section }: ScheduleProps) {
  const [isIsEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedScheduleItemData, setSelectedScheduleItemData] =
    useState<ScheduleItemData>();

  const onDetailsButtonClick = (id: string | undefined) => {
    const selectedEvent = section.ScheduleItem?.find(
      (event) => event?.id === id
    );
    if (selectedEvent) {
      setSelectedScheduleItemData(selectedEvent);
      setIsEventModalOpen(true);
    } else {
      console.error("Event data is not found", 500);
    }
  };

  const handleCloseButtonClick = () => {
    setIsEventModalOpen(false);
  };

  const locale = useSelector((state: LocaleState) => state.locale.locale);
  const detailsButtonText =
    getLocalizedData(locale)?.section.schedule.detailsButton;
  return (
    <>
      <section className="container text-[18px] md:text-[14px] ">
        <h2 className="section-heading mb-[20px] md:mb-[10px]">
          {section.SectionTitle}
        </h2>
        <div className=""></div>
        <div className="flex flex-col ">
          {section.ScheduleItem?.map((item) => (
            <ScheduleItem
              detailsButtonText={detailsButtonText}
              onDetailsButtonClick={onDetailsButtonClick}
              data={item}
              key={item?.id}
            ></ScheduleItem>
          ))}
        </div>
        <p className="text-grey-dark mt-[25px]">{section.TextBelow}</p>
      </section>
      <Modal isOpen={isIsEventModalOpen}>
        <div className="h-full w-full bg-white p-40 md:py-[30px] md:px-[20px] sm:py-[20px] text-[18px] leading-[120%] tracking-[0.36px] md:text-[14px]">
          <CloseButton
            className="absolute top-[46px] right-[46px] md:top-[36px] md:right-[26px] sm:top-[26px] sm:right-[30px] "
            onClick={handleCloseButtonClick}
          ></CloseButton>
          <h3 className="section-heading mb-[15px] sm:mb-[18px]">
            {selectedScheduleItemData?.Name}
          </h3>
          <p className="text-grey-middle  mb-[10px] ">
            {selectedScheduleItemData?.Period}
          </p>
          <p className=" text-brown  font-bold  mb-[10px] font-manrope ">
            {selectedScheduleItemData?.Place}
          </p>
          <div className="markdown max-w-[727px]">
            <ReactMarkdown>
              {selectedScheduleItemData?.EventDescription}
            </ReactMarkdown>
          </div>
        </div>
      </Modal>
    </>
  );
});
