# contentful-config

Fetching JSON from Contentful to use the same configs across multiple projects and repositories.

## Installation

You can install this using npm:

```bash
$ npm install contentful-config -g
```

You can also use the NPX without installing it globally.

## Configuration

### .env

Add Contentful space id and access token to the .env file in the same directory as package.json:

```env
CONTENTFUL_SPACE_ID=up61khjnndzm
CONTENTFUL_ACCESS_TOKEN=FeBoFnhmElUGRC76v-2T6DxOHhhhhg9FyiwWVxVs148
```

You can also applying when command execution without creating .env.

### .cntconfigrc.json

Create a file as **.cntconfigrc.json** as in the following code:

```json
{
  "default": {
    "dir": "./configs",
    "models": [
      {
        "name": "env",
        "options": {
          "order": "fields.type",
          "fields.type": "dev"
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
        "firstOnly": true
      }
    ]
  }
}

```

| Parameter | Description | Default |
| ---- | ---- | ---- | --- |
| * | When the command is executed, if nothing is specified, the default is applied. If specified at command execution, one of the configurations will be applied. | default |
| *.dir | Destination of the configs. | '' |
| *.models | Contentful models objects. |  |
| *.models.name | Output Contentful model name. This model name will be the file name. |  |
| *.models.options | See search-parameters in Contentful's getEntries. https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters/links-to-asset | {} |
| *.models.specificField | Specify this if you want data only for fields in the model. | '' |
| *.models.firstOnly | Fetch only a single from an array. (it becomes an object type) | false |
| *.models.filterUseFields | Fetch only the specified parameters from the objects in the array after specificField parameter. | undefind |

## Usage

Execute the following command in the same directory as the configuration file.

Execute the default:

```bash
$ contentful-config
```

Fetch only the local configurations:

```bash
$ contentful-config local
```

Applying the Access Token at command execution:

```bash
$ contentful-config default --spaceId up61khjnndzm --accessToken FeBoFnhmElUGRC76v-2T6DxOHhhhhg9FyiwWVxVs148
```

## Development Status

See tasks on [Github Projects](https://github.com/meta-mo/contentful-config/projects/1)

## Tests

1. Create a model and data for Contentful with reference to /tests/.cntconfigrc.json.
2. Create .env file insted of your Contentful's space id and access token in /tests/.
3. Run following command in / `npm install && npm run test`

## License

[MIT](LICENSE)
