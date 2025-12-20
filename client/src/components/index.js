import React, { useState } from 'react';
import axios from 'axios';

export const AuthComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/login', { email, password });
            // Handle successful login (e.g., store token, redirect)
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const RecipeDisplay = () => {
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get('/api/recipes');
                setRecipes(response.data);
            } catch (err) {
                setError('Failed to fetch recipes');
            }
        };
        fetchRecipes();
    }, []);

    return (
        <div>
            <h2>Recipes</h2>
            {error && <p>{error}</p>}
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe._id}>{recipe.name}</li>
                ))}
            </ul>
        </div>
    );
};

import React, { useState } from 'react';

export const MealPlanning = () => {
    const [mealPlan, setMealPlan] = useState([]);
    const [meal, setMeal] = useState('');

    const addMeal = () => {
        if (meal) {
            setMealPlan([...mealPlan, meal]);
            setMeal('');
        }
    };

    return (
        <div>
            <h2>Meal Planning</h2>
            <input type="text" value={meal} onChange={(e) => setMeal(e.target.value)} />
            <button onClick={addMeal}>Add Meal</button>
            <ul>
                {mealPlan.map((m, index) => (
                    <li key={index}>{m}</li>
                ))}
            </ul>
        </div>
    );
};

import React, { useState } from 'react';

export const ShoppingList = () => {
    const [items, setItems] = useState([]);
    const [item, setItem] = useState('');

    const addItem = () => {
        if (item) {
            setItems([...items, item]);
            setItem('');
        }
    };

    return (
        <div>
            <h2>Shopping List</h2>
            <input type="text" value={item} onChange={(e) => setItem(e.target.value)} />
            <button onClick={addItem}>Add Item</button>
            <ul>
                {items.map((i, index) => (
                    <li key={index}>{i}</li>
                ))}
            </ul>
        </div>
    );
};