export type Locale = 'it' | 'en';

export const LOCALES: Locale[] = ['it', 'en'];
export const DEFAULT_LOCALE: Locale = 'it';

// UI copy only — structure/labels/fallbacks, never editorial content. All
// editorial content (bio, events, artists, socials…) comes from Directus.
export const COPY = {
	it: {
		menu: 'MENU',
		langSwitch: 'Cambia lingua',
		scroll: 'SCORRI',
		bioKicker: 'CHI SIAMO',
		bioParagraphPlaceholder:
			'Spazio per il paragrafo della bio: chi è TeknoFavola, come nasce il collettivo, cosa succede in una nostra serata. Testo da fornire.',
		contactKicker: 'CONTACT US VIA',
		socialTitle: 'SOCIAL',
		socialsEmptyTitle: 'CANALI IN ARRIVO',
		pastEvents: 'EVENTI PASSATI',
		upcomingEvents: 'PROSSIMI EVENTI',
		upcomingEmptyTitle: 'NESSUN EVENTO IN PROGRAMMA',
		upcomingEmptyBody: 'Le prossime date compaiono qui appena annunciate. Nel frattempo puoi scorrere gli eventi passati.',
		pastEmptyTitle: 'ARCHIVIO IN COSTRUZIONE',
		pastEmptyBody: 'Gli eventi passati saranno pubblicati a breve.',
		favoleIntro: 'Le favole che abbiamo raccontato e quelle che stanno arrivando: flyer, date e racconto di ogni serata.',
		flyerSlot: 'FLYER IN ARRIVO',
		openEvent: 'APRI',
		noDate: 'DATA IN ARRIVO',
		event: 'EVENTO',
		description: 'DESCRIZIONE',
		descEmpty: 'Il racconto di questa serata sarà pubblicato a breve.',
		gallery: 'GALLERY',
		eventNotFound: 'Evento non trovato.',
		backToFavole: '← LE NOSTRE FAVOLE',
		bookingKicker: '02 / BOOKING ARTIST',
		bookingIntro: 'Scrivici per portare un artista TeknoFavola nel tuo evento. Scegli un nome dall’indice per vedere la sua scheda.',
		artistIndex: 'INDICE ARTISTI',
		profileType: 'TIPO PROFILO',
		creative: 'CREATIVO',
		bio: 'BIOGRAFIA',
		bioEmpty: 'Biografia in arrivo.',
		social: 'SOCIAL',
		djSetsEmpty: 'Nessun set pubblicato per ora.',
		photoSlot: 'FOTO IN ARRIVO',
		videoSlot: 'VIDEO IN ARRIVO',
		workSlot: 'LAVORO',
		bookingFormTitle: 'RICHIESTA BOOKING',
		requiredNote: 'I campi contrassegnati con * sono obbligatori.',
		send: 'INVIA',
		sending: 'INVIO IN CORSO…',
		sent: 'RICHIESTA INVIATA. TI RISPONDIAMO VIA EMAIL.',
		sendError: 'INVIO NON RIUSCITO. RIPROVA O SCRIVICI VIA EMAIL.',
		status: 'STATO',
		channels: 'CANALI',
		futureStructure: 'COSA TROVERAI QUI',
		footerAbout: 'COLLETTIVO TEKNO · MESSINA / SICILIA',
		footerContact: 'CONTATTI',
		footerLegal: 'LEGALE',
		footerCredit: 'P.IVA / DATI FISCALI — DA INSERIRE',
		rights: 'TUTTI I DIRITTI RISERVATI',
		artistsEmptyTitle: 'INDICE IN ARRIVO',
		artistsEmptyBody: 'Le schede degli artisti saranno online a breve. Per il booking scrivici via email.',
		artistNotFound: 'Artista non trovato.',
		backToBooking: '← BOOKING ARTIST',
		notAvailable: 'NON DISPONIBILE',
		open: 'APRI',
		close: 'CHIUDI',
		loading: 'CARICAMENTO CONTENUTI',
		errorKicker: 'ERRORE',
		errorTitle: 'CONTENUTI NON RAGGIUNGIBILI',
		errorBody: 'Non riusciamo a caricare questa sezione. Riprova fra qualche istante: se il problema continua, scrivici via email.',
		retry: 'RIPROVA',
		episode: 'EPISODIO',
		onceEpisodesKicker: 'EPISODI',
		latestFirst: 'Dal più recente.',
		date: 'DATA',
		venue: 'LUOGO',
		labelActiveIntro: 'Le uscite del collettivo e degli artisti ospiti.',
		studioActiveIntro: 'Produzione, registrazione, mix, master, ghost production e sala prove.',
		gear: 'ATTREZZATURA',
		optionalServices: 'SERVIZI OPZIONALI',
		pricing: 'PREZZI'
	},
	en: {
		menu: 'MENU',
		langSwitch: 'Switch language',
		scroll: 'SCROLL',
		bioKicker: 'ABOUT US',
		bioParagraphPlaceholder:
			'Space for the bio paragraph: who TeknoFavola is, how the collective started, what happens at one of our nights. Text to be provided.',
		contactKicker: 'CONTACT US VIA',
		socialTitle: 'SOCIAL',
		socialsEmptyTitle: 'CHANNELS COMING',
		pastEvents: 'PAST EVENTS',
		upcomingEvents: 'UPCOMING EVENTS',
		upcomingEmptyTitle: 'NO EVENT SCHEDULED',
		upcomingEmptyBody: 'The next dates appear here as soon as they are announced. Meanwhile, browse the past events.',
		pastEmptyTitle: 'ARCHIVE IN PROGRESS',
		pastEmptyBody: 'Past events will be published shortly.',
		favoleIntro: 'The fables we have told and the ones on the way: flyers, dates and the story of every night.',
		flyerSlot: 'FLYER COMING',
		openEvent: 'OPEN',
		noDate: 'DATE COMING',
		event: 'EVENT',
		description: 'DESCRIPTION',
		descEmpty: 'The story of this night will be published shortly.',
		gallery: 'GALLERY',
		eventNotFound: 'Event not found.',
		backToFavole: '← LE NOSTRE FAVOLE',
		bookingKicker: '02 / BOOKING ARTIST',
		bookingIntro: 'Write to us to bring a TeknoFavola artist to your event. Pick a name from the index to see their profile.',
		artistIndex: 'ARTIST INDEX',
		profileType: 'PROFILE TYPE',
		creative: 'CREATIVE',
		bio: 'BIOGRAPHY',
		bioEmpty: 'Biography coming.',
		social: 'SOCIAL',
		djSetsEmpty: 'No set published yet.',
		photoSlot: 'PHOTO COMING',
		videoSlot: 'VIDEO COMING',
		workSlot: 'WORK',
		bookingFormTitle: 'BOOKING REQUEST',
		requiredNote: 'Fields marked with * are required.',
		send: 'SEND',
		sending: 'SENDING…',
		sent: 'REQUEST SENT. WE WILL REPLY BY EMAIL.',
		sendError: 'COULD NOT SEND. TRY AGAIN OR WRITE TO US BY EMAIL.',
		status: 'STATUS',
		channels: 'CHANNELS',
		futureStructure: 'WHAT YOU WILL FIND HERE',
		footerAbout: 'TEKNO COLLECTIVE · MESSINA / SICILY',
		footerContact: 'CONTACT',
		footerLegal: 'LEGAL',
		footerCredit: 'VAT / LEGAL DETAILS — TO BE ADDED',
		rights: 'ALL RIGHTS RESERVED',
		artistsEmptyTitle: 'INDEX COMING',
		artistsEmptyBody: 'Artist profiles will be online shortly. For booking, write to us by email.',
		artistNotFound: 'Artist not found.',
		backToBooking: '← BOOKING ARTIST',
		notAvailable: 'NOT AVAILABLE',
		open: 'OPEN',
		close: 'CLOSE',
		loading: 'LOADING CONTENT',
		errorKicker: 'ERROR',
		errorTitle: 'CONTENT UNREACHABLE',
		errorBody: 'We cannot load this section. Try again in a moment: if the problem persists, write to us by email.',
		retry: 'RETRY',
		episode: 'EPISODE',
		onceEpisodesKicker: 'EPISODES',
		latestFirst: 'Latest first.',
		date: 'DATE',
		venue: 'VENUE',
		labelActiveIntro: 'Releases from the collective and guest artists.',
		studioActiveIntro: 'Production, recording, mix, master, ghost production and the rehearsal room.',
		gear: 'GEAR',
		optionalServices: 'OPTIONAL SERVICES',
		pricing: 'PRICING'
	}
} as const;

