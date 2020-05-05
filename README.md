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
  "default": {
    "dir": "./configs",
    "models": [
      {
        "name": "modelName",
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
        "name": "modelName",
        "options": {
          "order": "fields.type"
        }
      }
    ]
  }
}
```

| Parameter | Description | Example |
| ---- | ---- | ---- |
| default | When the command is executed, if nothing is specified, the default is applied. If specified at command execution, one of the configurations will be applied. | default / local / production |
| dir | Destination of the configs | ./configs |
| models | Output contentful models |  |
| models.name | Output contentful model name. This model name will be the file name. |  |
| models.options | See search-parameters in Contentful's getEntries https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/search-parameters/links-to-asset |  |

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
