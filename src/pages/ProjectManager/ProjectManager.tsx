import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import type { FC } from "react";

const ProjectManager: FC = () => {
	useDocumentTitle("Project Manager");

	return <div>ProjectManager</div>;
};

export default ProjectManager;
