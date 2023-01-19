import { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  // with json server
  // const [feedback, setFeedback] = useState([]);

  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: 'This item is feedback item 1',
      rating: 10,
    },
    {
      id: 2,
      text: 'This item is feedback item 2',
      rating: 9,
    },
    {
      id: 3,
      text: 'This item is feedback item 3',
      rating: 8,
    },
  ]);

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  // only to be used with json server
  // useEffect(() => {
  //   fetchFeedback();
  // }, []);

  // // Fetch feedback
  // const fetchFeedback = async () => {
  //   const response = await fetch(
  //     `${process.env.REACT_APP_BASE_URL}:5000/feedback?_sort=id&_order=desc`,
  //   );
  //   const data = await response.json();

  //   setFeedback(data);
  //   setIsLoading(false);
  // };

  useEffect(() => {
    setIsLoading(false);
  }, [isLoading]);

  // Add new feedback, only to be used with json server
  // const addFeedback = async (newFeedback) => {
  //   const response = await fetch(
  //     `${process.env.REACT_APP_BASE_URL}:5000/feedback`,
  //     {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(newFeedback),
  //     },
  //   );

  //   const data = await response.json();

  //   // take objects that are already in 'feedback' array as well as 'newFeedback'
  //   setFeedback([data, ...feedback]);
  // };

  // Add new feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();

    // take objects that are already in 'feedback' array as well as 'newFeedback'
    setFeedback([newFeedback, ...feedback]);
  };

  // Update feedback item, json server version
  // const updateFeedback = async (id, updItem) => {
  //   const response = await fetch(
  //     `${process.env.REACT_APP_BASE_URL}:5000/feedback/${id}`,
  //     {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(updItem),
  //     },
  //   );

  //   const data = response.json();

  //   setFeedback(feedback.map((item) => (item.id === id ? data : item)));
  //   setFeedbackEdit({ item: {}, edit: false });
  // };

  // Update feedback item
  const updateFeedback = (id, updItem) => {
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item)),
    );
  };

  // Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({ item, edit: true });
  };

  // Delete existing feedback, json server version
  // const deleteFeedback = async (id) => {
  //   if (window.confirm('Are you sure you want to delete?')) {
  //     await fetch(`${process.env.REACT_APP_BASE_URL}:5000/feedback/${id}`, {
  //       method: 'DELETE',
  //     });
  //     setFeedback(feedback.filter((item) => item.id !== id));
  //   }
  // };

  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
