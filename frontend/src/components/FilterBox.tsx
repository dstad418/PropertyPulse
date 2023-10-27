import React, { useState, useEffect } from 'react';
import './../css/FilterBox.css';

const OptionsBox: React.FC = () => {

    // I asked Tyler for a comprehensive list of these, these are just placeholders! 
    const reportedIssueOptions = [
        'Plumbing',
        'Fire',
        'Pipes',
        'Sewer',
        'Electrical',
        'HVAC',
        'Roofing',
        'Security',
        'Flooring',
        'Elevators',
        'Windows/Doors',
        'Lighting',
        'Pest Control',
        'Landscaping',
        'Mold',
        'Parking',
        'Furniture',
        'Network Connectivity',
        'Appliance Malfunction',
        'Building Exterior',
        'Sanitation',
        'Insulation',
        'Soundproofing',
        'Emergency Exits',
        'ADA Compliance',
        'Ventilation',
        'Handrails',
        'Signage',
        'Safety Equipment',
        'Paint/Finish',
        'Heating',
        'Cooling',
        'Water Quality',
        'Waste Management'
    ];


    const [checkboxes, setCheckboxes] = useState<boolean[]>(
        JSON.parse(localStorage.getItem('checkboxes') as string) || Array(reportedIssueOptions.length).fill(false)
    );

    // THIS IS WHAT STORES THE CHECKBOXES IN LOCAL STORAGE.
    useEffect(() => {
        localStorage.setItem('checkboxes', JSON.stringify(checkboxes));
    }, [checkboxes]);

    const toggleCheckbox = (index: number) => {
        const newCheckboxes = [...checkboxes];
        newCheckboxes[index] = !newCheckboxes[index];
        setCheckboxes(newCheckboxes);
    };

    return (
        <div className="filter-box">
        <h2>Filter Options:</h2>
        {/* Added this new div for the grid layout */}
        <div className="filter-options-grid">
            {checkboxes.map((isChecked, index) => (
            <label key={index}>
                <input
                type="checkbox"
                checked={isChecked}
                onChange={() => toggleCheckbox(index)}
                />
                {reportedIssueOptions[index]}
            </label>
            ))}
        </div>
        </div>
    );
};

export default OptionsBox;
