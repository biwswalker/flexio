'use client';

import type { TableHeadCellProps } from 'src/components/table';

import { useState, useEffect, useCallback } from 'react';
import { useBoolean, useSetState } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';

import { paths } from 'src/routes/paths';

import { fIsAfter } from 'src/utils/format-time';

import { getAccounts } from 'src/services/account';
import { DashboardContent } from 'src/layouts/dashboard';
import { getTransactions } from 'src/services/transaction';
import { getTransactionCategory } from 'src/services/transactionCategory';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
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

import { TransactionTableRow } from '../transaction-table-row';
import { TransactionNewEditForm } from '../transaction-new-edit-form';
import { TransactionTableToolbar } from '../transaction-table-toolbar';
import { TransactionTableFiltersResult } from '../transaction-table-filters-result';

// ----------------------------------------------------------------------

const TABLE_HEAD: TableHeadCellProps[] = [
  { id: 'txId', label: 'TXID' },
  { id: 'transactionDate', label: 'เวลาธุรกรรม' },
  { id: 'transactionType', label: 'ประเภท' },
  { id: 'amount', label: 'จำนวน', sx: { minWidth: 120 } },
  { id: 'transactionCategory', label: 'หมวดหมู่', sx: { minWidth: 120 } },
  { id: 'paymentMethod', label: 'วิธีการชำระ', sx: { minWidth: 100 } },
  { id: 'projectId', label: 'โครงการ', sx: { minWidth: 100 } },
  { id: 'accountId', label: 'บัญชี', sx: { minWidth: 150 } },
  { id: 'createdBy', label: 'ผู้สร้างข้อมูล', sx: { minWidth: 180 } },
  { id: '' },
];

// ----------------------------------------------------------------------

interface TransactionListState {
  projects: Project[];
  categories: any[];
  accounts: Account[];
  users: User[];
}

export function TransactionListView() {
  const { company } = useAuthContext();
  const table = useTable({ defaultOrderBy: 'createDate' });

  const confirmDialog = useBoolean();
  const quickEditForm = useBoolean();
  const masterData = useSetState<TransactionListState>({
    projects: [],
    categories: [],
    accounts: [],
    users: [],
  });

  const [tableData, setTableData] = useState<GetTransactionResponse[]>([]);

  const filters = useSetState<FilterTransaction>({
    txId: '',
    categories: [],
    paymentMethods: [],
    accountIds: [],
    projectIds: [],
    userIds: [],
    companyId: '',
    txStartDate: null,
    txEndDate: null,
  });
  const { state: currentFilters } = filters;

  const dateError = fIsAfter(currentFilters.txStartDate, currentFilters.txEndDate);

  const dataInPage = rowInPage(tableData, table.page, table.rowsPerPage);

  const canReset =
    !!currentFilters.txId ||
    (currentFilters.categories?.length || 0) > 0 ||
    (currentFilters.paymentMethods?.length || 0) > 0 ||
    (currentFilters.accountIds?.length || 0) > 0 ||
    (currentFilters.projectIds?.length || 0) > 0 ||
    (currentFilters.userIds?.length || 0) > 0 ||
    (!!currentFilters.txStartDate && !!currentFilters.txEndDate);

  const notFound = (!tableData.length && canReset) || !tableData.length;

  async function getMasterData() {
    const categories = await getTransactionCategory({ status: 'ACTIVE' });
    const accounts = await getAccounts(company?.id);
    // projects
    masterData.setState({
      accounts,
      categories,
    });
  }

  const handleGetTransactions = useCallback(
    async (params?: Partial<TransactionRequestParam>) => {
      if (!company) return;
      const transactions = await getTransactions(company?.id, params);
      setTableData(transactions);
    },
    [company]
  );

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

  useEffect(() => {
    getMasterData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log('Filter transaction!!!');
    handleGetTransactions(currentFilters);
  }, [currentFilters, handleGetTransactions]);

  // const handleFilterStatus = useCallback(
  //   (event: React.SyntheticEvent, newValue: string) => {
  //     table.onResetPage();
  //     updateFilters({ status: newValue });
  //   },
  //   [updateFilters, table]
  // );

  function handleOnAddIncomeExpenseComplete() {
    handleGetTransactions(currentFilters);
    quickEditForm.onFalse();
  }

  const renderConfirmDialog = () => (
    <ConfirmDialog
      open={confirmDialog.value}
      onClose={confirmDialog.onFalse}
      title="Delete"
      content={
        <>
          Are you sure want to delete <strong> {table.selected.length} </strong> items?
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
          Delete
        </Button>
      }
    />
  );

  const renderAddForm = () => (
    <TransactionNewEditForm
      open={quickEditForm.value}
      onClose={quickEditForm.onFalse}
      onComplete={handleOnAddIncomeExpenseComplete}
      accounts={masterData.state.accounts}
      projects={masterData.state.projects}
    />
  );

  return (
    <>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="รายการ รายรับ/รายจ่าย"
          links={[
            { name: 'รายรับ/รายจ่าย', href: paths.management.incomeExpense.transactions },
            { name: 'รายการ' },
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={quickEditForm.onTrue}
            >
              เพิ่มรายรับ/รายจ่ายใหม่
            </Button>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card>
          {/* <Tabs
            value={currentFilters.status}
            onChange={handleFilterStatus}
            sx={{
              px: 2.5,
              boxShadow: `inset 0 -2px 0 0 ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
            }}
          >
            {TABS.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                label={tab.label}
                iconPosition="end"
                icon={
                  <Label
                    variant={
                      ((tab.value === 'all' || tab.value === currentFilters.status) && 'filled') ||
                      'soft'
                    }
                    color={tab.color}
                  >
                    {tab.count}
                  </Label>
                }
              />
            ))}
          </Tabs> */}

          <TransactionTableToolbar
            filters={filters}
            dateError={dateError}
            onResetPage={table.onResetPage}
            options={masterData.state}
          />

          {canReset && (
            <TransactionTableFiltersResult
              filters={filters}
              onResetPage={table.onResetPage}
              totalResults={tableData.length}
              options={masterData.state}
              sx={{ p: 2.5, pt: 0 }}
            />
          )}

          <Box sx={{ position: 'relative' }}>
            <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={tableData.length}
              onSelectAllRows={(checked) => {
                table.onSelectAllRows(
                  checked,
                  tableData.map((row) => row.id)
                );
              }}
              action={
                <Box sx={{ display: 'flex' }}>
                  <Tooltip title="Sent">
                    <IconButton color="primary">
                      <Iconify icon="iconamoon:send-fill" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Download">
                    <IconButton color="primary">
                      <Iconify icon="eva:download-outline" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Print">
                    <IconButton color="primary">
                      <Iconify icon="solar:printer-minimalistic-bold" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete">
                    <IconButton color="primary" onClick={confirmDialog.onTrue}>
                      <Iconify icon="solar:trash-bin-trash-bold" />
                    </IconButton>
                  </Tooltip>
                </Box>
              }
            />

            <Scrollbar sx={{ minHeight: 444 }}>
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headCells={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {tableData
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <TransactionTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        editHref={paths.management.incomeExpense.edit(row.id)}
                        detailsHref={paths.management.incomeExpense.detail(row.id)}
                      />
                    ))}

                  <TableEmptyRows
                    colSpan={11}
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
      </DashboardContent>

      {renderConfirmDialog()}
      {renderAddForm()}
    </>
  );
}
