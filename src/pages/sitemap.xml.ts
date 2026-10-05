import type { APIRoute } from 'astro';
import {getCollection} from 'astro:content';
import {indexable} from '../data/site';
import {archivePaths, blogCategories, blogCategory} from '../components/content/blog';
export const GET:APIRoute=async({site})=>{
 const fixed=['/','/about/','/products/','/learn/','/rep/','/faq/','/contact/'];
 const posts=await getCollection('blog'),guides=await getCollection('learn');
 const archives=[...archivePaths('/blog/',posts.length),...blogCategories.flatMap(category=>archivePaths(`/blog/category/${category.slug}/`,posts.filter(post=>blogCategory(post).slug===category.slug).length))];
 const routes=indexable?[...fixed,...posts.map(p=>`/blog/${p.id}/`),...guides.map(p=>`/learn/${p.id}/`),...archives]:[];
 return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(path=>`<url><loc>${new URL(path,site)}</loc></url>`).join('')}</urlset>`,{headers:{'Content-Type':'application/xml; charset=utf-8'}});
};
