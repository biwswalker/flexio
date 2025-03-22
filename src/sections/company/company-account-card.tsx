import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';

import { Label } from 'src/components/label';

// ----------------------------------------------------------------------

type Props = {
  bank: string;
  accountNumber: string;
  accountName: string;
  status: string;
};

export function CompanyAccountCard({ bank, accountNumber, accountName, status }: Props) {
  return (
    <Box
      sx={(theme) => ({
        py: 2.5,
        px: 2,
        display: 'flex',
        borderRadius: 1.5,
        gap: 1,
        flexDirection: 'column',
        border: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)}`,
      })}
    >
      <Stack alignItems="flex-start">
        <Label variant="soft" color="info">
          ใช้งาน
        </Label>
      </Stack>
      <Stack>
        <Typography variant="subtitle2">{accountNumber}</Typography>
        <Typography variant="caption">{accountName}</Typography>
        <Typography variant="caption">{bank}</Typography>
      </Stack>
    </Box>
  );
}
