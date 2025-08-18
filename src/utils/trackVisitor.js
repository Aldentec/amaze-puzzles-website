// src/utils/trackVisitor.js
import axios from 'axios';

const trackVisitor = async () => {
  const hasVisited = sessionStorage.getItem('hasVisited');

  if (!hasVisited) {
    try {
      await axios.post(
        'https://4sr8xw2cgk.execute-api.us-west-2.amazonaws.com/prod/track', 
        {},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      sessionStorage.setItem('hasVisited', 'true');
    } catch (error) {
      console.error('Error tracking visitor:', error);
    }
  }
};

export default trackVisitor;
