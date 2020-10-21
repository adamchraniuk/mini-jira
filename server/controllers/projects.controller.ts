import { Request, Response } from 'express'
import * as _ from 'lodash'
import { knex } from '../db'

interface Project {
  id?: string
  name: string
  description?: string
  created_at: Date
  modified_at: Date
}

interface RespOk {
  ok: string
}

interface RespError {
  error: string
}

type UnionType = Project | RespOk | RespError

const allProjects = async () => {
  return await knex('projects')
    .select()
    .orderBy([{ column: 'modified_at', order: 'asc' }])
    .catch(error => error)
}

export const getAll = async (req: Request, res: Response<Project[]>) => {
  const results: Project[] = await allProjects()
  res.send(results)
}
export const getSingleProject = async (req: Request, res: Response<Project[]>) => {
  const results = await knex('projects')
    .select()
    .where({ id: req.params.id })
    .catch(error => error)
  res.send(results)
}

export const addNew = async (req: Request, res: Response<UnionType>) => {
  const body: Project = req.body
  if (!body.name) {
    return res.status(422).send({ error: 'Project name is missing.' })
  }
  if (body.name.length > 55) {
    return res.send({ error: 'Project name is to long.' })
  }

  const query = await allProjects()
  const projectExist = _.find(query, (project: Project) => project.name === body.name)

  if (!projectExist) {
    const id = `${body.name.substring(0, 3).toUpperCase()}`
    await knex
      .insert({
        id,
        name: body.name,
        description: body.description || '',
        created_at: new Date(),
        modified_at: new Date(),
      })
      .into('projects')
    return res.status(200).send({ ok: 'Successfully added new project.', id })
  }
  res.status(422).send({ error: 'Project already exists.' })
}

export const update = async (req: Request, res: Response<UnionType>) => {
  const body: Project = req.body
  if (!body.name || !body.id) {
    return res.status(422).send({ error: 'Project name or id is missing.' })
  }
  if (body.name.length > 55) {
    return res.send({ error: 'Project name is to long.' })
  }
  await knex('projects')
    .where({ id: body.id })
    .update({ name: body.name, description: body.description, modified_at: new Date() })
    .catch(error => error)
  res.status(200).send({ ok: 'Successfully updated project.' })
}

export const remove = async (req: Request, res: Response<UnionType>) => {
  const body: Project = req.body
  if (!body.id) {
    return res.status(422).send({ error: 'Project id is missing.' })
  }
  const project = await knex('projects')
    .where({ id: body.id })
    .del()
    .catch(error => error)

  if (project === 0) {
    return res.status(404).send({ error: 'Project does not exist.' })
  }
  res.status(200).send({ ok: 'Successfully deleted project.' })
}
