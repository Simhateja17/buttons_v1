/**
 * Rich message parser for extracting interactive components from bot responses
 */

export interface ButtonOption {
	id?: string;
	label: string;
	value: string;
	url?: string;
}

export interface ButtonsComponentArgs {
	title?: string;
	multiple?: boolean;
	options: ButtonOption[];
}

export type ParsedComponent =
	| { kind: 'none'; text: string }
	| { kind: 'buttons'; text: string; args: ButtonsComponentArgs };

/**
 * Regular expressions for detecting button markup in various formats
 */
const BUTTON_PATTERNS = {
	// Matches: ```buttons\n{...}\n```
	jsonFence: /```buttons\s*\n([\s\S]*?)\n```/g,
	// Matches: <buttons>{...}</buttons>
	xmlTag: /<buttons>([\s\S]*?)<\/buttons>/g,
	// Matches: [BUTTONS]{...}[/BUTTONS]
	bbcode: /\[BUTTONS\]([\s\S]*?)\[\/BUTTONS\]/gi,
};

/**
 * Attempts to parse JSON string safely
 */
function safeJsonParse(jsonString: string): ButtonsComponentArgs | null {
	try {
		const trimmed = jsonString.trim();
		const parsed = JSON.parse(trimmed);

		// Validate the parsed object has required structure
		if (parsed && Array.isArray(parsed.options)) {
			return parsed as ButtonsComponentArgs;
		}

		return null;
	} catch (error) {
		console.warn('Failed to parse button JSON:', error);
		return null;
	}
}

/**
 * Extracts button component data from text using multiple pattern matching strategies
 */
function extractButtonData(text: string): { data: ButtonsComponentArgs | null; match: string } {
	// Try each pattern
	for (const [patternName, pattern] of Object.entries(BUTTON_PATTERNS)) {
		const regex = new RegExp(pattern);
		const match = regex.exec(text);

		if (match && match[1]) {
			const data = safeJsonParse(match[1]);
			if (data) {
				return { data, match: match[0] };
			}
		}
	}

	return { data: null, match: '' };
}

/**
 * Parses bot response text to detect and extract button markup
 *
 * Supported formats:
 * 1. JSON fence: ```buttons\n{"options":[...]}\n```
 * 2. XML-style: <buttons>{"options":[...]}</buttons>
 * 3. BBCode-style: [BUTTONS]{"options":[...]}[/BUTTONS]
 *
 * @param text - The raw bot response text
 * @returns Parsed result with component kind and extracted data
 *
 * @example
 * const text = "Choose department:\n```buttons\n{\"options\":[{\"label\":\"Sales\",\"value\":\"SALES\"}]}\n```";
 * const result = parseButtonsFromText(text);
 * // Returns: { kind: 'buttons', text: 'Choose department:', args: {...} }
 */
export function parseButtonsFromText(text: string): ParsedComponent {
	if (!text || typeof text !== 'string') {
		return { kind: 'none', text: text || '' };
	}

	const { data, match } = extractButtonData(text);

	if (data && match) {
		// Remove the button markup from the original text
		const cleanedText = text.replace(match, '').trim();

		return {
			kind: 'buttons',
			text: cleanedText,
			args: data,
		};
	}

	// No button markup found
	return { kind: 'none', text };
}

/**
 * Validates button options array
 */
export function validateButtonOptions(options: unknown[]): boolean {
	if (!Array.isArray(options) || options.length === 0) {
		return false;
	}

	return options.every(
		(opt) =>
			opt &&
			typeof opt === 'object' &&
			'label' in opt &&
			'value' in opt &&
			typeof opt.label === 'string' &&
			typeof opt.value === 'string' &&
			opt.label.length > 0 &&
			opt.value.length > 0,
	);
}
