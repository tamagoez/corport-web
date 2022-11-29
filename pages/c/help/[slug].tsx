import { useRouter } from "next/router";
// import { documentContents } from "../../../scripts/c/help/fetchdocument";

export default function HelpDocs() {
  const router = useRouter();
  const slug = router.query.slug as string;
  // const content = documentContents(slug);
  return <>{slug}</>;
}
