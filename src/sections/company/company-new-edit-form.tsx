import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fData } from 'src/utils/format-number';

import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export type NewCompanySchemaType = zod.infer<typeof NewCompanySchema>;

export const NewCompanySchema = zod.object({
  imageUrl: schemaHelper.file({ message: 'กรุณาอัพโหดไฟล์' }),
  name: zod.string().min(1, { message: 'กรุณากรอกชื่อ-นามสกุล' }),
  shortName: zod.string().min(1, { message: 'กรุณากรอกชื่อสั้น' }),
  subDistrict: zod.string().min(1, { message: 'ระบุตำบล/แขวง' }),
  district: zod.string().min(1, { message: 'ระบุอำเภอ/เขต' }),
  province: zod.string().min(1, { message: 'ระบุจังหวัด' }),
  postcode: zod.string().min(1, { message: 'ระบุรหัสไปรษณีย์' }),
  phone: schemaHelper.phoneNumber({
    message: {
      required: 'กรุณากรอกเบอร์โทรศัพท์',
      invalid_type: 'กรุณากรอกเบอร์โทรศัพท์ที่ถูกต้อง',
    },
  }),
  email: zod
    .string()
    .min(1, { message: 'กรุณากรอกอีเมล!' })
    .email({ message: 'กรุณากรอกอีเมลให้ถูกต้อง' }),
});

// ----------------------------------------------------------------------

type Props = {
  company?: Company;
};

export function NewCompanyForm({ company }: Props) {
  const router = useRouter();

  // const ROLE_OPTIONS = [
  //   { value: 'OWNER', label: 'เจ้าของระบบ', disabled: true },
  //   { value: 'ADMIN', label: 'ผู้จัดการ' },
  //   { value: 'FINANCIAL', label: 'นักบัญชี' },
  // ];

  const defaultValues: NewCompanySchemaType = {
    imageUrl: '',
    name: '',
    shortName: '',
    subDistrict: '',
    district: '',
    province: '',
    postcode: '',
    phone: '',
    email: '',
  };

  const methods = useForm<NewCompanySchemaType>({
    mode: 'onSubmit',
    resolver: zodResolver(NewCompanySchema),
    defaultValues,
    values: company,
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
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      toast.success(company ? 'Update success!' : 'Create success!');
      router.push(paths.management.companies.detail(company?.id || ''));
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            <Box sx={{ mb: 5 }}>
              <Field.UploadAvatar
                name="avatarUrl"
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
            </Box>

            {company && (
              <Stack sx={{ mt: 3, alignItems: 'center', justifyContent: 'center' }}>
                <Button variant="soft" color="error">
                  ลบบริษัท
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
              <Field.Text name="name" label="บริษัท*" />
              <Field.Text name="email" label="อีเมล" />
              <Field.Text name="phone" label="เบอร์ติดต่อ" />
              {/* <Field.Select name="role" label="บทบาท (Role)*">
                <MenuItem value="">None</MenuItem>
                <Divider sx={{ borderStyle: 'dashed' }} />
                {ROLE_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.label} disabled={option.disabled}>
                    {option.label}
                  </MenuItem>
                ))}
              </Field.Select> */}
            </Box>

            <Stack sx={{ mt: 3, alignItems: 'flex-end' }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!company ? 'สร้างบริษัท' : 'เปลี่ยนแปลงรายละเอียด'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}
