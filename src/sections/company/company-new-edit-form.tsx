import { z as zod } from 'zod';
import { kebabCase } from 'change-case';
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

import { createCompany } from 'src/services/company';

import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

export type NewCompanySchemaType = zod.infer<typeof NewCompanySchema>;

export const NewCompanySchema = zod.object({
  imageUrl: zod.custom<File | string | null>(),
  name: zod.string().min(1, { message: 'กรุณากรอกชื่อบริษัท' }),
  shortName: zod.string().min(4, { message: 'กรุณากรอกชื่อย่อขั้นต่ำ 4 ตัวอักษร' }),
  address: zod.string(),
  subDistrict: zod.string(),
  district: zod.string(),
  province: zod.string(),
  postcode: zod.string(),
  phone: schemaHelper.phoneNumberNoRequire({
    message: {
      invalid_type: 'กรุณากรอกเบอร์โทรศัพท์ที่ถูกต้อง',
    },
  }),
  email: zod
    .string()
    .optional()
    .refine((val) => !val || zod.string().email().safeParse(val).success, {
      message: 'กรุณากรอกอีเมลให้ถูกต้อง',
    }),
});

// ----------------------------------------------------------------------

type Props = {
  company?: Company;
};

export function NewCompanyForm({ company }: Props) {
  const router = useRouter();
  const { checkUserSession } = useAuthContext();

  const defaultValues: NewCompanySchemaType = {
    imageUrl: null,
    name: company?.name || '',
    shortName: company?.shortName || '',
    address: company?.address || '',
    subDistrict: company?.subDistrict || '',
    district: company?.district || '',
    province: company?.province || '',
    postcode: company?.postcode || '',
    phone: company?.phone || '',
    email: company?.email || '',
  };

  const methods = useForm<NewCompanySchemaType>({
    mode: 'onSubmit',
    resolver: zodResolver(NewCompanySchema),
    defaultValues,
    values: company,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createCompany({
        name: data.name,
        shortName: data.shortName,
        address: data.address,
        subDistrict: data.subDistrict,
        district: data.district,
        province: data.province,
        postcode: data.postcode,
        phone: data.phone,
        email: data.email,
        imageUrl: data.imageUrl,
      });
      await checkUserSession?.();
      reset();
      router.push(paths.management.companies.detail(data.shortName));
      toast.success(company ? 'บันทึกข้อมูลบริษัทสำเร็จ!' : 'บันทึกข้อมูลบริษัทสำเร็จ!');
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        toast.error(error.message || 'ไม่สามารถเพิ่มบริษัทได้');
        return;
      }
      toast.error('ไม่สามารถเพิ่มบริษัทได้');
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
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
              <Field.Text
                name="name"
                label="บริษัท*"
                onChange={(event) => {
                  const _value = event.target.value;
                  setValue('name', _value);
                  const _shortName = kebabCase(_value.trim());
                  setValue('shortName', _shortName);
                }}
              />
              <Field.Text
                name="shortName"
                label="ชื่อย่อ*"
                onBlur={(event) => {
                  const _value = event.target.value;
                  const _shortnName = _value.trim().replace(/\s+/g, '-').replace(/-+/g, '-');
                  setValue('shortName', _shortnName);
                }}
              />
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
