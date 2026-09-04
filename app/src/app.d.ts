import type { Locale } from '$lib/i18n/dictionary';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			lang: Locale;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