export type UiKey = keyof (typeof COPY)['it'];

export function t(locale: Locale, key: UiKey): string {
	return COPY[locale][key];
}

interface SoonBlock {
	tag: string;
	title: string;
	body: string;
	foot: string;
}

interface SoonCopy {
	kicker: string;
	titleA: string;
	titleB: string;
	intro: string;
	structureHint: string;
	blocks: SoonBlock[];
	formTitle: string;
	fields: string[];
}

// Structural "coming soon" copy for formats not live yet. This is UI/structure
// text (allowed to live in code per the brief), not editorial content — the
// moment real dj_sets/releases/services exist, the pages render those instead.
export const SOON: Record<'once' | 'label' | 'studio', Record<Locale, SoonCopy>> = {
	once: {
		it: {
			kicker: '03 / FORMAT VIDEO',
			titleA: 'ONCE UPON',
			titleB: 'A TIME',
			intro: 'Il format non è ancora iniziato. Sarà una serie di set filmati, un episodio per artista.',
			structureHint: 'Ogni episodio avrà titolo, numero, artista, genere e video integrale. Il più recente in alto.',
			blocks: [
				{ tag: 'EPISODIO #01', title: 'IN PREPARAZIONE', body: 'Set filmato integrale, con la scheda dell’artista ospite.', foot: 'IN ARRIVO' },
				{ tag: 'EPISODIO #02', title: 'IN PREPARAZIONE', body: 'Un nuovo artista, un nuovo genere.', foot: 'IN ARRIVO' },
				{ tag: 'CANDIDATURE', title: 'REGISTRA IL TUO SET', body: 'Il format è aperto: manda la tua candidatura con il modulo qui sotto.', foot: 'APERTE' },
				{ tag: 'ARCHIVIO', title: 'TUTTI GLI EPISODI', body: 'Gli episodi pubblicati resteranno consultabili per numero e artista.', foot: 'IN ARRIVO' }
			],
			formTitle: 'CANDIDATURA — REGISTRA IL TUO SET',
			fields: ['NOME', 'EMAIL', 'ARTISTA', 'GENERE', 'LINK SOCIAL', 'LINK SET / DEMO', 'MESSAGGIO']
		},
		en: {
			kicker: '03 / VIDEO FORMAT',
			titleA: 'ONCE UPON',
			titleB: 'A TIME',
			intro: 'The format has not started yet. It will be a series of filmed sets, one episode per artist.',
			structureHint: 'Every episode will carry a title, a number, the artist, the genre and the full video. Latest on top.',
			blocks: [
				{ tag: 'EPISODE #01', title: 'IN PREPARATION', body: 'Full filmed set, with the guest artist’s profile.', foot: 'COMING' },
				{ tag: 'EPISODE #02', title: 'IN PREPARATION', body: 'A new artist, a new genre.', foot: 'COMING' },
				{ tag: 'APPLICATIONS', title: 'RECORD YOUR SET', body: 'The format is open: send your application with the form below.', foot: 'OPEN' },
				{ tag: 'ARCHIVE', title: 'EVERY EPISODE', body: 'Published episodes stay browsable by number and artist.', foot: 'COMING' }
			],
			formTitle: 'APPLICATION — RECORD YOUR SET',
			fields: ['NAME', 'EMAIL', 'ARTIST', 'GENRE', 'SOCIAL LINK', 'SET / DEMO LINK', 'MESSAGE']
		}
	},
	label: {
		it: {
			kicker: '04 / LABEL',
			titleA: 'THE FABLE',
			titleB: 'LABEL',
			intro: 'La label non è ancora attiva. Qui usciranno le release del collettivo e degli artisti ospiti.',
			structureHint: 'Ogni release avrà traccia, artista, mix e master engineer, cover, descrizione e link di ascolto.',
			blocks: [
				{ tag: 'RELEASE 001', title: 'IN PREPARAZIONE', body: 'Prima uscita in lavorazione.', foot: 'IN ARRIVO' },
				{ tag: 'CATALOGO', title: 'TUTTE LE USCITE', body: 'Le release pubblicate resteranno consultabili per data e artista.', foot: 'IN ARRIVO' },
				{ tag: 'DEMO', title: 'MANDA LA TUA MUSICA', body: 'Le demo sono aperte: usa il modulo qui sotto.', foot: 'APERTE' },
				{ tag: 'ASCOLTO', title: 'SPOTIFY · SOUNDCLOUD · YOUTUBE', body: 'I canali di ascolto saranno collegati alla prima uscita.', foot: 'IN ARRIVO' }
			],
			formTitle: 'INVIO DEMO',
			fields: ['NOME ARTISTA', 'EMAIL', 'LINK DEMO', 'GENERE', 'SOCIAL', 'MESSAGGIO']
		},
		en: {
			kicker: '04 / LABEL',
			titleA: 'THE FABLE',
			titleB: 'LABEL',
			intro: 'The label is not active yet. Releases from the collective and guest artists will come out here.',
			structureHint: 'Every release will carry the track, the artist, mix and master engineer, cover, description and listening links.',
			blocks: [
				{ tag: 'RELEASE 001', title: 'IN PREPARATION', body: 'First release in the works.', foot: 'COMING' },
				{ tag: 'CATALOGUE', title: 'EVERY RELEASE', body: 'Published releases stay browsable by date and artist.', foot: 'COMING' },
				{ tag: 'DEMOS', title: 'SEND YOUR MUSIC', body: 'Demos are open: use the form below.', foot: 'OPEN' },
				{ tag: 'LISTEN', title: 'SPOTIFY · SOUNDCLOUD · YOUTUBE', body: 'Listening channels will be linked with the first release.', foot: 'COMING' }
			],
			formTitle: 'DEMO SUBMISSION',
			fields: ['ARTIST NAME', 'EMAIL', 'DEMO LINK', 'GENRE', 'SOCIAL', 'MESSAGE']
		}
	},
	studio: {
		it: {
			kicker: '05 / STUDIO',
			titleA: 'THE FABLE',
			titleB: 'STUDIO',
			intro: 'Studio e sala prove non sono ancora operativi online. Per informazioni puoi già scriverci.',
			structureHint: 'Produzione, registrazione, mix, master e ghost production, più la sala prove con la sua attrezzatura.',
			blocks: [],
			formTitle: 'RICHIESTA INFORMAZIONI / PRENOTAZIONE',
			fields: ['NOME', 'EMAIL', 'TELEFONO', 'SERVIZIO RICHIESTO', 'DATA DESIDERATA', 'MESSAGGIO']
		},
		en: {
			kicker: '05 / STUDIO',
			titleA: 'THE FABLE',
			titleB: 'STUDIO',
			intro: 'Studio and rehearsal room are not online yet. You can already write to us for information.',
			structureHint: 'Production, recording, mix, master and ghost production, plus the rehearsal room and its gear.',
			blocks: [],
			formTitle: 'INFORMATION / BOOKING REQUEST',
			fields: ['NAME', 'EMAIL', 'PHONE', 'REQUESTED SERVICE', 'PREFERRED DATE', 'MESSAGE']
		}
	}
};
