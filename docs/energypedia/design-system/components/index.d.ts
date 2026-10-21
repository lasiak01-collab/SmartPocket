import type * as React from 'react';

export interface LogoProps { tone?: 'default' | 'inverse'; size?: 'md' | 'sm'; href?: string }
export declare function Logo(props: LogoProps): React.ReactElement;

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { variant?: 'primary' | 'secondary' | 'outline' | 'ghost'; size?: 'sm' | 'md' | 'lg'; href?: string; iconOnly?: boolean }
export declare function Button(props: ButtonProps): React.ReactElement;

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { pressed?: boolean }
export declare function Chip(props: ChipProps): React.ReactElement;

export interface BadgeProps { tone?: 'status' | 'partner' | 'accent' | 'neutral'; children?: React.ReactNode; className?: string }
export declare function Badge(props: BadgeProps): React.ReactElement;

export interface SectionHeaderProps { title: React.ReactNode; eyebrow?: string; description?: string; level?: 2 | 3; id?: string; live?: boolean; action?: { label: string; href?: string } }
export declare function SectionHeader(props: SectionHeaderProps): React.ReactElement;

export interface AskBoxProps { id?: string; label?: string; placeholder?: string; buttonLabel?: string; defaultValue?: string; size?: 'lg' | 'md'; onSubmit?: (query: string) => void }
export declare function AskBox(props: AskBoxProps): React.ReactElement;

export interface AnswerSource { label: string; href?: string }
export interface AnswerCardProps { question: string; answer: string; sources?: AnswerSource[]; kicker?: string; disclaimer?: string }
export declare function AnswerCard(props: AnswerCardProps): React.ReactElement;

export interface SegmentOption { id: string; name: string; description?: string }
export interface SegmentPickerProps { options: SegmentOption[]; value?: string; defaultValue?: string; onChange?: (id: string) => void; label?: string; compact?: boolean }
export declare function SegmentPicker(props: SegmentPickerProps): React.ReactElement;

export interface StatTileProps { label: string; value: string; note?: string; live?: boolean; href?: string }
export declare function StatTile(props: StatTileProps): React.ReactElement;

export interface ContentCardProps { title: string; kind?: string; lead?: string; href?: string; partner?: boolean; partnerName?: string }
export declare function ContentCard(props: ContentCardProps): React.ReactElement;

export interface TrackerCardProps { status: string; title: string; description?: string; updated?: string; href?: string }
export declare function TrackerCard(props: TrackerCardProps): React.ReactElement;

export interface FaqItem { question: string; answer?: string; href?: string }
export interface FaqListProps { items: FaqItem[] }
export declare function FaqList(props: FaqListProps): React.ReactElement;

export interface NewsletterFormProps { id?: string; title?: string; description?: string; buttonLabel?: string; privacyHref?: string; onSubmit?: (email: string) => void }
export declare function NewsletterForm(props: NewsletterFormProps): React.ReactElement;

export interface AdSlotProps { slotId: string; size?: '970x250' | '750x200' | '728x90' | '300x600' | '300x250' | '320x100' | '320x50'; showMeta?: boolean }
export declare function AdSlot(props: AdSlotProps): React.ReactElement;

export interface SponsorBandProps { title: string; subtitle?: string; partnerLabel?: string; logo?: React.ReactNode; disclosureHref?: string }
export declare function SponsorBand(props: SponsorBandProps): React.ReactElement;

declare global {
  interface Window {
    Energypedia: {
      Logo: typeof Logo; Button: typeof Button; Chip: typeof Chip; Badge: typeof Badge; SectionHeader: typeof SectionHeader;
      AskBox: typeof AskBox; AnswerCard: typeof AnswerCard; SegmentPicker: typeof SegmentPicker; StatTile: typeof StatTile;
      ContentCard: typeof ContentCard; TrackerCard: typeof TrackerCard; FaqList: typeof FaqList; NewsletterForm: typeof NewsletterForm;
      AdSlot: typeof AdSlot; SponsorBand: typeof SponsorBand;
    };
  }
}
