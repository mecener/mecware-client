
// Auto-generated file - DO NOT EDIT MANUALLY
// Generated at: 2026-05-08T10:49:53.931Z

import type { SVGProps } from "react";

import ActivityIcon from "@icons/activity.svg?react";
import AppIcon from "@icons/app.svg?react";
import ArrowBackIcon from "@icons/arrow-back.svg?react";
import AtIcon from "@icons/at.svg?react";
import CheckIcon from "@icons/check.svg?react";
import CornerIcon from "@icons/corner.svg?react";
import CreateAccountIcon from "@icons/create-account.svg?react";
import DiscordIcon from "@icons/discord.svg?react";
import ErrorIcon from "@icons/error.svg?react";
import KeyboardTrackerIcon from "@icons/keyboard-tracker.svg?react";
import LockIcon from "@icons/lock.svg?react";
import LoginIcon from "@icons/login.svg?react";
import LogoutIcon from "@icons/logout.svg?react";
import RepeatPasswordIcon from "@icons/repeat-password.svg?react";
import RepeatIcon from "@icons/repeat.svg?react";
import ScenarioIcon from "@icons/scenario.svg?react";
import TextIcon from "@icons/text.svg?react";
import TooltipArrowIcon from "@icons/tooltip-arrow.svg?react";
import UserIcon from "@icons/user.svg?react";
import ViewDatabaseIcon from "@icons/view-database.svg?react";
import VisibilityOffIcon from "@icons/visibility-off.svg?react";
import VisibilityIcon from "@icons/visibility.svg?react";

interface IconProps extends SVGProps<SVGSVGElement> {
	size?: number | string;
	color?: string;
}

const icons = {
	Activity: ActivityIcon,
	App: AppIcon,
	ArrowBack: ArrowBackIcon,
	At: AtIcon,
	Check: CheckIcon,
	Corner: CornerIcon,
	CreateAccount: CreateAccountIcon,
	Discord: DiscordIcon,
	Error: ErrorIcon,
	KeyboardTracker: KeyboardTrackerIcon,
	Lock: LockIcon,
	Login: LoginIcon,
	Logout: LogoutIcon,
	RepeatPassword: RepeatPasswordIcon,
	Repeat: RepeatIcon,
	Scenario: ScenarioIcon,
	Text: TextIcon,
	TooltipArrow: TooltipArrowIcon,
	User: UserIcon,
	ViewDatabase: ViewDatabaseIcon,
	VisibilityOff: VisibilityOffIcon,
	Visibility: VisibilityIcon,
};

export const Icon = Object.keys(icons).reduce(
	(acc, key) => {
		const SvgComponent = icons[key as keyof typeof icons];

		const IconComponent = ({ size = 24, color = "currentColor", style, ...props }: IconProps) => (
			<SvgComponent 
				width={size} 
				height={size} 
				className="icon" 
				fill={color} 
				style={{ color, ...style }} 
				{...props} 
			/>
		);

		IconComponent.displayName = `Icon.${key}`;

		return {
			...acc,
			[key]: IconComponent,
		};
	},
	{} as Record<keyof typeof icons, React.FC<IconProps>>,
);
