# `@guardian/interactive-component-library`

A set of reusable components for use in interactive pages, written in Preact using [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) principles.

## Install

From [Github Packages](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry):

1. [Create a personal access token (classic)](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic) with `read:packages` scope.
2. Create a file called `.npmrc` in the root of your project and add the following:

```
@guardian:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_PERSONAL_ACCESS_TOKEN
```

3. Install using npm:

```
npm i @guardian/interactive-component-library
```

## Contributing to this repository

> Building the project requires Node v16.18.1 or higher.

1. Clone this repository
2. Run `corepack enable` to enable pnpm
3. Install dependencies with `pnpm i`
4. Run `pnpm dev` to start the local Storybook server

### Atomic design

The component library is structured according to [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) principles, using the bottom three levels.

1. Particles (renamed from `atoms` for obvious reasons)
2. Molecules
3. Organisms

Particles are the lowest level components that form the building blocks for everything else, e.g. a Button. Molecules represent more complex components (e.g. a Table) and often depend on particle components. Organisms combine the previous two levels into distinct sections of an interactive page, e.g. KeySeats.

Folders use the same naming structure, with `particles`, `molecules` and `organisms` folders in `src/lib/components`, to distinguish between the three different levels.

### Adding a new component

Create a folder for your new component in the appropriate directory. The name of the folder should be the name of your component in [Kebab case](https://developer.mozilla.org/en-US/docs/Glossary/Kebab_case), i.e. `src/lib/components/particles/my-new-component`.

The folder should contain the following:

- `index.jsx` containing the code for the actual component
- `[component-name].stories.jsx` containing examples of how to use the component, written as [Storybook stories](https://storybook.js.org/docs/writing-stories)
- `docs.mdx` (optional) additional documentation for the component in Storybook

### Developing and testing locally

During development, you'll often want to see how a component looks in the interactive page that you're working on, without rebuilding and publishing a new version of the component library. To facilitate this workflow, we use [npm-link](https://docs.npmjs.com/cli/v10/commands/npm-link).

Here's how to set that up:

```
cd ~/projects/interactive-component-library       # go into the package directory
npm link                                          # creates global link
cd ~/projects/node-bloggy                         # go into your project directory
npm link @guardian/interactive-component-library  # link-install the package
```

To revert back to the version specified in your project‘s `package.json`:

```
npm uninstall --no-save @guardian/interactive-component-library && npm install
```

### Publishing a new version

To publish a new version of the component library, [create a new release](https://github.com/guardian/interactive-component-library/releases/new) on GitHub. Don't forget to write some release notes.

Publishing the release [triggers a workflow](https://github.com/guardian/interactive-component-library/actions) to package the library and publish it to Github Packages. The workflow can also be triggered manually.

## Scripts

Always prepending `pnpm`:

- `dev`: Start Storybook for local development
- `build`: Builds the static storybook project
- `build:lib`: Builds the component library into the **dist** folder
- `build:lib:watch`: Same as previous command, but it watches `/src` folder and rebuilds on changes

## License

[Apache 2.0](LICENSE)
