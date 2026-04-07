import type { Plugin } from "vite";
import fs from "fs/promises";
import path from "path";

export function iconsGeneratorPlugin(): Plugin {
	const iconsPath = path.resolve(__dirname, "../src/assets/icons");
	const outputPath = path.resolve(__dirname, "../src/components/Primitives/Icon.tsx");
	let timeout: NodeJS.Timeout;

	const generateIconsFile = async () => {
		try {
			const files = await fs.readdir(iconsPath);
			const svgFiles = files.filter((file) => file.endsWith(".svg"));

			const imports: string[] = [];
			const iconNames: string[] = [];

			svgFiles.forEach((file) => {
				const name = path
					.basename(file, ".svg")
					.split("-")
					.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
					.join("");

				const importName = `${name}Icon`;
				imports.push(`import ${importName} from "@icons/${file}?react";`);
				iconNames.push(`\t${name}: ${importName},`);
			});

			const content = `
// Auto-generated file - DO NOT EDIT MANUALLY
// Generated at: ${new Date().toISOString()}

import type { SVGProps } from "react";

${imports.join("\n")}

interface IconProps extends SVGProps<SVGSVGElement> {
	size?: number | string;
	color?: string;
}

const icons = {
${iconNames.join("\n")}
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

		IconComponent.displayName = \`Icon.\${key}\`;

		return {
			...acc,
			[key]: IconComponent,
		};
	},
	{} as Record<keyof typeof icons, React.FC<IconProps>>,
);
`;

			await fs.writeFile(outputPath, content, "utf-8");
			console.log("✨ Icons generated successfully!");
		} catch (error) {
			console.error("Error generating icons:", error);
		}
	};

	return {
		name: "vite-icons-generator",
		configureServer(server) {
			generateIconsFile();

			server.watcher.add(iconsPath);
			server.watcher.on("all", (event, file) => {
				if (file.includes(iconsPath) && (file.endsWith(".svg") || event === "unlink")) {
					clearTimeout(timeout);
					timeout = setTimeout(generateIconsFile, 100);
				}
			});
		},
		async handleHotUpdate({ file, server }) {
			if (file.includes(iconsPath) && file.endsWith(".svg")) {
				await generateIconsFile();
				server.ws.send({ type: "full-reload" });
			}
		},
	};
}
