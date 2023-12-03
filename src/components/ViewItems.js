import React from 'react';
import { FaCalendar } from 'react-icons/fa';
import AuthenticatedHeader from './AuthenticatedHeader';
import Card from './Card';
import './ViewItems.css';

import { useAppContext } from './AppContext';
import axios from 'axios';

/**
 * Component for displaying the user's current items.
 *
 * @component
 */
const ViewItems = () => {
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    // Fetch items from the server when the component mounts
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events'); // Adjust the endpoint
        dispatch({ type: 'SET_ITEMS', payload: response.data });
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, [dispatch]);

  return (
    <div>
      <AuthenticatedHeader />
      <div className="ViewItems">
        <h2>My Items</h2>
        {state.items.map((item) => (
          <Card key={item._id}>
            <div>
              <strong>{item.itemName}</strong>
              <p>{item.itemDescription}</p>
              <div>
                <FaCalendar />
                <span>{item.selectedDate}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ViewItems;