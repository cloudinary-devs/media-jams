import Link from 'next/link';

export default function ContentBox({ data }) {
  return (
    <>
      <Link href={`/docs/${data.slug}`}>
        <a>{data.title}</a>
      </Link>
      <p>{data.description}</p>

      <div direction="row" spacing={8}>
        {data.tags?.map((tag) => (
          <p key={tag}>#{tag}</p>
        ))}
      </div>
    </>
  );
}
