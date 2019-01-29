# babel-plugin-codemod-react-css-modules

Converts React components using imported CSS stylesheets to equivalent CSS Modules syntax.

## Example

Given this (simpilified) CSS file and React component:

```css
/* button.css */
.button {
	flex: 1;
	background-color: #eee;
	color: #222;
}
```

```ts
/* button.tsx */
import "./button.css";

export default ({ children }) => <div className="button">{children}</div>;
```

It will product the following, _modified_ component:

```ts
/* button.tsx */
import * as styles "./button.css";

export default ({ children }) => <div className={styles["button"]}">{children}</div>;
```

## Installation

`codemod` needs to be installed to use this tool

```js
yarn global add codemod
npm install -g codemod
```

## Usage

Running the following command will codemod all files in `dir/` (**Make sure they're checked into source control!**):

```bash
codemod -p babel-plugin-codemod-react-css-modules dir/
```

You can also pass options to the plugin like so

```bash
codemod \
	-p babel-plugin-codemod-react-css-modules \
	-o react-css-modules='{ "importIdentifier": "css" }' \
	path/to/file
```

For a list of valid options see [`src/index.ts:PluginOptions`](/blob/master/src/index.ts#L9)

## FAQ

### It broke all my UI!

You'll need to modify your `webpack` or other bundling environment to load the CSS files using the `CSS Modules` specification for this to work once the codemod is done.

`css-loader` supports `CSS Modules` out the box, or if you prefer you can use `postcss-loader` and the `postcss-modules` plugin instead.

### Can I pass in custom PostCSS plugins?

Yes, the plugin will look for your `postcss.config.js` file (or similar) thanks to it using the `postcss-load-config` module.

### Does it support SCSS/LESS/Preprocessors?

Yes, see above.

### Can I customize the name identifier used for the CSS import?

Yes, see `PluginOptions` in [`src/index.ts`](/blob/master/src/index.ts#L9)
