import { createGlobalStyle } from "styled-components";
import { palette } from "./colorPalette";
import { Label } from "@/components/Primitives/Typography";

const GlobalStyle = createGlobalStyle`
	.wrapper {
		background-color: ${palette.black[900]};
		min-height: 100%;
		color: ${palette.white[100]};
		display: flex;
		padding: 8px;
	}

	.icon {
		path[fill],circle[fill],rect[fill],line[fill],polygon[fill] {
			fill: currentColor
		}
	}
	.icon [stroke] {
		stroke: currentColor;
	}

	a {
		&, ${Label.S}, ${Label.M}, ${Label.L} {
			transition: 199ms;
			color: ${palette.primary[500]};

			@media (hover: hover) and (pointer: fine) {
				&:hover {
					color: ${palette.primary[700]};
				}
			}

			&:active {
				color: ${palette.primary[900]};
			}
		}
	}

	@media (pointer: fine) {
		*::-webkit-scrollbar {
			width: 10px;
			background-color: ${palette.black[800]};

			&-thumb {
				background-color: ${palette.gray[100]};
				border-radius: 4px;
				border: 2px solid ${palette.black[800]};

				@media (hover: hover) {
					&:hover {
						background-color: ${palette.gray[200]};
					}
				}

				&:active {
					background-color: ${palette.gray[500]};
				}
			}
		}
	}
`;

export default GlobalStyle;
