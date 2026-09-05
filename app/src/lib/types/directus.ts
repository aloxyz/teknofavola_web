export type Status = 'draft' | 'published' | 'archived';

export type ProfileType = 'dj' | 'photographer' | 'videomaker' | 'graphic' | 'tattoo_artist' | 'other';

export type SocialFormat = 'teknofavola' | 'once_upon_a_time' | 'fable_label' | 'fable_studio';

export type SubmissionType = 'booking' | 'once_upon_a_time' | 'label_demo' | 'studio_request' | 'merch_interest';

export interface DirectusFile {
	id: string;
	filename_download?: string;
	type?: string;
	width?: number | null;
	height?: number | null;
}

export interface LabelItem {
	label: string;
}

export interface GalleryItem {
	file: string | DirectusFile;
}

export interface AboutSection {
	heading_it: string | null;
	heading_en: string | null;
	body_it: string | null;
	body_en: string | null;
}

export interface AboutPageRecord {
	id: string;
	title_it: string | null;
	title_en: string | null;
	sections: AboutSection[] | null;
}

export interface SiteSettings {
	id: string;
	site_name: string;
	logo: string | DirectusFile | null;
	hero_bg_video: string | DirectusFile | null;
	favicon: string | DirectusFile | null;
	collective_tag_it: string | null;
	collective_tag_en: string | null;
	tagline_it: string | null;
	tagline_en: string | null;
	bio_heading_it: string | null;
	bio_heading_en: string | null;
	bio_paragraph_it: string | null;
	bio_paragraph_en: string | null;
	contact_email: string;
	footer_about_it: string | null;
	footer_about_en: string | null;
	footer_legal_it: string | null;
	footer_legal_en: string | null;
	seo_title_it: string | null;
	seo_title_en: string | null;
	seo_description_it: string | null;
	seo_description_en: string | null;
	accent_color: string | null;
}

export interface EventRecord {
	id: string;
	title: string;
	slug: string;
	event_date: string | null;
	flyer: string | DirectusFile | null;
	description_it: string | null;
	description_en: string | null;
	instagram_url: string | null;
	youtube_url: string | null;
	other_url: string | null;
	venue: string | null;
	gallery: GalleryItem[] | null;
	featured: boolean;
	sort_order: number | null;
	status: Status;
}

export interface ArtistRecord {
	id: string;
	name: string;
	slug: string;
	profile_type: ProfileType | null;
	photo: string | DirectusFile | null;
	bio_it: string | null;
	bio_en: string | null;
	instagram_url: string | null;
	soundcloud_url: string | null;
	spotify_url: string | null;
	youtube_url: string | null;
	other_url: string | null;
	video_url: string | null;
	work_photos: GalleryItem[] | null;
	sort_order: number | null;
	status: Status;
}

export interface DjSetRecord {
	id: string;
	artist: string | ArtistRecord;
	title: string;
	episode_number: number | null;
	genre: string | null;
	video_url: string | null;
	is_once_upon_a_time_episode: boolean;
	sort_order: number | null;
	status: Status;
}

export interface ReleaseRecord {
	id: string;
	track_name: string;
	artist: string | ArtistRecord;
	mix_engineer: string | null;
	master_engineer: string | null;
	cover: string | DirectusFile | null;
	description_it: string | null;
	description_en: string | null;
	spotify_url: string | null;
	soundcloud_url: string | null;
	youtube_url: string | null;
	release_date: string | null;
	sort_order: number | null;
	status: Status;
}

export interface MerchItemRecord {
	id: string;
	name: string;
	price: string | null;
	photo: string | DirectusFile | null;
	description_it: string | null;
	description_en: string | null;
	sort_order: number | null;
	status: Status;
}

export interface ServiceRecord {
	id: string;
	name_it: string;
	name_en: string;
	description_it: string | null;
	description_en: string | null;
	sort_order: number | null;
	status: Status;
}

export interface StudioInfoRecord {
	id: string;
	gear_items: LabelItem[] | null;
	optional_services_it: LabelItem[] | null;
	optional_services_en: LabelItem[] | null;
	pricing_note_it: string | null;
	pricing_note_en: string | null;
}

export interface SocialLinkRecord {
	id: string;
	format: SocialFormat;
	platform: string;
	url: string | null;
	sort_order: number | null;
	active: boolean;
}

export interface FormSubmissionRecord {
	id: string;
	type: SubmissionType;
	name: string;
	email: string;
	payload: Record<string, unknown>;
	ip_hash?: string;
}

export interface DirectusSchema {
	site_settings: SiteSettings;
	about_page: AboutPageRecord;
	events: EventRecord[];
	artists: ArtistRecord[];
	dj_sets: DjSetRecord[];
	releases: ReleaseRecord[];
	merch_items: MerchItemRecord[];
	services: ServiceRecord[];
	studio_info: StudioInfoRecord;
	social_links: SocialLinkRecord[];
	form_submissions: FormSubmissionRecord[];
}
