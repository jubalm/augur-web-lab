import type { CollectionEntry } from 'astro:content';
export const blogPageSize = 6;
export function archivePaths(base: string, count: number): string[] {
  return Array.from({ length: Math.max(1, Math.ceil(count / blogPageSize)) }, (_, index) => index ? `${base}${index + 1}/` : base);
}
export const blogCategories = [
  { slug:'project-updates', label:'Project updates', categories:['Community','Update','Report'] },
  { slug:'research-and-design', label:'Research and design', categories:['Research','Explainer'] },
  { slug:'for-builders', label:'For builders', categories:['Guide'] },
] as const;
export function blogCategory(post:CollectionEntry<'blog'>) { return blogCategories.find(group=>(group.categories as readonly string[]).includes(post.data.category))!; }
export function newestFirst(posts:CollectionEntry<'blog'>[]) { return [...posts].sort((a,b)=>b.data.publishedAt.getTime()-a.data.publishedAt.getTime()); }
