import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MealPlanning = () => {
    const [meals, setMeals] = useState([]);
    const [selectedMeals, setSelectedMeals] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                const response = await axios.get('/api/meals');
                setMeals(response.data);
            } catch (err) {
                setError('Error fetching meals');
            }
        };
        fetchMeals();
    }, []);

    const handleMealSelect = (meal) => {
        if (selectedMeals.includes(meal)) {
            setSelectedMeals(selectedMeals.filter((m) => m !== meal));
        } else {
            setSelectedMeals([...selectedMeals, meal]);
        }
    };

    const handleSaveMeals = async () => {
        try {
            await axios.post('/api/saveMeals', { meals: selectedMeals });
            alert('Meals saved successfully!');
        } catch (err) {
            setError('Error saving meals');
        }
    };

    return (
        <div>
            <h1>Meal Planning</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                {meals.map((meal) => (
                    <div key={meal._id}>
                        <input
                            type="checkbox"
                            checked={selectedMeals.includes(meal)}
                            onChange={() => handleMealSelect(meal)}
                        />
                        <label>{meal.name}</label>
                    </div>
                ))}
            </div>
            <button onClick={handleSaveMeals}>Save Selected Meals</button>
        </div>
    );
};

export default MealPlanning;