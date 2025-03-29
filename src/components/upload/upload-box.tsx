import { useDropzone } from 'react-dropzone';
import { varAlpha, mergeClasses } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import { FormHelperText } from '@mui/material';

import { Iconify } from '../iconify';
import { uploadClasses } from './classes';
import { DeleteButton, SingleFilePreview } from './components/preview-single-file';

import type { UploadProps } from './types';

// ----------------------------------------------------------------------

export function UploadBox({
  value,
  placeholder,
  error,
  disabled,
  className,
  helperText,
  sx,
  onDelete,
  ...other
}: UploadProps) {
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    disabled,
    ...other,
  });

  const hasFile = !!value;
  const hasError = isDragReject || error;

  return (
    <Box
      className={mergeClasses([uploadClasses.upload, className])}
      sx={[{ width: 1, position: 'relative' }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      <Box
        {...getRootProps()}
        className={mergeClasses([uploadClasses.uploadBox, className])}
        sx={[
          (theme) => ({
            width: 64,
            height: 64,
            flexShrink: 0,
            display: 'flex',
            borderRadius: 1,
            cursor: 'pointer',
            alignItems: 'center',
            color: 'text.disabled',
            justifyContent: 'center',
            bgcolor: varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
            border: `dashed 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.16)}`,
            ...(isDragActive && { opacity: 0.72 }),
            ...(disabled && { opacity: 0.48, pointerEvents: 'none' }),
            ...(hasError && {
              color: 'error.main',
              borderColor: 'error.main',
              bgcolor: varAlpha(theme.vars.palette.error.mainChannel, 0.08),
            }),
            '&:hover': { opacity: 0.72 },
            ...(hasFile && { padding: '28% 0' }),
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <input {...getInputProps()} />

        {hasFile ? (
          <SingleFilePreview file={value as File} />
        ) : (
          placeholder || <Iconify icon="eva:cloud-upload-fill" width={28} />
        )}
      </Box>
      {/* Single file */}
      {hasFile && <DeleteButton onClick={onDelete} />}
      {helperText && (
        <FormHelperText error={!!error} sx={{ mx: 1.75 }}>
          {helperText}
        </FormHelperText>
      )}
    </Box>
  );
}
