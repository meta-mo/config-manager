# contentful-config

## Installation

You can install this using npm:

```
$ npm install contentful-config -g
```

## Configuration

Create a file as **.cntconfigrc.json** as in the following code:

```
{
  "spaceId": "up61stvjnndzm",
  "dir": "./configs",
  "default": [
    {
      "model": "env",
      "options": {
        "order": "fields.type"
      },
      "firstOnly": true,
      "specificField": "json"
    },
    {
      "model": "types",
      "options": {
        "order": "fields.type"
      }
    }
  ]
}
```

| Parameter | Description | Example |
| ---- | ---- | ---- |
| spaceId | Contentful's space ID | up61stvjnndzm |
| dir | Destination of the configs | ./configs |
| default | When the command is executed, if nothing is specified, the default is applied. If specified at command execution, one of the configurations will be applied. | default / local / production |
| default.model | Output contentful model name. This model name will be the file name. |  |
| default.options | See search-parameters in Contentful's getEntries https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters/links-to-asset |  |
| default.firstOnly | Fetch only a single from an array. (it becomes an object type) | false |
| default.specificField | Specify this if you want data only for fields in the model. | json |

## Usage

Execute the following command in the same directory as the configuration file.

Execute the default:

```
$ contentful-config
```

Fetch only the local configurations:

```
$ contentful-config local
```

## License

[MIT](LICENSE)
