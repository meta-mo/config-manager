#!/usr/bin/env node

require('dotenv').config()

const fs = require('fs')
const path = require('path')
const contentful = require('contentful')
const commandLineArgs = require('command-line-args')
const merge = require('deepmerge')

const optionDefinitions = [
  { name: 'env', alias: 'e', type: String, defaultOption: true },
  { name: 'spaceId', alias: 's', type: String, defaultValue: '' },
  { name: 'accessToken', alias: 'a', type: String, defaultValue: '' }
]
const options = commandLineArgs(optionDefinitions)

const rc = require(process.cwd() + '/.cntconfigrc.json')

const client = contentful.createClient({
  space: options.spaceId ? options.spaceId : process.env.CONTENTFUL_SPACE_ID,
  accessToken: options.accessToken ? options.accessToken : process.env.CONTENTFUL_ACCESS_TOKEN
})

async function saveContentfulJSON(dir, name, options = {}, specificField = '', firstOnly = false, filterUseFields = null) {
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

  if (filterUseFields) {
    items = items.map(item => {
      let newItem = {}
      filterUseFields.forEach(field => {
        try {
          let unit = {}
          const fieldKeys = field.split('.')
          fieldKeys.forEach((_, index) => {
            let key = ''
            for (let i = 0; index >= i; i++) {
              key += '.' + fieldKeys[i]
            }
            const value = eval('item' + key)
            eval('unit' + key + '=' + (typeof value === 'object' ? '{}' : 'value'))
          })
          newItem = merge(newItem, unit)
        } catch (e) {
          throw new Error(`${field} parameter does not exist.`)
        }
      })
      return newItem
    })
  }

  const jsonData = JSON.stringify(firstOnly ? items[0] : items)

  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(`${dir}/${name}.json`, jsonData)
}

async function main() {
  const env = options.env || process.env.CONTENTFUL_CONFIG_ENV

  await rc[env].models.forEach(async (model) => {
    await saveContentfulJSON(rc[env].dir, model.name, model.options, model.specificField, model.firstOnly, model.filterUseFields)
  })
}
main()
