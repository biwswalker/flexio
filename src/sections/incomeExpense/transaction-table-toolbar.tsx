import type { SelectChangeEvent } from '@mui/material/Select';
import type { UseSetStateReturn } from 'minimal-shared/hooks';

import { useCallback } from 'react';
import { usePopover } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { formHelperTextClasses } from '@mui/material/FormHelperText';

import { getBankName, PAYMENT_METHOD_OPTIONS } from 'src/constants/account';

import { Iconify } from 'src/components/iconify';
import { CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------
type Props = {
  dateError: boolean;
  onResetPage: () => void;
  filters: UseSetStateReturn<FilterTransaction>;
  options: {
    projects: Project[];
    categories: TransactionCategory[];
    accounts: Account[];
    users: User[];
  };
};

export function TransactionTableToolbar({ filters, options, dateError, onResetPage }: Props) {
  const menuActions = usePopover();

  const { state: currentFilters, setState: updateFilters } = filters;

  const handleFilterTxId = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onResetPage();
      updateFilters({ txId: event.target.value });
    },
    [onResetPage, updateFilters]
  );

  const handleFilterCategory = useCallback(
    (event: SelectChangeEvent<string[]>) => {
      const newValue =
        typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value;

      onResetPage();
      updateFilters({ categories: newValue });
    },
    [onResetPage, updateFilters]
  );

  const handleFilterPaymentMethod = useCallback(
    (event: SelectChangeEvent<string[]>) => {
      const newValue =
        typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value;

      onResetPage();
      updateFilters({ paymentMethods: newValue });
    },
    [onResetPage, updateFilters]
  );

  const handleFilterAccount = useCallback(
    (event: SelectChangeEvent<string[]>) => {
      const newValue =
        typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value;

      onResetPage();
      updateFilters({ accountIds: newValue });
    },
    [onResetPage, updateFilters]
  );

  const handleFilterProject = useCallback(
    (event: SelectChangeEvent<string[]>) => {
      const newValue =
        typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value;

      onResetPage();
      updateFilters({ projectIds: newValue });
    },
    [onResetPage, updateFilters]
  );

  const handleFilterUser = useCallback(
    (event: SelectChangeEvent<string[]>) => {
      const newValue =
        typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value;

      onResetPage();
      updateFilters({ userIds: newValue });
    },
    [onResetPage, updateFilters]
  );

  const handleFilterStartDate = useCallback(
    (newValue: IDatePickerControl) => {
      onResetPage();
      updateFilters({ txStartDate: newValue });
    },
    [onResetPage, updateFilters]
  );

  const handleFilterEndDate = useCallback(
    (newValue: IDatePickerControl) => {
      onResetPage();
      updateFilters({ txEndDate: newValue });
    },
    [onResetPage, updateFilters]
  );

  const renderMenuActions = () => (
    <CustomPopover
      open={menuActions.open}
      anchorEl={menuActions.anchorEl}
      onClose={menuActions.onClose}
      slotProps={{ arrow: { placement: 'right-top' } }}
    >
      <MenuList>
        <MenuItem onClick={() => menuActions.onClose()}>
          <Iconify icon="solar:printer-minimalistic-bold" />
          Print
        </MenuItem>

        <MenuItem onClick={() => menuActions.onClose()}>
          <Iconify icon="solar:import-bold" />
          Import
        </MenuItem>

        <MenuItem onClick={() => menuActions.onClose()}>
          <Iconify icon="solar:export-bold" />
          Export
        </MenuItem>
      </MenuList>
    </CustomPopover>
  );

  return (
    <>
      {/* Line 1 */}
      <Box
        sx={{
          p: 2.5,
          pb: 0,
          gap: 2,
          display: 'flex',
          pr: { xs: 2.5, md: 1 },
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-end', md: 'center' },
        }}
      >
        <TextField
          fullWidth
          value={currentFilters.txId}
          onChange={handleFilterTxId}
          placeholder="ค้นหาหมายเลข..."
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            },
          }}
        />
        <FormControl sx={{ flexShrink: 0, width: { xs: 1, md: 180 } }}>
          <InputLabel htmlFor="filter-service-select">หมวดหมู่</InputLabel>

          <Select
            multiple
            value={currentFilters.categories}
            onChange={handleFilterCategory}
            input={<OutlinedInput label="หมวดหมู่" />}
            renderValue={(selected = []) =>
              selected?.reduce((prev, current) => {
                const _category = options.categories.find(({ id }) => id === current);
                return _category ? `${prev}${prev ? ', ' : ''}${_category.name}` : prev;
              }, '')
            }
            inputProps={{ id: 'filter-service-select' }}
            sx={{ textTransform: 'capitalize' }}
          >
            {options.categories.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                <Checkbox
                  disableRipple
                  size="small"
                  checked={currentFilters.categories?.includes(option.id)}
                  slotProps={{
                    input: { id: `${option.id}-checkbox`, 'aria-label': `${option.id} checkbox` },
                  }}
                />
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ flexShrink: 0, width: { xs: 1, md: 180 } }}>
          <InputLabel htmlFor="filter-service-select">วิธีการชำระ</InputLabel>

          <Select
            multiple
            value={currentFilters.paymentMethods}
            onChange={handleFilterPaymentMethod}
            input={<OutlinedInput label="วิธีการชำระ" />}
            renderValue={(selected = []) =>
              selected?.reduce((prev, current) => {
                const account = PAYMENT_METHOD_OPTIONS.find(({ value }) => value === current);
                return account ? `${prev}${prev ? ', ' : ''}${account.label}` : prev;
              }, '')
            }
            inputProps={{ id: 'filter-service-select' }}
            sx={{ textTransform: 'capitalize' }}
          >
            {PAYMENT_METHOD_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                <Checkbox
                  disableRipple
                  size="small"
                  checked={currentFilters.paymentMethods?.includes(option.value)}
                  slotProps={{
                    input: {
                      id: `${option.value}-checkbox`,
                      'aria-label': `${option.value} checkbox`,
                    },
                  }}
                />
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ flexShrink: 0, width: { xs: 1, md: 180 } }}>
          <InputLabel htmlFor="filter-service-select">บัญชี</InputLabel>
          <Select
            multiple
            value={currentFilters.accountIds}
            onChange={handleFilterAccount}
            input={<OutlinedInput label="บัญชี" />}
            renderValue={(selected = []) =>
              selected?.reduce((prev, current) => {
                const account = options.accounts.find(({ id }) => id === current);
                return account
                  ? `${prev}${prev ? ', ' : ''}${getBankName(account.bank, true)}: ${account.bankName}`
                  : prev;
              }, '')
            }
            inputProps={{ id: 'filter-service-select' }}
            sx={{ textTransform: 'capitalize' }}
          >
            {options.accounts.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                <Checkbox
                  disableRipple
                  size="small"
                  checked={currentFilters.accountIds?.includes(option.id)}
                  slotProps={{
                    input: { id: `${option.id}-checkbox`, 'aria-label': `${option.bank} checkbox` },
                  }}
                />
                {getBankName(option.bank, true)}: {option.bankName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {/* Line 2 */}
      <Box
        sx={{
          p: 2.5,
          gap: 2,
          display: 'flex',
          pr: { xs: 2.5, md: 1 },
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-end', md: 'center' },
        }}
      >
        <FormControl sx={{ flexShrink: 0, width: { xs: 1, md: 180 } }}>
          <InputLabel htmlFor="filter-service-select">โครงการ</InputLabel>

          <Select
            multiple
            value={currentFilters.projectIds}
            onChange={handleFilterProject}
            input={<OutlinedInput label="โครงการ" />}
            renderValue={(selected) => selected.map((value) => value).join(', ')}
            inputProps={{ id: 'filter-service-select' }}
            sx={{ textTransform: 'capitalize' }}
          >
            {options.projects.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                <Checkbox
                  disableRipple
                  size="small"
                  checked={currentFilters.projectIds?.includes(option.id)}
                  slotProps={{
                    input: { id: `${option.id}-checkbox`, 'aria-label': `${option.id} checkbox` },
                  }}
                />
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ flexShrink: 0, width: { xs: 1, md: 180 } }}>
          <InputLabel htmlFor="filter-service-select">ผู้สร้างข้อมูล</InputLabel>

          <Select
            multiple
            value={currentFilters.userIds}
            onChange={handleFilterUser}
            input={<OutlinedInput label="ผู้สร้างข้อมูล" />}
            renderValue={(selected) => selected.map((value) => value).join(', ')}
            inputProps={{ id: 'filter-service-select' }}
            sx={{ textTransform: 'capitalize' }}
          >
            {options.users.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                <Checkbox
                  disableRipple
                  size="small"
                  checked={currentFilters.userIds?.includes(option.id)}
                  slotProps={{
                    input: { id: `${option.id}-checkbox`, 'aria-label': `${option.id} checkbox` },
                  }}
                />
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <DatePicker
          label="วันที่เริ่มต้นธุรกรรม"
          value={currentFilters.txStartDate}
          onChange={handleFilterStartDate}
          slotProps={{ textField: { fullWidth: true } }}
          // sx={{ maxWidth: { md: 180 } }}
        />

        <DatePicker
          label="วันที่สิ้นสุดธุรกรรม"
          value={currentFilters.txEndDate}
          onChange={handleFilterEndDate}
          slotProps={{
            textField: {
              fullWidth: true,
              error: dateError,
              helperText: dateError
                ? 'วันที่สิ้นสุดธุรกรรม ต้องมากกว่าวันที่เริ่มต้นธุรกรรม'
                : null,
            },
          }}
          sx={{
            // maxWidth: { md: 180 },
            [`& .${formHelperTextClasses.root}`]: {
              bottom: { md: -40 },
              position: { md: 'absolute' },
            },
          }}
        />
      </Box>

      {renderMenuActions()}
    </>
  );
}
