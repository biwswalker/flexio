import { useBoolean, usePopover } from 'minimal-shared/hooks';

import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { RouterLink } from 'src/routes/components';

import { fCurrency } from 'src/utils/format-number';
import { fDate, fTime } from 'src/utils/format-time';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomPopover } from 'src/components/custom-popover';

import { getPaymentMethodText, getTransactionTypeText } from './constants';

// ----------------------------------------------------------------------

type Props = {
  row: Transaction;
  selected: boolean;
  editHref: string;
  detailsHref: string;
  onSelectRow: () => void;
  onDeleteRow: () => void;
};

export function TransactionTableRow({
  row,
  selected,
  editHref,
  onSelectRow,
  onDeleteRow,
  detailsHref,
}: Props) {
  const menuActions = usePopover();
  const confirmDialog = useBoolean();

  const renderMenuActions = () => (
    <CustomPopover
      open={menuActions.open}
      anchorEl={menuActions.anchorEl}
      onClose={menuActions.onClose}
      slotProps={{ arrow: { placement: 'right-top' } }}
    >
      <MenuList>
        <li>
          <MenuItem component={RouterLink} href={detailsHref} onClick={menuActions.onClose}>
            <Iconify icon="solar:eye-bold" />
            View
          </MenuItem>
        </li>

        <li>
          <MenuItem component={RouterLink} href={editHref} onClick={menuActions.onClose}>
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>
        </li>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={() => {
            confirmDialog.onTrue();
            menuActions.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </MenuList>
    </CustomPopover>
  );

  const renderConfirmDialog = () => (
    <ConfirmDialog
      open={confirmDialog.value}
      onClose={confirmDialog.onFalse}
      title="Delete"
      content="Are you sure want to delete?"
      action={
        <Button variant="contained" color="error" onClick={onDeleteRow}>
          Delete
        </Button>
      }
    />
  );

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox
            checked={selected}
            onClick={onSelectRow}
            slotProps={{ input: { id: `${row.id}-checkbox`, 'aria-label': `${row.id} checkbox` } }}
          />
        </TableCell>

        <TableCell>
          <ListItemText
            primary={row.txId}
            slotProps={{ primary: { noWrap: true, sx: { typography: 'body2' } } }}
          />
        </TableCell>

        <TableCell>
          <ListItemText
            primary={fDate(row.transactionDate)}
            secondary={fTime(row.transactionDate)}
            slotProps={{
              primary: { noWrap: true, sx: { typography: 'body2' } },
              secondary: { sx: { mt: 0.5, typography: 'caption' } },
            }}
          />
        </TableCell>

        <TableCell>
          <ListItemText
            primary={getTransactionTypeText(row.transactionType) ?? '-'}
            slotProps={{
              primary: {
                noWrap: true,
                sx: {
                  typography: 'body2',
                  color: row.transactionType ? 'success.main' : 'error.main',
                },
              },
            }}
          />
        </TableCell>

        <TableCell>{row.transactionCategory}</TableCell>
        <TableCell>{getPaymentMethodText(row.paymentMethod) ?? '-'}</TableCell>
        <TableCell>{row.projectId}</TableCell>
        <TableCell>
          <ListItemText
            primary={row.accountId ?? '-'}
            secondary={row.accountId ?? '-'}
            slotProps={{
              primary: { noWrap: true, sx: { typography: 'body2' } },
              secondary: { sx: { mt: 0.5, typography: 'caption' } },
            }}
          />
        </TableCell>

        <TableCell align="center">{fCurrency(row.amount)}</TableCell>
        <TableCell align="center">{row.createdBy}</TableCell>

        {/* <TableCell>
          <Label
            variant="soft"
            color={
              (row.status === 'paid' && 'success') ||
              (row.status === 'pending' && 'warning') ||
              (row.status === 'overdue' && 'error') ||
              'default'
            }
          >
            {row.status}
          </Label>
        </TableCell> */}

        <TableCell align="right" sx={{ px: 1 }}>
          <IconButton color={menuActions.open ? 'inherit' : 'default'} onClick={menuActions.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      {renderMenuActions()}
      {renderConfirmDialog()}
    </>
  );
}
