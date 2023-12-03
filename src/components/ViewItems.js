import React from 'react';
import { FaCalendar } from 'react-icons/fa';
import AuthenticatedHeader from './AuthenticatedHeader';
import Card from './Card';
import './ViewItems.css';

/**
 * Component for displaying the user's current items.
 *
 * @component
 */
const ViewItems = (props) => {
  // Dummy data
  const userItems = [
    {
      name: 'Dinner with friends',
      description: 'Description for User Item 1',
      date: '2023-11-20',
    },
    {
      name: 'Doctor appointment',
      description: 'Description for User Item 2',
      date: '2023-11-21',
    },
    {
      name: 'Vet visit',
      description: 'Description for User Item 3',
      date: '2023-11-22',
    },
  ];

  /**
   * Renders the MyItemsPage component.
   *
   * @returns {JSX.Element} JSX representation of the component.
   */
  return (
    <div>
      <AuthenticatedHeader />
      <div className="ViewItems">
        <h2>My Items</h2>
        {userItems.map((item, index) => (
          <Card key={index}>
            <div>
              <strong>{item.name}</strong>
              <p>{item.description}</p>
              <div>
                <FaCalendar />
                <span>{item.date}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ViewItems;
