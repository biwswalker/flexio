import { z as zod } from 'zod';
import { includes } from 'es-toolkit/compat';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import { MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fData } from 'src/utils/format-number';

import { createUser } from 'src/services/user';
import { USER_ROLE, getUserRoleName } from 'src/constants/user';

import { Label } from 'src/components/label';
import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

export type NewUserSchemaType = zod.infer<typeof NewUserSchema>;

export const NewUserSchema = zod.object({
  imageUrl: zod.custom<File | string | null>(),
  name: zod.string().min(1, { message: 'กรุณากรอกชื่อ-นามสกุล' }),
  email: zod
    .string()
    .min(1, { message: 'กรุณากรอกอีเมล!' })
    .email({ message: 'กรุณากรอกอีเมลให้ถูกต้อง' }),
  role: zod.string().min(1, { message: 'กรุณาเลือกบทบาท' }),
  status: zod.string().min(1, { message: 'ระบุสถานะ' }),
  companyIds: zod.string().array().min(1, { message: 'ระบุบริษัทสังกัด' }),
  password: zod.string().min(1, { message: 'ระบุรหัสผ่าน' }),
});

// ----------------------------------------------------------------------

type Props = {
  currentUser?: User;
};

export function UserNewEditForm({ currentUser }: Props) {
  const router = useRouter();
  const { companies } = useAuthContext();

  const defaultValues: NewUserSchemaType = {
    imageUrl: null,
    name: currentUser?.name ?? '',
    email: currentUser?.email ?? '',
    role: currentUser?.role ?? 'FINANCIAL',
    status: currentUser?.status ?? 'ACTIVE',
    companyIds: [],
    password: '',
    // companyIds: currentUser?.companies?.map(({ id }) => id) ?? [],
  };

  const methods = useForm<NewUserSchemaType>({
    mode: 'onSubmit',
    resolver: zodResolver(NewUserSchema),
    defaultValues,
    values: defaultValues,
  });

  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createUser({
        companyIds: data.companyIds,
        email: data.email,
        name: data.name,
        password: data.password,
        role: data.role as TRole,
        profileImage: data.imageUrl ?? undefined,
      });
      reset();
      router.push(paths.user.root);
      toast.success('บันทึกรายรับ/รายจ่ายสำเร็จ!');
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        toast.error(error.message || 'ไม่สามารถเพิ่มผู้ใช้ได้');
        return;
      }
      toast.error('ไม่สามารถเพิ่มผู้ใช้ได้');
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            {currentUser && (
              <Label
                color={
                  (values.status === 'active' && 'success') ||
                  (values.status === 'banned' && 'error') ||
                  'warning'
                }
                sx={{ position: 'absolute', top: 24, right: 24 }}
              >
                {values.status}
              </Label>
            )}

            <Box sx={{ mb: 5 }}>
              <Field.UploadAvatar
                name="imageUrl"
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
                    เฉพาะ *.jpeg, *.jpg, *.png, *.gif
                    <br /> ขนาดสูงสุด {fData(3145728)}
                  </Typography>
                }
              />
            </Box>

            {currentUser && (
              <FormControlLabel
                labelPlacement="start"
                control={
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        {...field}
                        checked={field.value !== 'active'}
                        onChange={(event) =>
                          field.onChange(event.target.checked ? 'banned' : 'active')
                        }
                      />
                    )}
                  />
                }
                label={
                  <>
                    <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                      ระงับการใช้งาน
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Apply disable account
                    </Typography>
                  </>
                }
                sx={{
                  mx: 0,
                  mb: 3,
                  width: 1,
                  justifyContent: 'space-between',
                }}
              />
            )}

            {/* <Field.Switch
              name="isVerified"
              labelPlacement="start"
              label={
                <>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Email verified
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Disabling this will automatically send the user a verification email
                  </Typography>
                </>
              }
              sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
            /> */}

            {currentUser && (
              <Stack sx={{ mt: 3, alignItems: 'center', justifyContent: 'center' }}>
                <Button variant="soft" color="error">
                  ลบผู้่ใช้
                </Button>
              </Stack>
            )}
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
              <Field.MultiSelect
                checkbox
                name="companyIds"
                label="บริษัทสังกัด*"
                disabled={currentUser?.role === 'OWNER'}
                options={companies.map((company) => ({
                  value: company.id,
                  label: company.name,
                }))}
                shouldDisableItem={(value) =>
                  !includes(
                    companies.map(({ id }) => id),
                    value
                  )
                }
              />
              <Box sx={{ display: { xs: 'none', sm: 'block' } }} />
              <Field.Select
                name="role"
                label="บทบาท (Role)*"
                disabled={currentUser?.role === 'OWNER'}
              >
                {USER_ROLE.map((role) => (
                  <MenuItem key={role} value={role} disabled={role === 'OWNER'}>
                    {getUserRoleName(role)}
                  </MenuItem>
                ))}
              </Field.Select>
              <Field.Text name="name" label="ชื่อ - นามสกุล*" />
              <Field.Text name="email" label="อีเมล*" />
              <Field.Text name="password" label="รหัสผ่าน*" type="password" />
              {/* <Field.Text name="password" label="รหัสผ่าน (ระบบสร้างให้อัตโนมัติ)" disabled /> */}
            </Box>

            <Stack sx={{ mt: 3, alignItems: 'flex-end' }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!currentUser ? 'สร้างผู้ใช้' : 'บันทึกผู้ใช้'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}
