import { Avatar, Date, CoverImage, PostTitle } from "./index";
import { IndexPostDocument } from "../types";
import markdownStyles from "./markdown-styles.module.css";

type Props = Omit<IndexPostDocument, "_id" | "excerpt" | "name" | "slug">;

export default function PostHeader({ title, coverImage, date, author }: Props) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12 dark:text-slate-50">
        {author && <Avatar name={author.name} picture={author.picture} />}
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} image={coverImage} priority />
      </div>
      <div className="max-w-2xl xl:max-w-3xl mx-auto">
        <div className="block mb-6 md:hidden">
          {author && <Avatar name={author.name} picture={author.picture} />}
        </div>
        <div className={`mb-2 text-lg" ${markdownStyles.markdown}`}>
          <Date dateString={date} />
        </div>
      </div>
    </>
  );
}
