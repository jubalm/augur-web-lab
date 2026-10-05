import extraction from './homepage-copy-source.json';

/** Independent visible TEXT-node extraction from canonical Figma 28:7.
 * Keep this reference separate from the data used to render the website.
 * Typography/whitespace normalization and the explicit newsletter fallback
 * are applied only by scripts/check-copy.ts.
 */
interface CanonicalCopySource {
  fileKey: string;
  nodeId: string;
  extractedAt: string;
  sections: { id: string; name: string; text: string[][] }[];
}
export const homepageCopySource = extraction satisfies CanonicalCopySource;
