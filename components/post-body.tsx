import markdownStyles from "./markdown-styles.module.css";
import { PortableText, PortableTextComponentProps } from "@portabletext/react";
import { urlForImage } from "../lib/sanity";
import { ImageBlock, CodeBlock } from "../types";
import Image from "next/image";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

const ArticleImage = ({ value }: PortableTextComponentProps<ImageBlock>) => {
  // @ts-ignore
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

const Pre = () => {
  return <span>asodasm</span>;
};
const CodeHighlight = ({ value }: PortableTextComponentProps<CodeBlock>) => {
  return (
    <SyntaxHighlighter language={value.language} style={oneDark}>
      {value.code}
    </SyntaxHighlighter>
  );
};

const components = {
  types: {
    image: ArticleImage,
    code: CodeHighlight,
  },
};

export default function PostBody({ content }) {
  return (
    <div
      className={`max-w-2xl xl:max-w-3xl mx-auto ${markdownStyles.markdown}`}
    >
      <PortableText value={content} components={components} />
    </div>
  );
}
