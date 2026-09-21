import type { APIRoute } from 'astro';
import { labPath } from '../../lib/deployment';
import { blueprintDate, blueprintPremise, websiteScope, homepageJourney, homepageSequence, journeyMethod, journeys, siteMap, websiteReading, futureChange } from '../../lib/user-flow';
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
    `The visual companion is at ${labPath('user-flow/')}. This Markdown and the on-screen briefs are generated from the same content. Paths beginning / refer to this workspace unless identified as planning routes.`, '',
    `Scope: ${websiteScope}`, '',
    '## 1. Visitor journeys', '',
    journeyMethod.premise, '',
    `### ${homepageJourney.title}`, '',
    `${homepageJourney.detail} Brief: ${homepageJourney.target}.`, '',
    ...siteMap.flatMap(stage => [
      `#### ${stage.title} — ${stage.question}`, '',
      ...stage.links.map(link => `- ${link.number} · ${link.title}. Brief: ${link.target}.`), '',
    ]),
    ...journeys.map(journey => [
      `### ${journey.label} — ${journey.title}`, '', `**Visitor need:** ${journey.entry}`, '',
      ...journey.questions.flatMap(question => [
        `#### ${question.question}`, '',
        `**Homepage answer — ${question.title}:** ${question.answer} Brief: ${question.target}.`, '',
        `**Continue if needed:** ${question.continuation.condition} → ${question.continuation.title}. Brief: ${question.continuation.target}.`, '',
      ]),
    ].join('\n')),
    `### ${websiteReading.title}`, '', websiteReading.intro, '', ...websiteReading.points.flatMap(point => [point, '']),
    '## 2. Homepage sequence', '',
    homepageSequence, '',
    ...homeSections.map(briefMarkdown),
    '## 3. Pages and destinations', '', blueprintPremise, '', ...flowPages.map(briefMarkdown),
    `## 4. ${futureChange.title}`, '', futureChange.sequence, '', futureChange.method, '',
  ].join('\n');
  return new Response(markdown, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
};
