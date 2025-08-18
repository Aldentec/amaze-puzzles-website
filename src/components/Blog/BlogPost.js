import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import { Helmet } from 'react-helmet';

const BlogPost = () => {
  const { filename } = useParams();  // Get the filename from the URL parameters
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch(`/Posts/${filename}`)  // Fetch the HTML content by filename
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then((data) => setContent(data))
      .catch((error) => console.error('Error fetching the blog post:', error));
  }, [filename]);

  return (
    <Container>
      <Helmet>
        <title>{filename.replace('.html', '')} | Amaze Puzzles</title>
        <meta name="description" content="Explore the value of Braille in today's digital world and learn about the Braille Skills Puzzle." />
      </Helmet>
      <Box my={4}>
        <Box sx={{ marginTop: 4 }}>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </Box>
      </Box>
    </Container>
  );
};

export default BlogPost;
