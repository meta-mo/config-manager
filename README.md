# contentful-config

Fetching JSON from Contentful to use the same configs across multiple projects and repositories.

## Installation

Install using npm as devDependency.

```bash
$ npm install contentful-config --save-dev
```

Add a command to the scripts of package.json.

```json
  "scripts": {
    "serve": "npm run config"
    "config": "contentful-config"
  },
```

## Configuration

### .env

Environment variables are automatically loaded by creating .env in the same directory as package.json.
You can also use an existing environment variable without using .env.

```env
CONTENTFUL_SPACE_ID=up61khjnndzm
CONTENTFUL_ACCESS_TOKEN=FeBoFnhmElUGRC76v-2T6DxOHhhhhg9FyiwWVxVs148
CONTENTFUL_CONFIG_ENV=local
```

You can also apply parameters when command execution without creating .env.

### .cntconfigrc.json

Create a file as **.cntconfigrc.json** as in the following code:

```json
{
  "local": {
    "dir": "./configs",
    "models": [
      {
        "name": "env",
        "options": {
          "order": "fields.type",
          "fields.type": "local"
        },
        "specificField": "json",
        "firstOnly": true,
        "filterUseFields": [
          "contentful.endpoint"
        ]
      },
      {
        "name": "resources",
        "options": {
          "order": "fields.type"
        }
      }
    ]
  },
  "dev": {
    "dir": "./configs",
    "models": [
      {
        "name": "env",
        "options": {
          "order": "fields.type",
          "fields.type": "dev"
        },
        "specificField": "json",
        "firstOnly": true
      }
    ]
  }
}

```

| Parameter | Description | Default |
| ---- | ---- | ---- | --- |
| * | The environment specified by the command execution or environment variable is selected. | '' |
| *.dir | Destination of the config file. | '' |
| *.models | Contentful models objects. |  |
| *.models.name | Output Contentful model name. This model name will be the file name. |  |
| *.models.options | See search-parameters in Contentful's getEntries. https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters/links-to-asset | {} |
| *.models.specificField | Specify this if you want data only for fields in the model. | '' |
| *.models.firstOnly | Fetch only a single from an array. (it becomes an object type) | false |
| *.models.filterUseFields | Fetch only the specified parameters from the objects in the array after specificField parameter. | undefind |

### .gitignore

Add the destination directory of the config file to .gitignore.

```env
configs/
```

## Usage

Execute the following command in the same directory as the configuration file.

### Execute with environment variables

```bash
$ npm run config
```

### Execute without environment variables

```bash
$ npm run config -- dev --spaceId up61khjnndzm --accessToken FeBoFnhmElUGRC76v-2T6DxOHhhhhg9FyiwWVxVs148
```

## Development Status

See tasks on [Github Projects](https://github.com/meta-mo/contentful-config/projects/1)

## Tests

1. Create a model and data for Contentful with reference to /tests/.cntconfigrc.json.
2. Create .env file insted of your Contentful's space id and access token in /tests/.
3. Run following command in / `npm install && npm run test`

## License

[MIT](LICENSE)
