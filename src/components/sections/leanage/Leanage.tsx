import Picture, { Image } from "@/components/utils/Picture";
import clsx from "clsx";
import React from "react";
import styles from "./Leanage.module.css";
export type LeanageProps = {
  section?: {
    __typename?: string;
    SectionTitle?: string | null;
    LineageMember?: Array<{
      __typename?: string;
      Description?: string | null;
      Name?: string | null;
      Role?: string | null;
      id: string;
      Image?: Image;
    } | null> | null;
  };
};

export default function Leanage({ section }: LeanageProps) {
  return (
    <section className="container">
      <h2 className={clsx("section-heading", styles.title)}>
        {section?.SectionTitle}
      </h2>
      <ul className={styles.list}>
        {section?.LineageMember?.map((member, index) => (
          <li
            key={member?.id}
            className={clsx(styles.member, index === 0 && styles.first)}
          >
            <div className={styles.top}>
              <div className={styles.member__picture}>
                <img
                  src={member?.Image?.url}
                  srcSet={`${
                    typeof member?.Image?.url === "string"
                      ? member?.Image?.url + " 500w, "
                      : ""
                  } 
                    ${
                      typeof member?.Image?.formats?.small.url === "string"
                        ? member?.Image?.formats?.small.url + " 100w, "
                        : ""
                    }
                    ${
                      typeof member?.Image?.formats?.thumbnail.url === "string"
                        ? member?.Image?.formats?.thumbnail.url + " 50w "
                        : ""
                    }`}
                  sizes="(max-width: 766px) 100vw, 33vw"
                  alt={member?.Image?.alternativeText || ""}
                />
              </div>
            </div>

            <div className={styles.member__content}>
              <h3 className={styles.name}>{member?.Name}</h3>
              <p className={styles.role}>{member?.Role}</p>
              <p className={styles.description}>{member?.Description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
