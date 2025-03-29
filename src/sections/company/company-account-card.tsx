import { varAlpha } from 'minimal-shared/utils';
import { usePopover } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Stack, MenuItem, MenuList, IconButton } from '@mui/material';

import { bankLists } from 'src/constants/bank';
import { getBankName, getAccountStatusName, getAccountStatusColor } from 'src/constants/account';

import { Image } from 'src/components/image';
import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

type Props = {
  account: Account;
};

export function CompanyAccountCard({ account }: Props) {
  const menuActions = usePopover();
  const { status, bank, balance, bankBranch, bankNumber, bankName, companyId, updatedAt } = account;

  const _bank: Bank = bankLists[bank];

  if (!_bank) {
    return null;
  }

  const renderMenuActions = () => (
    <CustomPopover
      open={menuActions.open}
      anchorEl={menuActions.anchorEl}
      onClose={menuActions.onClose}
      slotProps={{ arrow: { placement: 'right-top' } }}
    >
      <MenuList>
        <li>
          <MenuItem onClick={() => menuActions.onClose()} disabled>
            <Iconify icon="solar:pen-bold" />
            แก้ไข
          </MenuItem>
        </li>

        <MenuItem
          disabled
          onClick={() => {
            // confirmDialog.onTrue();
            menuActions.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          ลบข้อมูล
        </MenuItem>
      </MenuList>
    </CustomPopover>
  );

  return (
    <>
      <Box
        sx={(theme) => ({
          py: 2.5,
          px: 2,
          display: 'flex',
          borderRadius: 1.5,
          flexDirection: 'row',
          border: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)}`,
        })}
      >
        <Stack sx={{ flex: 'flex', gap: 1, flexDirection: 'column', width: 1 }}>
          <Stack alignItems="flex-start">
            <Label variant="soft" color={getAccountStatusColor(status)}>
              {getAccountStatusName(status)}
            </Label>
          </Stack>
          <Stack direction="row" spacing={1.5} alignItems="flex-start">
            <Box sx={{ width: 32, height: 32 }}>
              <Image alt={_bank.name} src={_bank.icon} sx={{ height: 1, borderRadius: 1.5 }} />
            </Box>
            <Stack>
              <Typography variant="subtitle2">{bankNumber}</Typography>
              <Typography variant="caption">{bankName}</Typography>
              <Typography variant="caption" sx={{ color: _bank.color }}>
                {getBankName(bank)}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
          <IconButton color={menuActions.open ? 'inherit' : 'default'} onClick={menuActions.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </Box>
      </Box>
      {renderMenuActions()}
    </>
  );
}
