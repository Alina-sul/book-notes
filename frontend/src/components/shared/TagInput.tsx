import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Chip,
  Typography
} from '@mui/material';
import {
  Add as AddIcon
} from '@mui/icons-material';

interface TagInputProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  label?: string;
  placeholder?: string;
}

const TagInput: React.FC<TagInputProps> = ({
  tags,
  onTagsChange,
  label = "Tags",
  placeholder = "Add a tag"
}) => {
  const [newTag, setNewTag] = useState('');

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      onTagsChange([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onTagsChange(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <Box>
      <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
        {label}
      </Typography>

      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <TextField
          placeholder={placeholder}
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
  );
};

export default TagInput;