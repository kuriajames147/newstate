import { useState, useEffect } from 'react';

function Header() {
    const [setUser] = useState(null);
    const [setStats] = useState([]);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/dashboard/stats', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            const data = await response.json();
            if (data.success) {
                setUser(data.user);
                setStats(data.stats);
            }
        } catch (error) {
            console.error('Error fetching dashboard:', error);
        }
    };

    // Your existing JSX...
}