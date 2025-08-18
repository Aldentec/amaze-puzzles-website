import React, { useState } from 'react';
import { Typography, Box, ImageList, ImageListItem, Dialog, DialogContent, DialogTitle, IconButton, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import CompletedPuzzle from '../../assets/images/puzzle-2.jpg';
import TrayAssortedPieces from '../../assets/images/puzzle-3.jpg';
import CompletedPuzzleVisibleDots from '../../assets/images/puzzle-4.jpg';
import GreenCompletedPuzzle from '../../assets/images/green-completed-puzzle.jpg';
import AssortedPieces from '../../assets/images/assorted-puzzle-pieces.jpg';
import BlackTray from '../../assets/images/black-puzzle-tray.jpg';
import GreenPieces from '../../assets/images/green-pieces-together.jpg';
import BlackAndBlueTrays from '../../assets/images/black-and-blue-trays.jpg';
import '../../App.css';

const itemData = [
  {
    img: CompletedPuzzle,
    title: 'Completed Braille skills puzzle',
    description: 'White puzzle tray with red puzzle pieces. Puzzle pieces have raised geometric shapes and braille dots for easy tactile discrimination.'
  },
  {
    img: TrayAssortedPieces,
    title: 'Braille skills puzzle trays and assorted pieces',
    description: 'Tray and puzzle pieces both have braille dots.'
  },
  {
    img: BlackAndBlueTrays,
    title: 'Braille skills puzzle black and blue trays',
    description: 'Braille skills puzzle black and blue trays'
  },
  {
    img: CompletedPuzzleVisibleDots,
    title: 'Completed Braille skills puzzle with highly visible braille dots',
    description: 'Completed Braille skills puzzle with highly visible braille dots'
  },
  {
    img: BlackTray,
    title: 'Braille skills puzzle black tray',
    description: 'Braille skills puzzle black tray'
  },
  {
    img: AssortedPieces,
    title: 'Assorted Braille puzzle pieces',
    description: 'Multicolored collection of Braille puzzle pieces'
  },
  {
    img: GreenPieces,
    title: 'Braille skills puzzle completed green set',
    description: 'Green puzzle pieces with raised geometric shapes'
  },
  {
    img: GreenCompletedPuzzle,
    title: "Set of green Braille puzzle pieces",
    description: "Green transparent puzzle pieces with raised geometric shapes and Braille dots laid out in two rows of five."
  }
];

const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleClickOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 1, delay: 1 }}
    >
      <Box className="section section2">
        <Typography variant="h3" component="h2" gutterBottom sx={{ textAlign: 'center', color: 'var(--primary-color)' }} className="text-shadow">
          Braille Skills Puzzle
        </Typography>
        <ImageList variant="masonry" cols={3} gap={8}>
          {itemData.map((item) => (
            <Tooltip key={item.img} title={item.description} placement="top" arrow>
              <ImageListItem 
                className="gallery-item" 
                onClick={() => handleClickOpen(item.img)} 
                role="button" 
                tabIndex="0"
                onKeyDown={(e) => { if (e.key === 'Enter') handleClickOpen(item.img); }}
              >
                <img
                  src={`${item.img}?w=248&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.description}
                  loading="lazy"
                  style={{ cursor: 'pointer' }}
                  aria-label={item.title}
                />
              </ImageListItem>
            </Tooltip>
          ))}
        </ImageList>
      </Box>
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <DialogTitle>
          <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedImage && (
            <img src={selectedImage} alt="Selected" style={{ width: '100%', height: 'auto' }} />
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default Gallery;
