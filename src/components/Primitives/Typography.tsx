import { palette } from "@/style/colorPalette";
import styled from "styled-components";

interface TypographyProps {
	$color?: string;
	$isCyrillic?: boolean;
}

const TypographyBase = styled.div<TypographyProps>`
	color: ${({ $color }) => ($color ? $color : palette.white[100])};
`;

const DisplayBase = styled(TypographyBase)`
	font-family: ${({ $isCyrillic }) => ($isCyrillic ? "Montserrat Alternates" : "Space Grotesk")};
	font-weight: 900;
	line-height: 1.1;
`;

export const Display = {
	XL: styled(DisplayBase)`
		font-size: 72px;
	`,
	L: styled(DisplayBase)`
		font-size: 60px;
	`,
	M: styled(DisplayBase)`
		font-size: 48px;
		font-weight: 800;
	`,
	S: styled(DisplayBase)`
		font-size: 40px;
		font-weight: 700;
	`,
};

const HeadingBase = styled(TypographyBase)`
	font-family: ${({ $isCyrillic }) => ($isCyrillic ? "Montserrat Alternates" : "Space Grotesk")};
	font-weight: 700;
	line-height: 1.3;
`;

export const Heading = {
	H1: styled(HeadingBase).attrs({ as: "h1" })`
		font-size: 32px;
	`,
	H2: styled(HeadingBase).attrs({ as: "h2" })`
		font-size: 28px;
	`,
	H3: styled(HeadingBase).attrs({ as: "h3" })`
		font-size: 24px;
		font-weight: 600;
	`,
	H4: styled(HeadingBase).attrs({ as: "h4" })`
		font-size: 20px;
		font-weight: 600;
	`,
	H5: styled(HeadingBase).attrs({ as: "h5" })`
		font-size: 18px;
		font-weight: 500;
	`,
	H6: styled(HeadingBase).attrs({ as: "h6" })`
		font-size: 16px;
		font-weight: 500;
	`,
};

const TitleBase = styled(TypographyBase)`
	font-family: ${({ $isCyrillic }) => ($isCyrillic ? "Inter" : import.meta.env.VITE_PRIMARY_FONT)};
	font-weight: 500;
	line-height: 1.4;
`;

export const Title = {
	L: styled(TitleBase)`
		font-size: 20px;
	`,
	M: styled(TitleBase)`
		font-size: 18px;
	`,
	S: styled(TitleBase)`
		font-size: 16px;
	`,
};

const BodyBase = styled(TypographyBase)`
	font-family: ${({ $isCyrillic }) => ($isCyrillic ? "Inter" : import.meta.env.VITE_PRIMARY_FONT)};
	font-weight: 400;
	line-height: 1.6;

	strong {
		font-weight: 700;
	}

	a {
		color: ${palette.primary[400]};
		transition: 100ms;

		&:hover {
			color: ${palette.primary[500]};
		}

		&:active {
			color: ${palette.primary[600]};
		}

		&:visited {
			color: ${palette.primary[700]};
		}
	}
`;

export const Body = {
	L: styled(BodyBase)`
		font-size: 18px;
	`,
	M: styled(BodyBase)`
		font-size: 16px;
	`,
	S: styled(BodyBase)`
		font-size: 14px;
	`,
	XS: styled(BodyBase)`
		font-size: 12px;
	`,
};

const CaptionBase = styled(TypographyBase)`
	font-family: ${({ $isCyrillic }) => ($isCyrillic ? "Inter" : import.meta.env.VITE_PRIMARY_FONT)};
	font-weight: 400;
	line-height: 1.5;
`;

export const Caption = {
	M: styled(CaptionBase)`
		font-size: 12px;
	`,
	S: styled(CaptionBase)`
		font-size: 11px;
	`,
};

const LabelBase = styled(TypographyBase).attrs({ as: "span" })`
	font-family: ${({ $isCyrillic }) => ($isCyrillic ? "Inter" : import.meta.env.VITE_PRIMARY_FONT)};
	font-weight: 500;
	line-height: 1.4;
`;

export const Label = {
	L: styled(LabelBase)`
		font-size: 16px;
	`,
	M: styled(LabelBase)`
		font-size: 14px;
	`,
	S: styled(LabelBase)`
		font-size: 12px;
	`,
};

const OverlineBase = styled(TypographyBase)`
	font-family: ${({ $isCyrillic }) => ($isCyrillic ? "Inter" : import.meta.env.VITE_PRIMARY_FONT)};
	text-transform: uppercase;
	font-weight: 700;
	line-height: 1.2;
`;

export const Overline = {
	M: styled(OverlineBase)`
		font-size: 12px;
	`,
	S: styled(OverlineBase)`
		font-size: 11px;
	`,
};

const CodeBase = styled(TypographyBase).attrs({ as: "pre" })`
	font-family: "JetBrains Mono";
	font-weight: 500;
	line-height: 1.6;
`;

export const Code = {
	M: styled(CodeBase)`
		font-size: 14px;
	`,
	S: styled(CodeBase)`
		font-size: 12px;
	`,
};
