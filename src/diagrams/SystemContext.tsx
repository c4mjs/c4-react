import { C4Diagram, C4NodeType, type C4System } from "../../dist/main";

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
