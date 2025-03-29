import dayjs from 'dayjs';
import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useMemo, useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Stack,
  Dialog,
  Button,
  Divider,
  MenuItem,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { MAX_FILE_UPLOAD } from 'src/constants/file';
import { addTransaction } from 'src/services/transaction';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

import { useAuthContext } from 'src/auth/hooks';

import { getBankName, PAYMENT_METHOD_OPTIONS, TRANSACTION_TYPE_OPTIONS } from './constants';

// ----------------------------------------------------------------------
export type NewTransactionSchemaType = zod.infer<typeof NewTransactionSchema>;

export const NewTransactionSchema = zod.object({
  transactionType: zod
    .string({ message: 'ระบุประเภทธุรกรรม' })
    .min(1, { message: 'ระบุประเภทธุรกรรม' }),
  company: zod.string(),
  transactionDate: schemaHelper.date({
    message: { required: 'ระบุวันที่ทำรายการ', invalid_type: 'วันที่ไม่ถูกต้อง' },
  }),
  projectId: zod.string(),
  paymentMethod: zod.string().min(1, { message: 'ระบุวิธีการชำระ' }),
  transactionCategory: zod.string(),
  accountId: zod.string({ message: 'ระบุบัญชี' }).min(1, { message: 'ระบุบัญชี' }),
  amount: schemaHelper.nullableInput(
    zod.number({ coerce: true }).min(1, { message: 'ระบุยอดเงิน' }),
    { message: 'ระบุยอดเงิน' }
  ),
  description: zod.string(),
  evidenceImageUrl: zod.custom<File | string | null>(),
});
// .refine((data) => !fIsAfter(data.createDate, data.dueDate), {
//   message: 'Due date cannot be earlier than create date!',
//   path: ['dueDate'],
// });

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: () => void;
  transaction?: Transaction;
  projects: Project[];
  categories: any[];
  accounts: Account[];
};

