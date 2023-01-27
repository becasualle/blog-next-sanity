import markdownStyles from "./markdown-styles.module.css";
import { PortableText, PortableTextComponentProps } from "@portabletext/react";
import { urlForImage } from "../lib/sanity";
import { Content } from "../types";

import Image from "next/image";
const ArticleImage = ({ value }: PortableTextComponentProps<Content>) => {
  const [width, height] = value.asset._ref
    .split("-")
    .find((el) => el.includes("x"))
    .split("x");

  return (
    <Image
      className="w-full h-auto"
      width={+width}
      height={+height}
      src={urlForImage(value).url()}
      alt={"Article Image"}
      sizes="100vw"
      loading="lazy"
    />
  );
};

const components = {
  types: {
    image: ArticleImage,
  },
};

export default function PostBody({ content }) {
  return (
    <div className={`max-w-2xl mx-auto ${markdownStyles.markdown}`}>
      <PortableText value={content} components={components} />
    </div>
  );
}
