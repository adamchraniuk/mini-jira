import { Request, Response } from 'express'
import { knex } from '../db'
import * as _ from 'lodash'

interface Issue {
  id?: number
  summary: string
  description: string
  created_at: Date
  modified_at: Date
  projectId: string
  related_issues?: string
}

interface RespOk {
  ok: string
  id?: string
}

interface RespError {
  error: string
}

type UnionType = Issue | RespOk | RespError

const getRelatedIssues = async (req: Request) => {
  return await knex('issues')
    .select('related_issues')
    .where('projectId', '=', req.params.projectId)
    .where('id', '=', req.params.id)
    .orderBy([{ column: 'id', order: 'asc' }])
    .catch(error => error)
}

const updateRelations = async (projectId: string, id: string, relations: string[]) => {
  await knex('issues')
    .where('projectId', '=', projectId)
    .where('id', '=', id)
    .update({ related_issues: JSON.stringify(relations), modified_at: new Date() })
    .catch(error => error)
}

const getIssue = async (req: Request) => {
  return await knex('issues')
    .where('id', '=', req.body.id || req.params.id)
    .orderBy([{ column: 'id', order: 'asc' }])
    .catch(error => error)
}
export const getSingleIssue = async (req: Request, resp: Response<Issue[]>) => {
  const results = await getIssue(req)
  resp.send(results)
}
const getAllIssues = async (req: Request) => {
  return await knex('issues')
    .select()
    .where('projectId', '=', req.params.projectId)
    .orderBy([{ column: 'id', order: 'asc' }])
    .catch(error => error)
}

export const getIssues = async (req: Request, res: Response<Issue[]>) => {
  const results = await knex('issues')
    .select()
    .orderBy([{ column: 'id', order: 'asc' }])
    .catch(error => error)
  res.send(results)
}

export const getAllFromProject = async (req: Request, res: Response<Issue[]>) => {
  const results = await getAllIssues(req)
  res.send(results)
}

export const getRelated = async (req: Request, res: Response<Issue[]>) => {
  const query = await getRelatedIssues(req)
  const results = await knex('issues')
    .select()
    .where(builder => builder.whereIn('id', JSON.parse(JSON.stringify(query[0].related_issues))))
    .orderBy([{ column: 'id', order: 'asc' }])
    .catch(error => error)
  res.send(results)
}

export const removeRelation = async (req: Request, res: Response<UnionType>) => {
  try {
    const body = req.body
    const { projectId, id } = req.params
    if (!body.id) {
      return res.status(422).send({ error: 'Issue id is missing.' })
    }
    const query = await getRelatedIssues(req)
    const relations: string[] = JSON.parse(JSON.stringify(query[0].related_issues))
    const relationIndex = relations.indexOf(req.body.id)

    if (relationIndex < 0) {
      return res.status(404).send({ error: 'This relation does not exist.' })
    }
    relations.splice(relationIndex, 1)
    await updateRelations(projectId, id, relations)
    const item = await getIssue(req)
    const relatedIssue = JSON.parse(JSON.stringify(item[0].related_issues))
    relatedIssue.splice(relatedIssue.indexOf(req.params.id), 1)
    await updateRelations(projectId, body.id, relatedIssue)
    res.status(200).send({ ok: 'Successfully removed relation.' })
  } catch (e) {
    return new Error(e)
  }
}

export const remove = async (req: Request, res: Response<UnionType>) => {
  const body = req.body
  if (!body.id) {
    return res.status(422).send({ error: 'Issue id is missing.' })
  }
  const issue = await knex('issues')
    .where({ id: body.id })
    .del()
    .catch(error => error)

  if (issue === 0) {
    return res.status(404).send({ error: 'Issue does not exist.' })
  }
  res.status(200).send({ ok: 'Successfully deleted issue.' })
}

export const add = async (req: Request, res: Response<UnionType>) => {
  const body = req.body

  if (!body.summary) {
    return res.status(422).send({ error: 'Issue summary is missing.' })
  }
  try {
    const query = await getAllIssues(req)
    const issueExist = _.find(query, (issue: Issue) => issue.summary === body.summary)

    if (!issueExist) {
      const id = `${req.params.projectId}-${query.length}`
      await knex
        .insert({
          id,
          projectId: req.params.projectId,
          summary: body.summary,
          status: 'TODO',
          description: body.description || '',
          created_at: new Date(),
          modified_at: new Date(),
          related_issues: '[]',
        })
        .into('issues')
      return res.status(200).send({ ok: 'Successfully added new issue.', id })
    }
    res.status(422).send({ error: 'Issue already exists.' })
  } catch (e) {
    return new Error(e)
  }
}

export const addRelation = async (req: Request, res: Response<UnionType>) => {
  try {
    const body = req.body
    const { projectId, id } = req.params
    if (id == body.id) {
      return res.status(422).send({ error: 'You can not do that.' })
    }
    if (!body.id) {
      return res.status(422).send({ error: 'Issue id is missing.' })
    }
    const query = await getRelatedIssues(req)
    if (!query) {
      return res.status(422).send({ error: 'Issue not exist.' })
    }
    const newRelations = JSON.parse(JSON.stringify(query[0].related_issues))
    const relationExist = _.find(newRelations, (issue: Issue) => issue === body.id)
    if (relationExist) {
      return res.status(422).send({ error: 'This relation already exist.' })
    }
    newRelations.push(body.id)
    await updateRelations(projectId, id, newRelations)
    const item = await getIssue(req)
    if (!item) {
      return res.status(422).send({ error: 'Issue not exist.' })
    }
    const relatedIssue = JSON.parse(JSON.stringify(item[0].related_issues))
    relatedIssue.push(id)
    await updateRelations(projectId, body.id, relatedIssue)
    res.status(200).send({ ok: 'Successfully added relation.' })
  } catch (e) {
    return new Error(e)
  }
}

export const edit = async (req: Request, res: Response<UnionType>) => {
  const body = req.body
  if (!body.summary) {
    return res.status(422).send({ error: 'Issue summary is missing.' })
  }
  if (body.summary.length > 55) {
    return res.send({ error: 'Issue name is to long.' })
  }
  const issue = await getIssue(req)
  const status = issue[0].status
  if (status === 'DONE') {
    return res.status(422).send({ error: 'You cannot edit finished issue.' })
  }
  if (body.status === 'DONE' && status !== 'IN PROGRESS') {
    return res.status(422).send({ error: 'You can not do that.' })
  }

  await knex('issues')
    .where({ id: req.params.id })
    .update({ summary: body.summary, description: body.description, status: body.status, modified_at: new Date() })
    .catch(error => error)
  res.status(200).send({ ok: 'Successfully updated issue.' })
}
