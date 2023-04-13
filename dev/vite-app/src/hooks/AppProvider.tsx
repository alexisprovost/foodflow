import React, { useState, useEffect, createContext, useContext, useMemo } from "react";

interface AppContextType {
	addProvider: (provider: any) => void;
	removeProvider: (name: string) => void;
	getProvider: (name: string) => any;
}

export const AppContext = createContext<AppContextType>({
	addProvider: () => {},
	removeProvider: () => {},
	getProvider: () => {},
});

interface AuthProps {
	children: React.ReactNode;
	providers?: ProviderState;
}

interface ProviderState {
	[key: string]: any;
}

const AppProvider: React.FC<AuthProps> = ({ children, providers: initProviders = {} }) => {
	const [providers, setProviders] = useState<ProviderState>({});

	const addProvider = (provider: any) => {
		setProviders((prev) => ({ ...prev, ...provider }));
	};

	const memoizedInitProviders = useMemo(() => initProviders, []);

	useEffect(() => {
		addProvider(memoizedInitProviders);
	}, [memoizedInitProviders]);

	const removeProvider = (name: string) => {
		setProviders((prev) => {
			const { [name]: _, ...rest } = prev;
			return rest;
		});
	};

	const getProvider = (name: string) => {
		return providers[name];
	};

	const contextValue = {
		addProvider,
		removeProvider,
		getProvider,
	};

	const wrappedChildren = Object.entries(providers).reduce((children, [key, value]) => {
		const ProviderComponent = value;
		return <ProviderComponent key={key}>{children}</ProviderComponent>;
	}, children);

	return <AppContext.Provider value={contextValue}>{wrappedChildren}</AppContext.Provider>;
};

export default AppProvider;
