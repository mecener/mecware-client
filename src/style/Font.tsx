import { createGlobalStyle } from "styled-components";

import regular from "../fonts/ggsans-Normal.woff";
import regular2 from "../fonts/ggsans-Normal.woff2";
import regularItalic from "../fonts/ggsans-NormalItalic.woff";
import regularItalic2 from "../fonts/ggsans-NormalItalic.woff2";

import medium from "../fonts/ggsans-Medium.woff";
import medium2 from "../fonts/ggsans-Medium.woff2";
import mediumItalic from "../fonts/ggsans-MediumItalic.woff";
import mediumItalic2 from "../fonts/ggsans-MediumItalic.woff2";

import semibold from "../fonts/ggsans-Semibold.woff";
import semibold2 from "../fonts/ggsans-Semibold.woff2";
import semiboldItalic from "../fonts/ggsans-SemiboldItalic.woff";
import semiboldItalic2 from "../fonts/ggsans-SemiboldItalic.woff2";

import bold from "../fonts/ggsans-Bold.woff";
import bold2 from "../fonts/ggsans-Bold.woff2";
import boldItalic from "../fonts/ggsans-BoldItalic.woff";
import boldItalic2 from "../fonts/ggsans-BoldItalic.woff2";

import extrabold from "../fonts/ggsans-ExtraBold.woff";
import extrabold2 from "../fonts/ggsans-ExtraBold.woff2";
import extraboldItalic from "../fonts/ggsans-ExtraBoldItalic.woff";
import extraboldItalic2 from "../fonts/ggsans-ExtraBoldItalic.woff2";

const FontStyle = createGlobalStyle`
	@font-face {
		font-family: "gg sans";
		src:
			url(${regular2}) format("woff2"),
			url(${regular}) format("woff");
		font-weight: 400;
		font-style: normal;
		font-display: swap;
	}
	@font-face {
		font-family: "gg sans";
		src:
			url(${regularItalic2}) format("woff2"),
			url(${regularItalic}) format("woff");
		font-weight: 400;
		font-style: italic;
		font-display: swap;
	}

	@font-face {
		font-family: "gg sans";
		src:
			url(${medium2}) format("woff2"),
			url(${medium}) format("woff");
		font-weight: 500;
		font-style: normal;
		font-display: swap;
	}
	@font-face {
		font-family: "gg sans";
		src:
			url(${mediumItalic2}) format("woff2"),
			url(${mediumItalic}) format("woff");
		font-weight: 500;
		font-style: italic;
		font-display: swap;
	}
	
	@font-face {
		font-family: "gg sans";
		src:
			url(${semibold2}) format("woff2"),
			url(${semibold}) format("woff");
		font-weight: 600;
		font-style: normal;
		font-display: swap;
	}
	@font-face {
		font-family: "gg sans";
		src:
			url(${semiboldItalic2}) format("woff2"),
			url(${semiboldItalic}) format("woff");
		font-weight: 600;
		font-style: italic;
		font-display: swap;
	}
	
	@font-face {
		font-family: "gg sans";
		src:
			url(${bold2}) format("woff2"),
			url(${bold}) format("woff");
		font-weight: 700;
		font-style: normal;
		font-display: swap;
	}
	@font-face {
		font-family: "gg sans";
		src:
			url(${boldItalic2}) format("woff2"),
			url(${boldItalic}) format("woff");
		font-weight: 700;
		font-style: italic;
		font-display: swap;
	}
	
	@font-face {
		font-family: "gg sans";
		src:
			url(${extrabold2}) format("woff2"),
			url(${extrabold}) format("woff");
		font-weight: 800;
		font-style: normal;
		font-display: swap;
	}
	@font-face {
		font-family: "gg sans";
		src:
			url(${extraboldItalic2}) format("woff2"),
			url(${extraboldItalic}) format("woff");
		font-weight: 800;
		font-style: italic;
		font-display: swap;
	}
`;

export default FontStyle;
