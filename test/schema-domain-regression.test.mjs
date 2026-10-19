import test from 'node:test'
import assert from 'node:assert/strict'
import { buildTrainingSchema } from '../app/treinamentos/training-schema.ts'
import { buildEngajamentoSchema } from '../app/engajamento/engajamento-copy.ts'
for (const lang of ['pt','en']) {
  test(`${lang}: course provider remains valid without inventing a CourseInstance`,()=>{
    for(const course of buildTrainingSchema(lang)['@graph']) {assert.equal(course['@type'],'Course');assert.equal(course.instructor,undefined);assert.match(course.provider['@id'],/#organization$/);assert.ok(course.inLanguage);assert.equal(course.hasCourseInstance,undefined)}
  })
  test(`${lang}: page keeps language while Service uses only supported properties`,()=>{
    const graph=buildEngajamentoSchema(lang)['@graph'];const service=graph.find(n=>n['@type']==='Service');assert.equal(service.inLanguage,undefined);assert.ok(graph.find(n=>n['@type']==='WebPage').inLanguage);assert.ok(service.provider)
  })
}
