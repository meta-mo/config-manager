#!/usr/bin/env node

require('dotenv').config()

const fs = require('fs')
const path = require('path')
const contentful = require('contentful')
const commandLineArgs = require('command-line-args')

const optionDefinitions = [
  { name: 'env', alias: 'e', type: String, defaultOption: true, defaultValue: 'default' },
  { name: 'spaceId', alias: 's', type: String, defaultValue: '' },
  { name: 'accessToken', alias: 'a', type: String, defaultValue: '' }
]
const options = commandLineArgs(optionDefinitions)

const rc = require(process.cwd() + '/.cntconfigrc.json')

const client = contentful.createClient({
  space: options.spaceId ? options.spaceId : process.env.CONTENTFUL_SPACE_ID,
  accessToken: options.accessToken ? options.accessToken : process.env.CONTENTFUL_ACCESS_TOKEN
})

async function saveContentfulJSON(dir, name, options = {}, specificField = '', firstOnly = false) {
  let items = await client.getEntries({
    content_type: name,
    ...options
  })

  items = items.items.map((item) => {
    if (specificField && item.fields[specificField]) {
      return item.fields[specificField]
    } else {
      return item.fields
    }
  })

  const jsonData = JSON.stringify(firstOnly ? items[0] : items)

  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(`${dir}/${name}.json`, jsonData)
}

async function main() {
  await rc[options.env].models.forEach(async (model) => {
    await saveContentfulJSON(rc.default.dir, model.name, model.options, model.specificField, model.firstOnly)
  })
}
main()
