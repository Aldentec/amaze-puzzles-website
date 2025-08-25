import React, { useState } from 'react';
import {
  Container,
  Button,
  Typography,
  Box,
  ImageList,
  ImageListItem,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
  Card,
} from '@mui/material';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import useCart from './Utils/useCart';

import CompletedPuzzle from '../../assets/images/puzzle-2.jpg';
import CompletedGreyPuzzle from '../../assets/images/grey-completed-puzzle.jpg';
import TrayAssortedPieces from '../../assets/images/puzzle-3.jpg';
import CompletedPuzzleVisibleDots from '../../assets/images/puzzle-4.jpg';
import GreenCompletedPuzzle from '../../assets/images/green-completed-puzzle.jpg';
import AssortedPieces from '../../assets/images/assorted-puzzle-pieces.jpg';
import BlackTray from '../../assets/images/black-puzzle-tray.jpg';
import GreenPieces from '../../assets/images/green-pieces-together.jpg';
import BlackAndBlueTrays from '../../assets/images/black-and-blue-trays.jpg';

import '../../App.css';

const fadeUp = (d = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut', delay: d } },
});

const itemData = [
  {
    img: CompletedPuzzle,
    title: 'Completed Braille skills puzzle',
    description:
      'White puzzle tray with red puzzle pieces. Puzzle pieces have raised geometric shapes and braille dots for easy tactile discrimination.',
  },
  {
    img: TrayAssortedPieces,
    title: 'Braille skills puzzle trays and assorted pieces',
    description: 'Tray and puzzle pieces both have braille dots.',
  },
  {
    img: BlackAndBlueTrays,
    title: 'Braille skills puzzle black and blue trays',
    description: 'Braille skills puzzle black and blue trays',
  },
  {
    img: CompletedPuzzleVisibleDots,
    title: 'Completed Braille skills puzzle with highly visible braille dots',
    description: 'Completed Braille skills puzzle with highly visible braille dots',
  },
  {
    img: BlackTray,
    title: 'Braille skills puzzle black tray',
    description: 'Braille skills puzzle black tray',
  },
  {
    img: AssortedPieces,
    title: 'Assorted Braille puzzle pieces',
    description: 'Multicolored collection of Braille puzzle pieces',
  },
  {
    img: GreenPieces,
    title: 'Braille skills puzzle completed green set',
    description: 'Green puzzle pieces with raised geometric shapes',
  },
  {
    img: GreenCompletedPuzzle,
    title: 'Set of green Braille puzzle pieces',
    description:
      'Green transparent puzzle pieces with raised geometric shapes and Braille dots laid out in two rows of five.',
  },
];

