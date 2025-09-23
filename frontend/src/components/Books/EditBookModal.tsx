import React, { useState, useEffect } from 'react';
import {
  Button,
  Box
} from '@mui/material';
import { EditBookModalProps, BookStatus } from '../../types';
import { APP_CONFIG, BOOK_STATUS } from '../../constants';
import ModalWrapper from '../shared/ModalWrapper';
import FormField from '../shared/FormField';
import TagInput from '../shared/TagInput';
import StatusSelector from '../shared/StatusSelector';

const EditBookModal: React.FC<EditBookModalProps> = ({ open, book, onClose, onEditBook }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [status, setStatus] = useState<BookStatus>(BOOK_STATUS.WISHLIST);
  const [rating, setRating] = useState<string>('');
  const [description, setDescription] = useState('');

  // Populate form when book changes
  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setCoverUrl(book.coverUrl);
      setTags(book.tags);
      setStatus(book.status);
      setRating(book.rating ? book.rating.toString() : '');
      setDescription(book.description || '');
    }
  }, [book]);

  const handleSubmit = () => {
    if (!title.trim() || !author.trim() || !book) {
      return;
    }

    const bookData = {
      id: book.id,
      title: title.trim(),
      author: author.trim(),
      coverUrl: coverUrl.trim() || APP_CONFIG.defaultCoverUrl,
      tags,
      status,
      rating: rating ? parseInt(rating) : undefined,
      description: description.trim() || undefined,
      dateFinished: status === 'finished' ? new Date().toISOString().split('T')[0] : undefined,
    };

    onEditBook(bookData);
    handleClose();
  };

  const handleClose = () => {
    setTitle('');
    setAuthor('');
    setCoverUrl('');
    setTags([]);
    setStatus(BOOK_STATUS.WISHLIST);
    setRating('');
    setDescription('');
    onClose();
  };

  if (!book) return null;

  const actions = (
    <>
      <Button
        onClick={handleClose}
        sx={{
          color: '#666',
          textTransform: 'none',
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
        Save Changes
      </Button>
    </>
  );

  return (
    <ModalWrapper
      open={open}
      onClose={handleClose}
      title="Edit Book"
      actions={actions}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <FormField
          label="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <FormField
          label="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />

        <FormField
          label="Cover Image URL (optional)"
          value={coverUrl}
          onChange={(e) => setCoverUrl(e.target.value)}
        />

        <FormField
          label="Rating (1-5)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          type="number"
          inputProps={{ min: 1, max: 5 }}
        />

        <FormField
          label="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={3}
        />

        <TagInput
          tags={tags}
          onTagsChange={setTags}
        />

        <StatusSelector
          status={status}
          onStatusChange={setStatus}
        />
      </Box>
    </ModalWrapper>
  );
};

export default EditBookModal;