# Mini Jira = Typescript + Express + Vuejs

`npm run serve` to run both client & server project concurrently 
 
`npm run build` to build both client & server project to dist/

## How to run

### Locally with docker
1. `docker-compose up`

App will be avaliable at:

Front: http://localhost:8000/

API: http://localhost:4000/

## ENDPOINTS
`get /projects` - returns all projects

`post /projects` - add new project (req. { name: 'Example'} )

`put /projects` - edit project (req. example: { id: "WEB", name: 'Example' })

`delete /projects` - remove project (req. { id: "WEB" })

`get /projects/:projectId` - all issues in project

`post /projects/:projectId` - add new issue to project (req: { summary: 'Example' })

`delete /projects/:projectId` - remove issue (req. { id: "WEB-1" })

`put /projects/:projectId/:id` - edit issue (req: { summary: 'Example' })

`get /projects/:projectId/:id/related` - all related issues

`put /projects/:projectId/:id/related` - remove relation (req. { id: "WEB-1" })

`post /projects/:projectId/:id/related` - add relation (req. { id: "WEB-1" })
