import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import {CloudUploadOutlined} from '@mui/icons-material';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const InputFileUpload = () => {
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      style={{fontFamily: 'inherit', textTransform: 'none'}}
      startIcon={<CloudUploadOutlined fill={'#fff'} />}
    >
      Upload file
      <VisuallyHiddenInput type="file" />
    </Button>
  );
}

export default InputFileUpload
