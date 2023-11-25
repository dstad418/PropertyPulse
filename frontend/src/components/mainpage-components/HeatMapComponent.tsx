import React, { FC, useEffect } from 'react';
import * as d3 from 'd3';
import { supabase } from '../../db/supabase';

type HeatMapComponentProps = {
	svgPath: string;
};

const HeatMapComponent: FC<HeatMapComponentProps> = ({ svgPath }) => {
	useEffect(() => {
		// Fetch SVG and Database Data
		Promise.all([
			fetch(svgPath).then((response) => response.text()),
			supabase
				.from('propertyissues')
				.select('property, total_issues'),
		])
			.then(([svgContent, { data, error }]) => {
				if (error) {
					console.error('Error fetching data:', error);
					return;
				}
				const campusMapElement =
					document.getElementById('campus-map');
				if (campusMapElement && data) {
					// Set SVG content
					campusMapElement.innerHTML = svgContent;

					// Process data from database
					const issuesData = data.map((d) => ({
						property: d.property,
						// If total_issues is null, set to 0. Otherwise, convert to number
						total_issues:
							d.total_issues !== null
								? +d.total_issues
								: 0,
					}));

					// Define colors for each building
					issuesData.forEach((building) => {
						const color = determineColor(
							building.total_issues
						);
						d3.select(`#${building.property}`)
							.select('path')
							.style('fill', color);
					});
				} else {
					console.error('Campus map element not found!');
				}
			})
			.catch((error) => {
				console.error('Error loading SVG:', error);
			});
	}, [svgPath]);

	return (
		<div className="svg-container">
			<svg id="campus-map"></svg>
		</div>
	);
};

// Determine color based on number of issues
function determineColor(issues: number): string {
	// Grey for no issue or not in database
	if (issues === 0) return 'rgb(204, 204, 205)';

	// Bright red for issues 1-5
	if (issues <= 5) return 'rgb(238, 75, 43)';

	// Burnt Umber for issues > 5
	return 'rgb(110, 38, 14)';
}

export default HeatMapComponent;
