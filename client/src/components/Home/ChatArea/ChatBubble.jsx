import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

const styles = {
  content: {
    display: 'inline-block',
    maxWidth: '46%',
    fontSize: '12px',
    borderRadius: '15px',
    padding: '8px 10px',
  },
  sent: {
    float: 'right',
    textAlign: 'right',
    color: 'white',
    backgroundColor: '#B5936B',
  },
  received: {
    textAlign: 'left',
    color: 'black',
    backgroundColor: '#d9d9d9',
  },
};

export default function ChatBubble({ message }) {
  return (
    <Box
      style={message.isSelf
        ? { ...styles.content, ...styles.sent } : { ...styles.content, ...styles.received }}
    >
      {message.content}
    </Box>
  );
}

ChatBubble.propTypes = {
  message: PropTypes.shape({
    content: PropTypes.string.isRequired,
    isSelf: PropTypes.bool.isRequired,
  }).isRequired,
};
