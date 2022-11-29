import fsPromises from "fs/promises";
import matter from "gray-matter";
import path from "path";

export async function documentContents(slug: string) {
  if (!slug) return;
  const odirectory = "/docs/help/";
  let fullpath = path.join(process.cwd(), odirectory, `${slug}.mdx`);
  const fileContents = fsPromises.readFile(fullpath, "utf8");
  const { data, content } = matter(await fileContents);
  const formattedContent =
    data.title !== undefined ? `# ${data.title} \n\n${content}` : content;
  return { slug: slug, meta: data, content: formattedContent };
}
