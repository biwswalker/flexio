import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Stack,
  Dialog,
  Button,
  Divider,
  MenuItem,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import { addAccounts } from 'src/services/account';
import { BANK_PROVIDER, ACCOUNT_STATUS_OPTIONS } from 'src/constants/account';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------
export type NewBankSchemaType = zod.infer<typeof NewBankSchema>;

export const NewBankSchema = zod.object({
  status: zod.enum(['ACTIVE', 'INACTIVE'], { message: 'ระบุสถานะ' }),
  bank: zod.string().min(1, { message: 'ระบุธนาคาร' }),
  bankName: zod.string().min(1, { message: 'ระบุชื่อธนาคาร' }),
  bankNumber: zod.preprocess(
    (pre) => String(pre),
    zod.string().min(1, { message: 'ระบุเลขบัญชีธนาคาร' })
  ),
  // bankNumber: zod.string().min(1, { message: 'ระบุเลขบัญชีธนาคาร' }),
  bankBranch: zod.string().nullable(),
  company: zod.string().nullable(),
});

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  company: Company;
  onClose: () => void;
  onComplete: () => void;
  account?: Account;
};

export function BankNewEditForm({ account, open, company, onClose, onComplete }: Props) {
  const defaultValues: NewBankSchemaType = {
    company: company.name || '',
    status: account?.status || 'ACTIVE',
    bank: account?.bank || '',
    bankName: account?.bankName || '',
    bankNumber: account?.bankNumber || '',
    bankBranch: account?.bankBranch || null,
  };

  const methods = useForm<NewBankSchemaType>({
    mode: 'all',
    resolver: zodResolver(NewBankSchema),
    defaultValues,
    values: defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (company) {
        await addAccounts({
          companyId: company.id,
          bank: data.bank ?? '',
          bankName: data.bankName ?? '',
          bankNumber: data.bankNumber ?? '',
          bankBranch: data.bankBranch ?? '',
          status: data.status ?? '',
        });
        reset();
        onComplete();
        toast.success('บันทึกบัญชีสำเร็จ!');
      } else {
        toast.error('ไม่พบข้อมูลบัญชี');
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || 'ไม่พบข้อมูลบัญชี');
        return;
      }
      toast.error('ไม่พบข้อมูลบัญชี');
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
      <DialogTitle>{!account ? 'เพิ่ม' : 'แก้ไข'}บัญชีธนาคาร</DialogTitle>
      <Form methods={methods} onSubmit={onSubmit}>
        <DialogContent>
          <Box
            sx={{
              py: 1,
              rowGap: 3,
              columnGap: 2,
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
            }}
          >
            {/* Line 1 */}
            <Box
              sx={{
                rowGap: 3,
                columnGap: 2,
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <Field.Text
                name="company"
                label="บริษัท"
                disabled
                slotProps={{ inputLabel: { shrink: true } }}
              />
              <Stack sx={{ flexGrow: 1 }} />
            </Box>

            {/* Line 2 */}
            <Box
              sx={{
                rowGap: 3,
                columnGap: 2,
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <Field.Select name="status" label="สถานะ*">
                <MenuItem value="" disabled>
                  ระบุสถานะ
                </MenuItem>
                <Divider sx={{ borderStyle: 'dashed' }} />
                {ACCOUNT_STATUS_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Field.Select>
              <Stack sx={{ flexGrow: 1 }} />
            </Box>

            {/* Line 4 */}
            <Box
              sx={{
                rowGap: 3,
                columnGap: 2,
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <Field.Select name="bank" label="ธนาคาร*">
                <MenuItem value="" disabled>
                  ระบุธนาคาร
                </MenuItem>
                <Divider sx={{ borderStyle: 'dashed' }} />
                {BANK_PROVIDER.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Field.Select>
              <Field.Text name="bankBranch" label="สาขา" />
            </Box>

            {/* Line 5 */}
            <Field.Text
              name="bankNumber"
              label="หมายเลขบัญชีธนาคาร*"
              type="text"
              inputMode="numeric"
            />
            <Field.Text name="bankName" label="ชื่อบัญชี*" />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            ยกเลิก
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            {!account ? 'เพิ่มรายรับ/รายจ่าย' : 'แก้ไขรายรับ/รายจ่าย'}
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
