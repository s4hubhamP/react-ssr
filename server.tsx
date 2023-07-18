import path from 'path'
import {readdirSync} from 'fs'

import express from 'express'
import React from 'react'
import {renderToString} from 'react-dom/server'

const app = express()

app.use(express.static('dist'))

const pages = readdirSync(path.join(process.cwd(), '/pages')).map(
  pageFile => pageFile.split('.')[0]
)

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>SSR with RR</title>
      </head>
      <body>
        <p>Hello World</p>
        <a href='/breeds'>breeds</a>
      </body>
    </html>
  `)
})

pages.forEach(page => {
  app.get(`/${page}`, async (req, res) => {
    const module = await import(`./pages/${page}`)
    const Component = module.default
    let props = {}

    if (module.getServerSideProps) {
      props = await module.getServerSideProps(req)
    }

    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>SSR with RR</title>
        </head>
        <body>
          <div id="root">${renderToString(<Component {...props} />)}</div>
        </body>
      </html>
    `)
  })
})

app.listen(3000, () => {
  console.log('Server is listening on port: 3000')
})
