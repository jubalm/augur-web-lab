import type { APIRoute } from 'astro';
import { blueprintDate, blueprintPremise, websiteScope, journeys, websiteReading, futureChange } from '../../lib/user-flow';
import { homeSections, flowPages, type FlowBrief } from '../../lib/user-flow-pages';

export const prerender = true;

function briefMarkdown(brief: FlowBrief) {
  return [
    `### ${brief.title}`, '', `ID: ${brief.id} · Planning route: ${brief.route}`,
    `Status: ${brief.status}`, '',
    `**Visitor question:** ${brief.question}`, '', `**Purpose:** ${brief.purpose}`, '',
    '**Content:**', '', ...brief.contains.map(item => `- ${item}`), '',
  ].join('\n');
}

export const GET: APIRoute = () => {
  const markdown = [
    '# Augur website — User flow blueprint', '', `Working draft · ${blueprintDate}`, '',
    blueprintPremise, '',
    'The visual companion is at /lab/user-flow. This Markdown and the on-screen briefs are generated from the same content. Paths beginning / refer to this workspace unless identified as planning routes.', '',
    `Scope: ${websiteScope}`, '',
    '## 1. Visitor journeys', '',
    ...journeys.map(journey => [
      `### ${journey.label} — ${journey.title}`, '', `**Entry:** ${journey.entry}`, '',
      ...journey.steps.map((step, i) => `${i + 1}. ${step.label} → ${step.title}: ${step.detail}. Brief: ${step.target}.`), '',
      '**Alternate routes:**', '', ...journey.branches.map(branch => `- ${branch.condition} ${branch.label}. Brief: ${branch.target}.`), '',
      `**Useful outcome:** ${journey.success}`, '', `**Proposed test:** ${journey.test}`, '',
    ].join('\n')),
    '## 2. Homepage sequence', '',
    ...homeSections.map(briefMarkdown),
    '## 3. Pages and destinations', '', blueprintPremise, '', ...flowPages.map(briefMarkdown),
    `### ${websiteReading.title}`, '', ...websiteReading.points.flatMap(point => [point, '']),
    `## 4. ${futureChange.title}`, '', futureChange.sequence, '', futureChange.method, '', futureChange.measure, '',
  ].join('\n');
  return new Response(markdown, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
