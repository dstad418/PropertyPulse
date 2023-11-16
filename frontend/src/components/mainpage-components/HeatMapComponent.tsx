import React, { FC, useEffect } from 'react';
import * as d3 from 'd3';

type HeatMapComponentProps = {
	dataPath: string;
	svgPath: string;
};

const HeatMapComponent: FC<HeatMapComponentProps> = ({
	dataPath,
	svgPath,
}) => {
	useEffect(() => {
		Promise.all([
			d3.csv(dataPath),
			fetch(svgPath).then((response) => response.text()),
		])
			.then(([data, svgContent]) => {
				const campusMapElement =
					document.getElementById('campus-map');
				if (campusMapElement) {
					campusMapElement.innerHTML = svgContent;

					const issuesData = data.map((d) => ({
						property: d.property,
						total_issues: +d.total_issues,
					}));

					issuesData.forEach((building) => {
						const color = determineColor(
							building.total_issues
						);
						d3.select(`#${building.property}`)
							.select('path')
							.style('fill', color);
					});
				} else {
					console.error('Campus map element not found');
				}
			})
			.catch((error) => {
				console.error('Error loading data or SVG:', error);
			});
	}, [dataPath, svgPath]);

	return (
		<div className="svg-container">
			<svg id="campus-map"></svg>
		</div>
	);
};

function determineColor(issues: number): string {
	if (issues === 0) return 'green';
	// A darker version of yellow for readability
	if (issues <= 5) return 'rgb(205, 173, 0)';
	return 'red';
}

export default HeatMapComponent;