export function TransactionNewEditForm({ transaction, open, onClose, accounts = [] }: Props) {
  const router = useRouter();
  const { company } = useAuthContext();

  const defaultValues: NewTransactionSchemaType = {
    company: company?.name || '',
    transactionType: 'INCOME',
    transactionDate: dayjs().format(),
    projectId: '',
    paymentMethod: 'TRANSFER',
    transactionCategory: '',
    accountId: '',
    amount: null,
    description: '',
    evidenceImageUrl: '',
  };

  const currentValues = useMemo<NewTransactionSchemaType>(
    () => ({
      company: company?.name || '',
      transactionType: transaction?.transactionType || 'INCOME',
      transactionDate: transaction?.transactionDate || dayjs().format(),
      projectId: transaction?.projectId || '',
      paymentMethod: transaction?.paymentMethod || 'TRANSFER',
      transactionCategory: transaction?.transactionCategory || '',
      accountId: transaction?.accountId || '',
      amount: transaction?.amount || null,
      description: transaction?.description || '',
      evidenceImageUrl: transaction?.evidenceImageUrl || '',
    }),
    [transaction, company]
  );

  const methods = useForm<NewTransactionSchemaType>({
    mode: 'all',
    resolver: zodResolver(NewTransactionSchema),
    defaultValues,
    values: currentValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleOnDeleteFile = useCallback(() => {
    setValue('evidenceImageUrl', null, { shouldValidate: true });
  }, [setValue]);

  const handleOnUploadFile = useCallback(() => {
    console.log('handleOnUploadFile: ');
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (company) {
        await addTransaction({
          companyId: company.id,
          accountId: data.accountId,
          amount: data.amount || 0,
          transactionType: data.transactionType as TTransactionType,
          transactionDate: data.transactionDate ? dayjs(data.transactionDate).toISOString() : '',
          paymentMethod: data.paymentMethod as TPaymentMethod,
          projectId: data.projectId,
          description: data.description,
          transactionCategory: data.transactionCategory,
          evidenceImage: data.evidenceImageUrl ?? undefined,
        });
        reset();
        onClose();
        toast.success('บันทึกรายรับ/รายจ่ายสำเร็จ!');
      } else {
        toast.error('ไม่พบข้อมูลบริษัท');
      }
      router.push(paths.management.incomeExpense.transactions);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || 'ไม่พบข้อมูลบริษัท');
        return;
      }
      toast.error('ไม่พบข้อมูลบริษัท');
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
      <DialogTitle>เพิ่มรายการ รายรับ/รายจ่าย</DialogTitle>
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
            <Field.RadioGroup
              row
              name="transactionType"
              options={TRANSACTION_TYPE_OPTIONS}
              sx={{ gap: 4 }}
            />

            {/* Line 2 */}
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

            {/* Line 3 */}
            <Box
              sx={{
                rowGap: 3,
                columnGap: 2,
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <Field.DatePicker name="transactionDate" label="วันที่ทำรายการ*" />
              <Field.Autocomplete
                name="projectId"
                label="โครงการ"
                autoHighlight
                noOptionsText="ไม่พบโครงการ"
                options={[].map((option) => option)}
                getOptionLabel={(option) => option}
                renderOption={(props, option) => (
                  <li {...props} key={option}>
                    {option}
                  </li>
                )}
              />
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
              <Field.Select
                fullWidth
                name="paymentMethod"
                label="วิธีการชำระ*"
                slotProps={{ inputLabel: { shrink: true } }}
              >
                {PAYMENT_METHOD_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Field.Select>
              <Field.Autocomplete
                name="projectId"
                label="หมวดหมู่"
                autoHighlight
                noOptionsText="ไม่พบหมวดหมู่"
                options={[].map((option) => option)}
                getOptionLabel={(option) => option}
                renderOption={(props, option) => (
                  <li {...props} key={option}>
                    {option}
                  </li>
                )}
              />
            </Box>

            {/* Line 5 */}
            <Box
              sx={{
                rowGap: 3,
                columnGap: 2,
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <Field.Select name="accountId" label="บัญชี*">
                <MenuItem value="" disabled>
                  ระบุบัญชี
                </MenuItem>
                <Divider sx={{ borderStyle: 'dashed' }} />
                {accounts.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {getBankName(option.bank, true)}: {option.bankName}
                  </MenuItem>
                ))}
              </Field.Select>
              <Field.Text
                name="amount"
                label="ยอดเงิน*"
                placeholder="0.00"
                type="number"
                slotProps={{
                  inputLabel: { shrink: true },
                  input: {
                    startAdornment: (
                      <InputAdornment position="start" sx={{ mr: 0.75 }}>
                        <Box component="span" sx={{ color: 'text.disabled' }}>
                          ฿
                        </Box>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>

            {/* Line 6 */}
            <Field.Text name="transactionCategory" label="หมายเหตุ" multiline rows={3} />

            {/* Line 7 */}
            <Box
              sx={{
                rowGap: 3,
                columnGap: 2,
                display: 'grid',
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <Field.UploadBox
                thumbnail
                name="evidenceImageUrl"
                maxSize={MAX_FILE_UPLOAD}
                onDelete={handleOnDeleteFile}
                onUpload={handleOnUploadFile}
                placeholder={
                  <Stack spacing={0.5} sx={{ alignItems: 'center' }}>
                    <Iconify icon="eva:cloud-upload-fill" width={40} />
                    <Typography variant="body2">อัพโหลดหลักฐานยืนยัน</Typography>
                  </Stack>
                }
                sx={{ width: 1, py: 2.5, flexGrow: 1, height: 'auto' }}
              />
              <Stack sx={{ flexGrow: 1 }} />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            ยกเลิก
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            {!transaction ? 'เพิ่มรายรับ/รายจ่าย' : 'แก้ไขรายรับ/รายจ่าย'}
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
