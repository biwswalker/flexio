'use client';

import type { TableHeadCellProps } from 'src/components/table';

import { isEqual } from 'es-toolkit';
import { varAlpha } from 'minimal-shared/utils';
import { useState, useEffect, useCallback } from 'react';
import { useBoolean, useSetState } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';

import { paths } from 'src/routes/paths';

import { getUsers } from 'src/services/user';
import { USER_ROLE, USER_STATUS_OPTIONS } from 'src/constants/user';

import { Label } from 'src/components/label';
import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import {
  useTable,
  emptyRows,
  rowInPage,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';

import { useAuthContext } from 'src/auth/hooks';

import { UserTableRow } from '../user-table-row';
import { UserTableToolbar } from '../user-table-toolbar';
import { UserTableFiltersResult } from '../user-table-filters-result';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [{ value: 'ALL', label: 'ทั้งหมด' }, ...USER_STATUS_OPTIONS];

const TABLE_HEAD: TableHeadCellProps[] = [
  { id: 'name', label: 'ชื่อ - นามสกุล' },
  { id: 'phoneNumber', label: 'อีเมล', width: 180 },
  { id: 'role', label: 'บทบาท (Role)', width: 220 },
  { id: 'status', label: 'สถานะ', width: 100 },
  { id: '', width: 88 },
];

// ----------------------------------------------------------------------
type Props = {
  companyId?: string;
};

export function UserTableView({ companyId }: Props) {
  const { user } = useAuthContext();
  const _companyId = companyId ?? ''; // get default from context
  const table = useTable();

  const confirmDialog = useBoolean();

  const [tableData, setTableData] = useState<UserResponse[]>([]);

  const filters = useSetState<FilterUser>({
    name: '',
    roles: [],
    status: 'ALL',
    companyIds: [_companyId],
  });
  const { state: currentFilters, setState: updateFilters } = filters;

  const dataInPage = rowInPage(tableData, table.page, table.rowsPerPage);

  const canReset =
    !!currentFilters.name ||
    (currentFilters.roles?.length || 0) > 0 ||
    currentFilters.status !== 'ALL';

  const notFound = (!tableData.length && canReset) || !tableData.length;

  const handleGetUsers = useCallback(async (params?: Partial<FilterUser>) => {
    const users = await getUsers(params);
    setTableData(users);
  }, []);

  const handleDeleteRow = useCallback(
    (id: string) => {
      const deleteRow = tableData.filter((row) => row.id !== id);

      toast.success('Delete success!');

      setTableData(deleteRow);

      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));

    toast.success('Delete success!');

    setTableData(deleteRows);

    table.onUpdatePageDeleteRows(dataInPage.length, tableData.length);
  }, [dataInPage.length, table, tableData]);

  const handleFilterStatus = useCallback(
    (event: React.SyntheticEvent, newValue: TUserStatus) => {
      table.onResetPage();
      updateFilters({ status: newValue });
    },
    [updateFilters, table]
  );

  useEffect(() => {
    console.log('Filter users!!!', currentFilters);
    handleGetUsers(currentFilters);
  }, [currentFilters, handleGetUsers]);

  const renderConfirmDialog = () => (
    <ConfirmDialog
      open={confirmDialog.value}
      onClose={confirmDialog.onFalse}
      title="ลบผู้ใช้"
      content={
        <>
          คุณแน่ใจว่าจะลบผู้ใช้ <strong> {table.selected.length} </strong> รายการ?
        </>
      }
      action={
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            handleDeleteRows();
            confirmDialog.onFalse();
          }}
        >
          ลบผู้ใช้
        </Button>
      }
    />
  );

  return (
    <>
      <Card>
        <Tabs
          value={currentFilters.status}
          onChange={handleFilterStatus}
          sx={[
            (theme) => ({
              px: 2.5,
              boxShadow: `inset 0 -2px 0 0 ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
            }),
          ]}
        >
          {STATUS_OPTIONS.map((tab) => (
            <Tab
              key={tab.value}
              iconPosition="end"
              value={tab.value}
              label={tab.label}
              icon={
                <Label
                  variant={
                    ((tab.value === 'all' || tab.value === currentFilters.status) && 'filled') ||
                    'soft'
                  }
                  color={
                    (tab.value === 'ACTIVE' && 'success') ||
                    (tab.value === 'INACTIVE' && 'warning') ||
                    'default'
                  }
                >
                  {['ACTIVE', 'INACTIVE'].includes(tab.value)
                    ? tableData.filter((_user) => _user.status === tab.value).length
                    : tableData.length}
                </Label>
              }
            />
          ))}
        </Tabs>

        <UserTableToolbar
          filters={filters}
          onResetPage={table.onResetPage}
          options={{ roles: USER_ROLE }}
        />

        {canReset && (
          <UserTableFiltersResult
            filters={filters}
            totalResults={tableData.length}
            onResetPage={table.onResetPage}
            sx={{ p: 2.5, pt: 0 }}
          />
        )}

        <Box sx={{ position: 'relative' }}>
          <TableSelectedAction
            dense={table.dense}
            numSelected={table.selected.length}
            rowCount={tableData.length}
            onSelectAllRows={(checked) =>
              table.onSelectAllRows(
                checked,
                tableData.map((row) => row.id)
              )
            }
            action={
              <Tooltip title="ลบผู้ใช้">
                <IconButton color="primary" onClick={confirmDialog.onTrue}>
                  <Iconify icon="solar:trash-bin-trash-bold" />
                </IconButton>
              </Tooltip>
            }
          />

          <Scrollbar>
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headCells={TABLE_HEAD}
                rowCount={tableData.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
              />

              <TableBody>
                {tableData
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => {
                    const isOwner = row.role === 'OWNER';
                    const _disabled =
                      user?.role === 'OWNER' ? false : isOwner ? true : isEqual(user?.id, row.id);
                    return (
                      <UserTableRow
                        key={row.id}
                        row={row}
                        disabled={_disabled}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        editHref={paths.user?.edit(row.id)}
                      />
                    );
                  })}

                <TableEmptyRows
                  height={table.dense ? 56 : 56 + 20}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
                />

                <TableNoData notFound={notFound} />
              </TableBody>
            </Table>
          </Scrollbar>
        </Box>

        <TablePaginationCustom
          page={table.page}
          dense={table.dense}
          count={tableData.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          onChangeDense={table.onChangeDense}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>

      {renderConfirmDialog()}
    </>
  );
}
