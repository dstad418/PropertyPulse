import React, {
	createContext,
	useState,
	useContext,
	ReactNode,
} from 'react';

const SelectedIssueContext = createContext({
	selectedIssues: [] as string[],
	setSelectedIssues: (issues: string[]) => {},
});

export const useSelectedIssues = () =>
	useContext(SelectedIssueContext);

export const SelectedIssueProvider: React.FC<{
	children: ReactNode;
}> = ({ children }) => {
	const [selectedIssues, setSelectedIssues] = useState<string[]>(
		[]
	);

	return (
		<SelectedIssueContext.Provider
			value={{ selectedIssues, setSelectedIssues }}
		>
			{children}
		</SelectedIssueContext.Provider>
	);
};
