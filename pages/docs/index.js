import glob from 'fast-glob';
import fs from 'fs';
import matter from 'gray-matter';
import Link from 'next/link';
import { contentGlob, getFileSlug } from './[...slug]';

export default function AllData({ allMdx }) {
  return (
    <>
      {allMdx?.map((data) => (
        <div key={data.slug}>
          <Link href={`/docs/${data.slug}`}>
            <a>{data.title}</a>
          </Link>
          <p>{data.description}</p>

          <div direction="row" spacing={8}>
            {data.tags?.map((tag) => (
              <p key={tag}>#{tag}</p>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

export function getStaticProps() {
  const files = glob.sync(contentGlob);
  const allMdx = files.map((file) => {
    const slug = getFileSlug(file);

    const mdxSource = fs.readFileSync(file);
    const { data } = matter(mdxSource);

    return {
      slug,
      ...data,
    };
  });

  return {
    props: {
      allMdx,
    },
  };
}