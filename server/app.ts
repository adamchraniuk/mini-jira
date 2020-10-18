import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import * as projects from './controllers/projects.controller'
import * as issues from './controllers/issues.controller'

dotenv.config()
const app = express()

app.set('port', process.env.PORT || 4000)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', '*')
  next()
})
app.get('/projects', projects.getAll)
app.get('/projects/:id/details', projects.getSingleProject)
app.post('/projects/add', projects.addNew)
app.put('/projects', projects.update)
app.post('/projects/remove', projects.remove)

app.get('/issues/:id', issues.getSingleIssue)
app.get('/issues', issues.getIssues)
app.get('/projects/:projectId', issues.getAllFromProject)
app.post('/projects/:projectId/add', issues.add)
app.post('/projects/:projectId/remove', issues.remove)
app.put('/projects/:projectId/:id', issues.edit)

app.get('/issues/:projectId/:id/related', issues.getRelated)
app.put('/projects/:projectId/:id/related', issues.removeRelation)
app.post('/projects/:projectId/:id/related', issues.addRelation)

app.listen(app.get('port'), () => {
  console.log('App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'))
  console.log('Press CTRL-C to stop\n')
})

export default app
