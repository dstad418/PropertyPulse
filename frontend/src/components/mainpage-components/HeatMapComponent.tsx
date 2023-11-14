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

					const colorScale = d3
						.scaleLinear<string>()
						.domain([
							0,
							d3.max(
								issuesData,
								(d) => d.total_issues
							) as number,
						])
						.range(['lightblue', 'darkred']);

					issuesData.forEach((building) => {
						console.log(
							`Applying color to: ${building.property}`
						);
						const selection = d3
							.select(`#${building.property}`)
							.select('path');
						console.log(
							`Element found:`,
							selection.node()
						);
						selection.style(
							'fill',
							colorScale(building.total_issues)
						);
					});
				} else {
					console.error('Campus map element not found');
				}
			})
			.catch((error) => {
				console.error('Error loading data or SVG:', error);
			});
	}, [dataPath, svgPath]);

	return <svg id="campus-map"></svg>;
};

export default HeatMapComponent;
