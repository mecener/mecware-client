import { cloneElement, type FC } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, AnimatePresence as AP, motion as m } from "framer-motion";
import { AppRoutes, type AppRoute } from "./Routes";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import GuardLayout from "./layouts/GuardLayout";
import Sidebar from "./components/Organisms/Sidebar";
import AppLayout from "./layouts/AppLayout";

const AppRouter: FC = () => {
	const location = useLocation();

	const routes = Object.values(AppRoutes);
	const appRoutes = routes.filter((route) => route.group === "app");
	const authRoutes = routes.filter((route) => route.group === "auth");
	const otherRoutes = routes.filter((route) => route.group === undefined);

	const transitions = {
		initial: { opacity: 0, scale: 0.95 },
		animate: { opacity: 1, scale: 1 },
		exit: { opacity: 0, scale: 0.95 },
		transition: { duration: 0.199 },
	};

	return (
		<>
			<AP mode="wait" initial={false}>
				{!["/signin", "/signup"].includes(location.pathname) && (
					<m.div {...transitions}>
						<Sidebar />
					</m.div>
				)}
			</AP>
			<Routes location={location}>
				<Route element={<MainLayout />}>
					{otherRoutes.map((route, index) => (
						<Route index={route.isIndex} key={index} path={route.path} element={route.element} />
					))}
					<Route element={<AuthLayout />}>
						<Route path="/*" element={<AnimatedRoutes routes={authRoutes} />} />
					</Route>
					<Route element={<GuardLayout />}>
						<Route element={<AppLayout />}>
							{appRoutes.map((route) => (
								<Route
									key={route.path}
									path={route.path}
									element={
										<m.div className="m-div" key={route.path} {...transitions}>
											{route.element}
										</m.div>
									}
								/>
							))}
						</Route>
					</Route>
				</Route>
			</Routes>
		</>
	);
};

export default AppRouter;

export const AnimatedRoutes: FC<{ routes: AppRoute[] }> = ({ routes }) => {
	const location = useLocation();

	return (
		<AnimatePresence mode="wait">
			<Routes location={location} key={location.pathname}>
				{routes.map((route) => (
					<Route
						index={route.isIndex}
						key={route.path}
						path={route.path}
						element={cloneElement(route.element, { key: route.path })}
					/>
				))}
			</Routes>
		</AnimatePresence>
	);
};
