# grunt-manifold

> Generate chosted apps across platforms and devices

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-manifoldjs --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-manifoldjs');
```

## The "manifold" task

### Overview
In your project's Gruntfile, add a section named `manifold` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  manifold: {
    options: {
      // Task-specific options go here.
    }
  },
});
```

### Options

#### options.output

- Type: `String`
- Default value: `'generatedApps'`

The path to the output path.

#### options.platforms

- Type: `Array`
- Default value: `'['chrome', 'firefox', 'android', 'ios', 'windows10', 'web']'`

An array of platforms that will be created by ManifoldJs based on the manifest.json. Posibilities: 'chrome', 'firefox', 'android', 'ios', 'windows10', 'windows81', 'web'.

#### options.buildProjects

- Type: `Boolean`
- Default value: `'buildProjects'`

If true, then the iOS, Android and Windows81 projects will be builded.

#### options.site

- Type: `String`
- Example: `'http://www.manifoldjs.com'`

The target site url.

#### options.manifestFilePath

- Type: `String`
- Example: `'www/manifest.json'`

The path to the local manifest.

### Usage Examples

#### Default Options

In this example, the default options are used.

```js
grunt.initConfig({
  manifoldjs: {
    options: {
      manifestFilePath: 'manifest.json'
    }
  },
});
```

#### Custom Options

In this example, custom options are used.

```js
grunt.initConfig({
  manifoldjs: {
    options: {
      output: 'outputPath',
      platforms: ['chrome', 'firefox', 'windows10', 'web'],
      buildProjects: true,
      site : 'http://www.manifoldjs.com',
      manifestFilePath: 'www/manifest.json'
    }
  },
});
```

## Release History

_(Nothing yet)_
