import { ImportDeclaration } from "@babel/types";

export const isCssImportDeclaration = (node: ImportDeclaration) => {
	// Ignore imports of non-CSS files
	if (!node.source.value.endsWith(".scss")) {
		return false;
	}

	// Ignore imports that already have a name
	if (node.specifiers.length > 0) {
		return false;
	}

	return true;
};
