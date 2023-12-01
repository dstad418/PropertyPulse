import { FC, useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import { supabase } from '../../db/supabase';
import { useSelectedIssues } from '../utility-components/SelectedIssueContext';

type HeatMapComponentProps = {
	svgPath: string;
};

interface IssueData {
	property: string | null;
	count: number | null;
}

interface BuildingData {
	property: string | null;
}

// Interface for building data
interface BuildingIssueData {
	property: string | null;
	count: number;
}

const HeatMapComponent: FC<HeatMapComponentProps> = ({ svgPath }) => {
	// Readiness state
	const [isReady, setIsReady] = useState(false);
	// Get the selected issue(s) from the context
	const { selectedIssues } = useSelectedIssues();
	const [svgContent, setSvgContent] = useState('');
	const campusMapRef = useRef<SVGSVGElement>(null);

	useEffect(() => {
		setIsReady(false);
		fetch(svgPath)
			.then((response) => response.text())
			.then((svg) => {
				setSvgContent(svg);
				setIsReady(true);
			})
			// catch any errors with loading the SVG
			.catch((error) =>
				console.error('Error loading SVG:', error)
			);

		if (selectedIssues.length > 0) {
			// Fetch all buildings from the database
			supabase
				.from('heatmapcounts')
				.select('property')
				.then(
					({
						data: allBuildingsData,
						error: allBuildingsError,
					}) => {
						if (allBuildingsError) {
							console.error(
								'Error fetching all buildings:',
								allBuildingsError
							);
							return;
						}

						// If there are no buildings in the database, return
						if (!allBuildingsData) return;

						// Fetch data for each selected issue
						Promise.all(
							selectedIssues.map((issue) =>
								supabase
									.from('heatmapcounts')
									.select('property, count')
									.eq('craft_code', issue)
							)
						).then((responses) => {
							// Aggregate issue data using function
							const aggregatedData = aggregateIssueData(
								responses.map((response) => ({
									data: response.data ?? [],
								}))
							);
							const combinedData =
								mergeBuildingWithIssueData(
									allBuildingsData,
									aggregatedData
								);
							updateHeatMap(combinedData);
							setIsReady(true);
						});
					}
				);
		} else {
			// Fetch data for all issues (default view)
			supabase
				.from('propertyissues')
				.select('property, total_issues')
				.then(({ data, error }) => {
					if (error) {
						console.error('Error fetching data:', error);
						return;
					}
					updateHeatMap(
						data.map((d) => ({
							property: d.property,
							count:
								d.total_issues !== null
									? +d.total_issues
									: 0,
						}))
					);
					setIsReady(true);
				});
		}
	}, [svgPath, selectedIssues]);

	// Function to update heatmap colors
	const updateHeatMap = (issuesData: BuildingIssueData[]) => {
		issuesData.forEach((building: BuildingIssueData) => {
			const color = determineColor(building.count);
			d3.select(campusMapRef.current)
				.select(`#${building.property}`)
				.select('path')
				.style('fill', color);
		});
	};

	return (
		<div
			className={`svg-container ${isReady ? 'svg-ready' : ''}`}
		>
			<svg
				ref={campusMapRef}
				// Use the dangerouslySetInnerHTML attribute to insert the SVG content
				dangerouslySetInnerHTML={{ __html: svgContent }}
			/>
		</div>
	);
};

// Function to aggregate data from multiple issues
function aggregateIssueData(
	responses: { data: IssueData[] }[]
): BuildingIssueData[] {
	const combinedCounts: { [key: string]: number } = {};
	responses.forEach((response) => {
		response.data.forEach((issue) => {
			if (issue.property) {
				if (!combinedCounts[issue.property]) {
					combinedCounts[issue.property] = 0;
				}
				combinedCounts[issue.property] += issue.count ?? 0;
			}
		});
	});
	return Object.keys(combinedCounts).map((property) => ({
		property,
		count: combinedCounts[property],
	}));
}

// Function to merge building data with issue data
function mergeBuildingWithIssueData(
	allBuildings: BuildingData[],
	issueData: BuildingIssueData[]
): BuildingIssueData[] {
	return allBuildings.map((building) => {
		const issue = issueData.find(
			(i) => i.property === building.property
		);
		return {
			property: building.property,
			count: issue ? issue.count : 0,
		};
	});
}

// Determine color based on number of issues
function determineColor(issues: number): string {
	// Grey for no issue or not in database
	if (issues === 0) return 'rgb(170, 170, 170)';

	// Bright red for issues 1-5
	if (issues <= 5) return 'rgb(238, 75, 43)';

	// Burnt Umber for issues > 5
	return 'rgb(110, 38, 14)';
}

export default HeatMapComponent;
