# React modest CLI

A CLI for react-modest-cli that generates basic files to generate basics React components (in your existing project) with styling in css, scss and Styled Components.

# Installation

Run

```
npm install -g react-modest-cli
```

if you get some permission error, please try to install with sudo.

# Generating files

Generate command:

```
react-modest-cli <create | c> <component_name> <language> --type=<boilerplate_type>  --path=<your_components_path> --test
```

Language (optional): is allowed the keys `ts | typescript | javascript | js`. Typescript you generate .ts and .tsx files and Javascript will generate .js and .jsx files. Default is typescript.


Type (required): choose what kind of template will be generated. The available types are: 

    1. single: do not create a style file
    2. css: style in css extension
    3. scss: style in scss extension
    4. styled: style with styled components


Path (optional): set the path where component will be created. Default is `scr/components`. 

Test (optional): generate test language extension. Default is false.
    

Sample file (using typescript as template): 
``` js
import React from 'react';

import './style.css' 
export default function Component() {
  return (
    <div className="container"> WAITING YOUR AMAZING COMPONENT</div>
  );
}
```

### Feel free to contact me and open an issue. Enjoy this modest CLI.

### Credits
This CLI was made with [gluegun toolkit](https://github.com/infinitered/gluegun) take a look in the docs and build your own.

# License

MIT - see LICENSE