const ProductDetail = () => {
  const { addToCart, cart } = useCart();
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const product = {
    id: 1,
    title: 'Braille Skills Puzzle',
    description:
      'This innovative educational tool is a tactile puzzle designed to introduce and reinforce Braille skills while engaging learners in an interactive, multi-sensory experience.',
    price: 135.0,
    weight: 16, // Weight in ounces
    img: CompletedGreyPuzzle,
  };

  const isInCart = cart.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    addToCart(product);
    if (window.gtag) {
      window.gtag('event', 'add_to_cart', {
        event_category: 'Ecommerce',
        event_label: product.title,
        value: product.price,
      });
    }
  };

  const handleClickOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  return (
    <Container disableGutters sx={{ maxWidth: '100% !important', p: 0 }}>
      <Helmet>
        <title>{`${product.title} | Amaze Puzzles`}</title>
        <meta
          name="description"
          content="Detailed view of the Braille Skills Puzzle. View images and learn more about this innovative product designed to enhance Braille literacy."
        />
      </Helmet>

      {/* Gradient page header */}
      <Box
        component={motion.header}
        {...fadeUp(0)}
        sx={{
          position: 'relative',
          color: 'white',
          textAlign: 'center',
          overflow: 'hidden',
          pt: { xs: 6, md: 9 },
          pb: { xs: 6, md: 9 },
          background: 'linear-gradient(135deg, rgba(147,51,234,0.95), rgba(37,99,235,0.95))',
        }}
      >
        {/* Soft blobs */}
        <Box
          sx={{
            position: 'absolute',
            top: '10%',
            right: -90,
            width: 320,
            height: 320,
            bgcolor: 'rgba(255,255,255,0.12)',
            borderRadius: '50%',
            filter: 'blur(60px)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '12%',
            left: -110,
            width: 300,
            height: 300,
            bgcolor: 'rgba(255,255,255,0.12)',
            borderRadius: '50%',
            filter: 'blur(60px)',
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', px: { xs: 3, sm: 5, md: 6 } }}>
          <Typography variant="h2" sx={{ fontWeight: 800, lineHeight: 1.1 }}>
            {product.title}
          </Typography>
        </Container>
      </Box>

      {/* Single glass card containing EVERYTHING (CTA, intro, gallery, sections) */}
      <Container
        maxWidth="lg"
        sx={{ padding: '25px !important', px: { xs: 3, sm: 5, md: 6 }, py: { xs: 6, md: 10 } }}
      >
        <Card
          component={motion.section}
          {...fadeUp(0.05)}
          sx={{
            borderRadius: 4,
            border: '1px solid rgba(148,163,184,0.35)',
            backgroundImage: 'linear-gradient(135deg, rgba(147,51,234,0.06), rgba(37,99,235,0.06))',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 20px 35px -20px rgba(2,6,23,0.25)',
            p: { xs: 3, md: 4 },
          }}
        >
          {/* Add to Cart Button */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Button
              variant="contained"
              sx={{
                borderRadius: 2,
                py: 1.25,
                px: 4,
                background: 'linear-gradient(90deg, #2563eb, #9333ea)',
                '&:hover': { filter: 'brightness(0.95)' },
              }}
              onClick={handleAddToCart}
              disabled={isInCart}
              aria-label={isInCart ? 'Item already in cart' : 'Add item to cart'}
            >
              {isInCart ? 'In Cart' : 'Add to Cart'}
            </Button>
          </Box>

          {/* Intro paragraph (kept verbatim, with dimensions) */}
          <Typography variant="body1" paragraph sx={{ color: '#475569' }}>
            This innovative educational tool is a tactile puzzle designed to introduce and reinforce
            Braille skills while engaging learners in an interactive, multi-sensory experience.
            The puzzle consists of a set of ten pieces (2.25&quot; x 2.25&quot; x 0.33&quot;)
            that fit into a specially designed tray (approximately 14&quot; x 6&quot; x 0.5&quot;).
          </Typography>

          {/* Masonry gallery (inside the same card) */}
          <ImageList variant="masonry" cols={3} gap={8} sx={{ my: 1 }}>
            {itemData.map((item, index) => (
              <Tooltip key={index} title={item.description} arrow placement="top">
                <ImageListItem
                  className="gallery-item"
                  onClick={() => handleClickOpen(item.img)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleClickOpen(item.img);
                  }}
                  aria-label={item.title}
                  sx={{
                    cursor: 'zoom-in',
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: '0 10px 20px -12px rgba(2,6,23,0.25)',
                  }}
                >
                  <img
                    src={`${item.img}?w=248&fit=crop&auto=format`}
                    srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.title}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', display: 'block' }}
                  />
                </ImageListItem>
              </Tooltip>
            ))}
          </ImageList>

          {/* All remaining sections—text kept exactly as provided */}
          <Typography variant="h5" component="h2" sx={{ color: 'var(--primary-color)', mt: 4 }} gutterBottom>
            <strong>Each puzzle piece features:</strong>
          </Typography>
          <Typography variant="body1" component="ul" sx={{ pl: 2, color: '#475569', lineHeight: 1.8 }}>
            <li>A unique shape that corresponds to a specific location in the tray</li>
            <li>A recessed edge (0.25&quot; wide x 0.25&quot; tall) for secure placement</li>
            <li>Braille numerals</li>
            <li>A central geometric shape with sides corresponding to the Braille number</li>
          </Typography>

          <Typography variant="h5" component="h2" sx={{ color: 'var(--primary-color)', mt: 4 }} gutterBottom>
            <strong>The tray includes:</strong>
          </Typography>
          <Typography variant="body1" component="ul" sx={{ pl: 2, color: '#475569', lineHeight: 1.8 }}>
            <li>Raised edges matching the recessed edges of the pieces</li>
            <li>Braille numerals in the center of each piece's designated space</li>
          </Typography>

          <Typography variant="h5" component="h2" sx={{ color: 'var(--primary-color)', mt: 4 }} gutterBottom>
            <strong>How the Puzzle Supports Braille Introduction and Skill Retention:</strong>
          </Typography>
          <Typography variant="body1" component="ol" sx={{ pl: 2, color: '#475569', lineHeight: 1.8 }}>
            <li>
              <strong>Tactile Exploration:</strong> The puzzle encourages active touch exploration, a crucial skill for
              Braille readers. As users feel the edges, shapes, and Braille dots, they strengthen neural pathways
              associated with tactile discrimination, enhancing their ability to discern fine details through touch.
            </li>
            <li>
              <strong>Braille Symbol Recognition:</strong> By incorporating Braille numerals on both the pieces and the
              tray, the puzzle provides repeated exposure to Braille symbols. This repetition supports memory formation
              and recall, reinforcing the connection between the tactile patterns and their numerical meanings.
            </li>
            <li>
              <strong>Multi-sensory Association:</strong> The combination of shape recognition, spatial positioning, and
              Braille reading engages multiple senses simultaneously. This multi-sensory approach creates stronger, more
              diverse neural connections, potentially improving long-term retention of Braille skills.
            </li>
            <li>
              <strong>Incremental Learning:</strong> Users can progress from basic shape matching to Braille reading,
              allowing for a scaffolded approach to learning. This gradual skill development supports confidence-building
              and reduces frustration, key factors in successful skill acquisition and retention.
            </li>
            <li>
              <strong>Spatial Reasoning:</strong> The puzzle's design enhances spatial awareness and mental mapping
              skills, which are crucial for efficient Braille reading. As users navigate the tray and place pieces, they
              develop a stronger sense of spatial relationships, potentially improving their ability to track lines and
              navigate Braille texts.
            </li>
            <li>
              <strong>Fine Motor Skill Development:</strong> Manipulating the puzzle pieces refines the fine motor
              skills necessary for Braille reading. This physical engagement strengthens the neural pathways associated
              with finger dexterity and precise movements, supporting more fluent Braille reading over time.
            </li>
            <li>
              <strong>Cognitive Flexibility:</strong> The puzzle requires users to switch between different modes of
              thinking (shape recognition, numerical understanding, spatial reasoning). This cognitive flexibility can
              translate to improved adaptability in Braille reading across various contexts and formats.
            </li>
            <li>
              <strong>Engaged Learning:</strong> By presenting Braille in a game-like format, the puzzle increases
              motivation and engagement. This positive association with Braille can foster a more enthusiastic approach
              to learning and practicing Braille skills, leading to better long-term retention.
            </li>
            <li>
              <strong>Self-Directed Exploration:</strong> The puzzle allows for independent learning, promoting autonomy
              and self-confidence. This sense of ownership over the learning process can lead to increased practice and,
              consequently, better skill retention.
            </li>
            <li>
              <strong>Numeracy Reinforcement:</strong> While primarily focused on Braille, the puzzle's incorporation of
              numerical concepts provides an additional layer of learning. This integration of numeracy with Braille
              introduces learners to the practical applications of Braille in mathematical contexts.
            </li>
          </Typography>

          <Typography variant="body1" paragraph sx={{ mt: 2, color: '#475569' }}>
            By combining these elements, the puzzle creates a comprehensive learning experience that not only introduces
            Braille in an engaging manner but also supports the development and retention of critical skills necessary
            for proficient Braille reading.
          </Typography>

          <Typography variant="h5" component="h2" sx={{ color: 'var(--primary-color)', mt: 4 }} gutterBottom>
            <strong>Instructions</strong>
          </Typography>
          <Typography variant="body1" component="ol" sx={{ pl: 2, color: '#475569', lineHeight: 1.8 }}>
            <li>
              <strong>Setup:</strong>
              <ul>
                <li>Lay out the puzzle tray and pieces on a flat, accessible surface.</li>
                <li>Ensure all puzzle pieces are present and in good condition.</li>
              </ul>
            </li>
            <li>
              <strong>Exploring the Pieces:</strong>
              <ul>
                <li>Pick up each puzzle piece one by one.</li>
                <li>Feel the overall shape of each piece with your fingers. Notice the distinct edges and contours.</li>
                <li>
                  Locate the Braille designation on the surface of each piece. Take a moment to read the Braille and
                  familiarize yourself with it.
                </li>
              </ul>
            </li>
            <li>
              <strong>Exploring the Tray:</strong>
              <ul>
                <li>Run your fingers over the surface of the puzzle tray.</li>
                <li>Feel the voids and the raised edges. Each void corresponds to a specific puzzle piece shape.</li>
                <li>Locate and read the Braille designations in the center of each void on the tray.</li>
              </ul>
            </li>
            <li>
              <strong>Matching and Placement:</strong>
              <ul>
                <li>Select a puzzle piece and feel its shape and Braille designation.</li>
                <li>
                  Find the corresponding void in the tray by matching the shape and reading the Braille designation in
                  the tray’s void.
                </li>
                <li>Place the puzzle piece into the matching void. The piece should fit snugly within the raised edges of the void.</li>
              </ul>
            </li>
            <li>
              <strong>Completion:</strong>
              <ul>
                <li>Continue the process of matching and placing each puzzle piece into the tray until all pieces are correctly placed.</li>
                <li>
                  Once all pieces are placed, review the placements to ensure each piece is in its correct position. Feel
                  the tray and pieces again to verify that all Braille designations match and the shapes fit perfectly.
                </li>
              </ul>
            </li>
            <li>
              <strong>Using the Puzzle Regularly:</strong>
              <ul>
                <li>Engage with the puzzle regularly to reinforce your Braille skills.</li>
                <li>
                  Experiment with different methods, such as timing yourself or using the puzzle in different settings,
                  to enhance your learning experience.
                </li>
              </ul>
            </li>
          </Typography>

          <Typography variant="h5" component="h2" sx={{ color: 'var(--primary-color)', mt: 4 }} gutterBottom>
            <strong>Tips for Effective Use</strong>
          </Typography>
          <Typography variant="body1" component="ul" sx={{ pl: 2, color: '#475569', lineHeight: 1.8 }}>
            <li>
              <strong>Patience and Practice:</strong> Learning Braille through tactile puzzles can take time. Be patient
              with yourself and practice regularly.
            </li>
            <li>
              <strong>Sensory Focus:</strong> Use your sense of touch to explore and learn. The more you rely on tactile
              feedback, the more effective your learning will be.
            </li>
            <li>
              <strong>Feedback:</strong> If possible, seek feedback from others who are proficient in Braille to enhance
              your learning process.
            </li>
            <li>
              <strong>Enjoy the Process:</strong> Treat the puzzle as a fun and engaging tool for learning. Enjoy the
              discovery and satisfaction of matching pieces correctly.
            </li>
          </Typography>
        </Card>
      </Container>

      {/* Lightbox */}
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <DialogTitle sx={{ pr: 6 }}>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedImage && (
            <img src={selectedImage} alt="Selected" style={{ width: '100%', height: 'auto', display: 'block' }} />
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default ProductDetail;
