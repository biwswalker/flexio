import { z as zod } from 'zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Stack } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export type NewTransactionSchemaType = zod.infer<typeof NewTransactionSchema>;

export const NewTransactionSchema = zod.object({
  transactionType: zod.string({ message: 'ระบุประเภทธุรกรรม' }),
  companyId: zod.string({ message: 'ระบุชื่อบริษัท' }),
  transactionDate: schemaHelper.date({ message: { required: 'ระบุวันที่ทำรายการ' } }),
  projectId: zod.string(),
  paymentMethod: zod.string(),
  transactionCategory: zod.string(),
  accountId: zod.string({ message: 'ระบุบัญชี' }),
  amount: zod.number({ message: 'ระบุยอดเงิน' }),
  description: zod.string({ message: 'หมายเหตุ' }),
  evidenceImageUrl: schemaHelper.file(),
});
// .refine((data) => !fIsAfter(data.createDate, data.dueDate), {
//   message: 'Due date cannot be earlier than create date!',
//   path: ['dueDate'],
// });

// ----------------------------------------------------------------------

type Props = {
  transaction?: Transaction;
};

export function TransactionNewEditForm({ transaction }: Props) {
  const router = useRouter();

  const defaultValues: NewTransactionSchemaType = {
    transactionType: '',
    companyId: '',
    transactionDate: '',
    projectId: '',
    paymentMethod: '',
    transactionCategory: '',
    accountId: '',
    amount: 0,
    description: '',
    evidenceImageUrl: '',
  };

  const currentValues = useMemo<NewTransactionSchemaType>(
    () => ({
      transactionType: transaction?.transactionType || '',
      companyId: transaction?.companyId || '',
      transactionDate: transaction?.transactionDate || '',
      projectId: transaction?.projectId || '',
      paymentMethod: transaction?.paymentMethod || '',
      transactionCategory: transaction?.transactionCategory || '',
      accountId: transaction?.accountId || '',
      amount: transaction?.amount || 0,
      description: transaction?.description || '',
      evidenceImageUrl: transaction?.evidenceImageUrl || '',
    }),
    [transaction]
  );

  const methods = useForm<NewTransactionSchemaType>({
    mode: 'all',
    resolver: zodResolver(NewTransactionSchema),
    defaultValues,
    values: currentValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      toast.success(transaction ? 'Update success!' : 'Create success!');
      router.push(paths.management.incomeExpense.transactions);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
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
            {!transaction ? 'สร้างบริษัท' : 'เปลี่ยนแปลงรายละเอียด'}
          </LoadingButton>
        </Stack>
      </Card>
    </Form>
  );
}
