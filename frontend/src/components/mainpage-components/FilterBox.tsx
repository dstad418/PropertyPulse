import React, { useState, useEffect } from 'react';
import '../../css/mainpage-css/FilterBox.css';
import { supabase } from '../../db/supabase';
import { useSelectedIssues } from '../utility-components/SelectedIssueContext';
import { select } from 'd3';

const OptionsBox: React.FC = () => {
	// Get the selected issues from the context
	const { selectedIssues, setSelectedIssues } = useSelectedIssues();
	const [craftCodes, setCraftCodes] = useState<string[]>([]);

	useEffect(() => {
		const fetchDataFromDatabase = async () => {
			try {
				// call to the API to get active issue codes
				const response = await supabase
					.from('openactiveissues')
					.select('craft_code')
					.order('craft_code', { ascending: true });

				// extracting craft codes from the response
				const extractedCraftCodes: string[] = response.data
					? response.data.map(
							(item: { craft_code: string }) =>
								item.craft_code
							// eslint-disable-next-line no-mixed-spaces-and-tabs
					  )
					: [];

				// Update the state with the extracted craft codes
				setCraftCodes(extractedCraftCodes);
			} catch (error) {
				setCraftCodes(['']);
				console.error('Error fetching data:', error);
			}
		};

		// Call the function to fetch data when the component mounts
		fetchDataFromDatabase();
	}, []);

	/* NOTE:
        This code was cannabalized from the old checkbox implementation, and it can be a little complicated.

        Selected Options: This is the array of filter options that the user selected. In the settings model, it's
        what clear cache calls to remove all selected user options from the dropdown.
            NOTE #2!: This is the option that I call in the SettingsModal to remove all options from local storage!

        The 'checkboxes' that are stored in local storage is the array of values on IF each filter option is selected.
        
        I like to think of it as two lists, one to determine what IS selected, and the other to keep track of anything NOT selected. 
        That helped me grasp the abstraction a little more. 
    */

	// Initialize the 'checkboxes' from local storage. See note above!
	const [checkboxes, setCheckboxes] = useState<boolean[]>(() => {
		const savedCheckboxes = localStorage.getItem('filters');
		return savedCheckboxes
			? JSON.parse(savedCheckboxes)
			: Array(craftCodes.length).fill(false);
	});

	// Effect to store the option in local storage!
	useEffect(() => {
		localStorage.setItem('filters', JSON.stringify(checkboxes));
	}, [checkboxes]);

	// Effect to update the array of filter options!
	useEffect(() => {
		localStorage.setItem(
			'selectedOptions',
			JSON.stringify(selectedIssues)
		);
	}, [selectedIssues]);

	const handleOptionChange = (option: string) => {
		// Updating selected issues in context
		const updatedSelectedIssues = selectedIssues.includes(option)
			? selectedIssues.filter((selected) => selected !== option)
			: [...selectedIssues, option];
		setSelectedIssues(updatedSelectedIssues);

		// Update checkboxes state for local storage
		const index = craftCodes.indexOf(option);
		const updatedCheckboxes = [...checkboxes];
		updatedCheckboxes[index] = !updatedCheckboxes[index];
		setCheckboxes(updatedCheckboxes);
	};

	const removeOption = (option: string) => {
		// Removing an issue from selected issues in context
		setSelectedIssues(
			selectedIssues.filter((selected) => selected !== option)
		);

		// Update checkboxes state for local storage
		const index = craftCodes.indexOf(option);
		const updatedCheckboxes = [...checkboxes];
		updatedCheckboxes[index] = false;
		setCheckboxes(updatedCheckboxes);
	};

	return (
		<div className="filter-box">
			<h2>Filter Options:</h2>
			<label htmlFor="issueSelect">Select an Issue:</label>
			<select
				id="issueSelect"
				onChange={(e) => handleOptionChange(e.target.value)}
			>
				<option value="">ALL ISSUES</option>
				{craftCodes.map((option, index) => (
					<option
						key={index}
						value={option}
						disabled={selectedIssues.includes(option)}
					>
						{option}
					</option>
				))}
			</select>
			<div className="selected-options">
				{/* Displaying selected issues */}
				{selectedIssues.map((option, index) => (
					<div key={index} className="selected-option">
						{option}
						<button onClick={() => removeOption(option)}>
							X
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default OptionsBox;
