import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Chip,
  Typography,
  IconButton
} from '@mui/material';
import {
  Close as CloseIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { AddBookModalProps, BookStatus } from '../../types';
import { APP_CONFIG, BOOK_STATUS, BOOK_STATUS_LABELS } from '../../constants';

const AddBookModal: React.FC<AddBookModalProps> = ({ open, onClose, onAddBook }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [status, setStatus] = useState<BookStatus>(BOOK_STATUS.WISHLIST);

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = () => {
    if (!title.trim() || !author.trim()) {
      return;
    }

    const bookData = {
      title: title.trim(),
      author: author.trim(),
      coverUrl: coverUrl.trim() || APP_CONFIG.defaultCoverUrl,
      tags,
      status,
      rating: undefined,
      description: undefined,
      dateFinished: status === 'finished' ? new Date().toISOString().split('T')[0] : undefined,
    };

    onAddBook(bookData);
    handleClose();
  };

  const handleClose = () => {
    setTitle('');
    setAuthor('');
    setCoverUrl('');
    setTags([]);
    setNewTag('');
    setStatus(BOOK_STATUS.WISHLIST);
    onClose();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTag();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxHeight: '90vh',
        },
      }}
      BackdropProps={{
        sx: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <DialogTitle sx={{
        fontFamily: 'Literata',
        fontSize: '1.5rem',
        fontWeight: 600,
        pb: 1,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        Add a New Book
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Book Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#000',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#000',
              },
            }}
          />

          <TextField
            label="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            fullWidth
            required
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#000',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#000',
              },
            }}
          />

          <TextField
            label="Cover Image URL (optional)"
            value={coverUrl}
            onChange={(e) => setCoverUrl(e.target.value)}
            fullWidth
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#000',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#000',
              },
            }}
          />

          {/* Tags Section */}
          <Box>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Tags
            </Typography>

            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
                placeholder="Add a tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={handleKeyPress}
                size="small"
                sx={{
                  flex: 1,
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#000',
                    },
                  },
                }}
              />
              <Button
                onClick={handleAddTag}
                variant="outlined"
                size="small"
                sx={{
                  minWidth: 'auto',
                  px: 2,
                  borderColor: '#000',
                  color: '#000',
                  '&:hover': {
                    borderColor: '#000',
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                <AddIcon />
              </Button>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => handleRemoveTag(tag)}
                  size="small"
                  variant="outlined"
                  sx={{
                    borderColor: '#ddd',
                    '& .MuiChip-deleteIcon': {
                      color: '#666',
                      '&:hover': {
                        color: '#000',
                      },
                    },
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Status Selection */}
          <Box>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
              Reading Status
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {[
                { value: BOOK_STATUS.WISHLIST, label: BOOK_STATUS_LABELS.wishlist },
                { value: BOOK_STATUS.READING, label: BOOK_STATUS_LABELS.reading },
                { value: BOOK_STATUS.FINISHED, label: BOOK_STATUS_LABELS.finished },
              ].map((option) => (
                <Chip
                  key={option.value}
                  label={option.label}
                  onClick={() => setStatus(option.value as any)}
                  variant={status === option.value ? 'filled' : 'outlined'}
                  sx={{
                    backgroundColor: status === option.value ? '#000' : 'transparent',
                    color: status === option.value ? 'white' : '#666',
                    borderColor: status === option.value ? '#000' : '#ddd',
                    '&:hover': {
                      backgroundColor: status === option.value ? '#333' : 'rgba(0, 0, 0, 0.04)',
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 2 }}>
        <Button
          onClick={handleClose}
          sx={{
            color: '#666',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!title.trim() || !author.trim()}
          variant="contained"
          sx={{
            backgroundColor: 'black',
            color: 'white',
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': {
              backgroundColor: '#333',
            },
            '&:disabled': {
              backgroundColor: '#ccc',
            },
          }}
        >
          Add Book
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBookModal;