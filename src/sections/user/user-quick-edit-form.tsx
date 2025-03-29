import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { includes } from 'es-toolkit/compat';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { USER_ROLE, getUserRoleName, USER_STATUS_OPTIONS } from 'src/constants/user';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

export type UserQuickEditSchemaType = zod.infer<typeof UserQuickEditSchema>;

export const UserQuickEditSchema = zod.object({
  name: zod.string().min(1, { message: 'ระบุชื่อ - นามสกุล' }),
  email: zod.string().min(1, { message: 'ระบุอีเมล' }).email({ message: 'ระบุอีเมลให้ถูกต้อง' }),
  role: zod.string().min(1, { message: 'ระบุบทบาท (Role)' }),
  status: zod.string().min(1, { message: 'ระบุสถานะ' }),
  companyIds: zod.string().array().min(1, { message: 'ระบุบริษัทสังกัด' }),
});
// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: () => void;
  currentUser?: UserResponse;
};

export function UserQuickEditForm({ currentUser, open, onClose }: Props) {
  const { companies } = useAuthContext();
  const defaultValues: UserQuickEditSchemaType = {
    name: currentUser?.name ?? '',
    email: currentUser?.email ?? '',
    role: currentUser?.role ?? 'FINANCIAL',
    status: currentUser?.status ?? 'ACTIVE',
    companyIds: currentUser?.companies?.map(({ id }) => id) ?? [],
  };

  const methods = useForm<UserQuickEditSchemaType>({
    mode: 'all',
    resolver: zodResolver(UserQuickEditSchema),
    defaultValues,
    values: defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const promise = new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      reset();
      onClose();

      toast.promise(promise, {
        loading: 'Loading...',
        success: 'Update success!',
        error: 'Update error!',
      });

      await promise;

      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      slotProps={{ paper: { sx: { maxWidth: 720 } } }}
    >
      <DialogTitle>แก้ไขข้อมูลผู้ใช้</DialogTitle>

      <Form methods={methods} onSubmit={onSubmit}>
        <DialogContent>
          {/* <Alert variant="outlined" severity="info" sx={{ mb: 3 }}>
            Account is waiting for confirmation
          </Alert> */}

          <Box
            sx={{
              py: 1,
              rowGap: 3,
              columnGap: 2,
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
            }}
          >
            {/* <Field.Text name="company" label="Company" disabled /> */}
            <Field.MultiSelect
              checkbox
              name="companyIds"
              label="บริษัทสังกัด"
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

            <Field.Select name="status" label="สถานะ*" disabled={currentUser?.role === 'OWNER'}>
              {USER_STATUS_OPTIONS.map((status) => (
                <MenuItem key={status.value} value={status.value}>
                  {status.label}
                </MenuItem>
              ))}
            </Field.Select>
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

            <Field.Text name="name" label="ชื่อ - นามสกุล" />
            <Field.Text name="email" label="อีเมล" />
            {/* <Field.Phone name="phoneNumber" label="Phone number" /> */}

            {/* <Field.CountrySelect
              fullWidth
              name="country"
              label="Country"
              placeholder="Choose a country"
            /> */}

            {/* <Field.Text name="state" label="State/region" />
            <Field.Text name="city" label="City" />
            <Field.Text name="address" label="Address" />
            <Field.Text name="zipCode" label="Zip/code" /> */}
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            ยกเลิก
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            บันทึกข้อมูล
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
