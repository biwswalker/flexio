import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider, MenuItem } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { fData } from 'src/utils/format-number';

import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

export type UpdateUserSchemaType = zod.infer<typeof UpdateUserSchema>;

export const UpdateUserSchema = zod.object({
  imageUrl: schemaHelper.file({ message: 'กรุณาอัพโหดไฟล์' }),
  name: zod.string().min(1, { message: 'กรุณากรอกชื่อ-นามสกุล' }),
  email: zod
    .string()
    .min(1, { message: 'กรุณากรอกอีเมล!' })
    .email({ message: 'กรุณากรอกอีเมลให้ถูกต้อง' }),
  role: zod.string().min(1, { message: 'กรุณาเลือกบทบาท' }),
  status: zod.string(),
});

// ----------------------------------------------------------------------

export function AccountGeneral() {
  const { user } = useAuthContext();

  const currentUser: UpdateUserSchemaType = {
    name: user?.name || '',
    email: user?.email || '',
    imageUrl: user?.imageUrl || '',
    role: user?.role || '',
    status: user?.status || '',
  };

  const defaultValues: UpdateUserSchemaType = {
    name: '',
    email: '',
    imageUrl: null,
    role: '',
    status: '',
  };

  const ROLE_OPTIONS = [
    { value: 'OWNER', label: 'เจ้าของระบบ', disabled: true },
    { value: 'ADMIN', label: 'ผู้จัดการ' },
    { value: 'FINANCIAL', label: 'นักบัญชี' },
  ];

  const methods = useForm<UpdateUserSchemaType>({
    mode: 'all',
    resolver: zodResolver(UpdateUserSchema),
    defaultValues,
    values: currentUser,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast.success('Update success!');
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            sx={{
              pt: 10,
              pb: 5,
              px: 3,
              textAlign: 'center',
            }}
          >
            <Field.UploadAvatar
              name="photoURL"
              maxSize={3145728}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 3,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.disabled',
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of {fData(3145728)}
                </Typography>
              }
            />

            <Field.Switch
              name="isPublic"
              labelPlacement="start"
              label="Public profile"
              sx={{ mt: 5 }}
            />

            <Button variant="soft" color="error" sx={{ mt: 3 }}>
              Delete user
            </Button>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                rowGap: 3,
                columnGap: 2,
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <Field.Text name="name" label="ชื่อ - นามสกุล*" />
              <Field.Text name="email" label="อีเมล*" />
              <Field.Select name="role" label="บทบาท (Role)*">
                <MenuItem value="">None</MenuItem>
                <Divider sx={{ borderStyle: 'dashed' }} />
                {ROLE_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.label} disabled={option.disabled}>
                    {option.label}
                  </MenuItem>
                ))}
              </Field.Select>
            </Box>

            <Stack spacing={3} sx={{ mt: 3, alignItems: 'flex-end' }}>
              <Field.Text name="about" multiline rows={4} label="About" />

              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Save changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}
