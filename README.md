# C4MJS React

C4MJS is a library for creating C4 diagrams in React.

It uses React Flow for rendering the diagrams, giving interactive canvases that can be used in any React application.

The interactive zooming and panning features of React Flow make it easy to create and view large diagrams.

## Example Uses

- Embedded diagrams in technical documentation
- Building a custom System Catalogue
- Creating a single source of truth for your architecture diagrams and decision records

## Features

- Reusable Component Definitions in Javascript/Typescript 🛠️
- Manage **_Workspaces_** using Javascript ecosystem tools like NPM 📦
- Embed C4 diagrams in your React applications 🚀
- Downloadable 📥 diagrams using [html-to-image](https://www.npmjs.com/package/html-to-image) & [downloadjs](https://www.npmjs.com/package/downloadjs)
- Supports Light 🌞 and Dark 🌚 themes out of the box

## Installation

To get started with C4MJS, you need to install the package from NPM along with xyflow/react:

```shell
npm install @xyflow/react @c4mjs/c4-react
```

Before diving in we need to import the stylesheets:

In your applications entrypoint add the following:

```shell
import "@xyflow/react/dist/style.css";
import "@c4mjs/c4-react/dist/main.css";
```

With that in place, you can start creating your C4 diagrams.

## Usage

### Define a system

Before rendering a view you need to define a system.

These systems can be referenced in your diagrams and re-used by many views.

### Render a View

To define a view, it can either be done inline or in a separate file.

A view is a collection of Relationships between Systems.

### Working Example

Here's an example of a complete diagram using the C4 React library, naturally you can define your systems in separate files and import them as needed in your views.

```jsx
import { C4Diagram, C4NodeType, type C4System } from "@c4mjs/c4-react";

export const personalBankingCustomer: C4System = {
	id: crypto.randomUUID(),
	name: "Personal banking customer",
	description: "A customer of the bank, with personal bank accounts.",
	type: C4NodeType.System,
};

export const internetBankingSystem: C4System = {
	id: crypto.randomUUID(),
	name: "Internet Banking System",
	description:
		"Allows customers to view information about their bank accounts, and make payments.",
	type: C4NodeType.System,
};

export const mainframe: C4System = {
	id: crypto.randomUUID(),
	name: "Mainframe",
	description:
		"Stores all of the core banking information about customers, accounts, transactions, etc.",
	type: C4NodeType.System,
	external: true,
};

export const emailSystem: C4System = {
	id: crypto.randomUUID(),
	name: "Email System",
	description: "The internal Microsoft Exchange e-mail system.",
	type: C4NodeType.System,
};

export function SystemContext() {
	return (
		<C4Diagram
			model={[
				[
					personalBankingCustomer,
					"Views account balances, and makes payments using",
					internetBankingSystem,
					"",
					{},
				],
				[
					internetBankingSystem,
					"Gets account information from, and makes payments using",
					mainframe,
					"",
					{},
				],
				[internetBankingSystem, "Sends e-mail using", emailSystem, "", {}],
				[emailSystem, "Sends e-mails to", personalBankingCustomer, "", {}],
			]}
			positions={[
				[personalBankingCustomer, 0, 0],
				[internetBankingSystem, 1, 0],
				[mainframe, 2, 0],
				[emailSystem, 1, 1],
			]}
		/>
	);
}
```
