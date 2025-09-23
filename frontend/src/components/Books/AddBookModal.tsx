import React, { useState } from 'react';
import {
  Button,
  Box
} from '@mui/material';
import { AddBookModalProps, BookStatus } from '../../types';
import { APP_CONFIG, BOOK_STATUS } from '../../constants';
import ModalWrapper from '../shared/ModalWrapper';
import FormField from '../shared/FormField';
import TagInput from '../shared/TagInput';
import StatusSelector from '../shared/StatusSelector';

const AddBookModal: React.FC<AddBookModalProps> = ({ open, onClose, onAddBook }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [status, setStatus] = useState<BookStatus>(BOOK_STATUS.WISHLIST);

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
    setStatus(BOOK_STATUS.WISHLIST);
    onClose();
  };

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
        Add Book
      </Button>
    </>
  );

  return (
    <ModalWrapper
      open={open}
      onClose={handleClose}
      title="Add a New Book"
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

export default AddBookModal;