import type { UseSetStateReturn } from 'minimal-shared/hooks';
import type { FiltersResultProps } from 'src/components/filters-result';

import { Fragment, useCallback } from 'react';

import Chip from '@mui/material/Chip';

import { fDateRangeShortLabel } from 'src/utils/format-time';

import { getBankName, PAYMENT_METHOD_OPTIONS } from 'src/constants/account';

import { chipProps, FiltersBlock, FiltersResult } from 'src/components/filters-result';

// ----------------------------------------------------------------------

type Props = FiltersResultProps & {
  onResetPage: () => void;
  filters: UseSetStateReturn<FilterTransaction>;
  options: {
    projects: Project[];
    categories: TransactionCategory[];
    accounts: Account[];
    users: User[];
  };
};

export function TransactionTableFiltersResult({
  filters,
  totalResults,
  onResetPage,
  sx,
  options,
}: Props) {
  const { state: currentFilters, setState: updateFilters, resetState: resetFilters } = filters;

  const handleRemoveTxId = useCallback(() => {
    onResetPage();
    updateFilters({ txId: '' });
  }, [onResetPage, updateFilters]);

  const handleRemoveCategory = useCallback(
    (inputValue: string) => {
      const newValue = currentFilters.categories?.filter((item) => item !== inputValue);

      onResetPage();
      updateFilters({ categories: newValue });
    },
    [onResetPage, updateFilters, currentFilters.categories]
  );

  const handleRemovePaymentMethod = useCallback(
    (inputValue: string) => {
      const newValue = currentFilters.paymentMethods?.filter((item) => item !== inputValue);

      onResetPage();
      updateFilters({ paymentMethods: newValue });
    },
    [onResetPage, updateFilters, currentFilters.paymentMethods]
  );

  const handleRemoveAccount = useCallback(
    (inputValue: string) => {
      const newValue = currentFilters.accountIds?.filter((item) => item !== inputValue);

      onResetPage();
      updateFilters({ accountIds: newValue });
    },
    [onResetPage, updateFilters, currentFilters.accountIds]
  );

  const handleRemoveProject = useCallback(
    (inputValue: string) => {
      const newValue = currentFilters.projectIds?.filter((item) => item !== inputValue);

      onResetPage();
      updateFilters({ projectIds: newValue });
    },
    [onResetPage, updateFilters, currentFilters.projectIds]
  );

  const handleRemoveUser = useCallback(
    (inputValue: string) => {
      const newValue = currentFilters.userIds?.filter((item) => item !== inputValue);

      onResetPage();
      updateFilters({ userIds: newValue });
    },
    [onResetPage, updateFilters, currentFilters.userIds]
  );

  // const handleRemoveStatus = useCallback(() => {
  //   onResetPage();
  //   updateFilters({ status: 'all' });
  // }, [onResetPage, updateFilters]);

  const handleRemoveDate = useCallback(() => {
    onResetPage();
    updateFilters({ txStartDate: null, txEndDate: null });
  }, [onResetPage, updateFilters]);

  return (
    <FiltersResult totalResults={totalResults} onReset={() => resetFilters()} sx={sx}>
      {/* <FiltersBlock label="Status:" isShow={currentFilters.status !== 'all'}>
        <Chip
          {...chipProps}
          label={currentFilters.status}
          onDelete={handleRemoveStatus}
          sx={{ textTransform: 'capitalize' }}
        />
      </FiltersBlock> */}

      <FiltersBlock label="หมายเลข:" isShow={!!currentFilters.txId}>
        <Chip {...chipProps} label={currentFilters.txId} onDelete={handleRemoveTxId} />
      </FiltersBlock>
      <FiltersBlock label="หมวดหมู่:" isShow={!!currentFilters.categories?.length}>
        {currentFilters.categories?.map((_category) => {
          const categoryData = options.categories.find(({ id }) => id === _category);
          if (!categoryData) {
            return <Fragment key={_category} />;
          }
          return (
            <Chip
              {...chipProps}
              key={_category}
              label={categoryData.name}
              onDelete={() => handleRemoveCategory(_category)}
            />
          );
        })}
      </FiltersBlock>
      <FiltersBlock label="วิธีการชำระ:" isShow={!!currentFilters.paymentMethods?.length}>
        {currentFilters.paymentMethods?.map((_paymentMethod) => {
          const paymentMethodData = PAYMENT_METHOD_OPTIONS.find(
            ({ value }) => value === _paymentMethod
          );
          if (!paymentMethodData) {
            return <Fragment key={_paymentMethod} />;
          }
          return (
            <Chip
              {...chipProps}
              key={_paymentMethod}
              label={paymentMethodData.label}
              onDelete={() => handleRemovePaymentMethod(paymentMethodData.value)}
            />
          );
        })}
      </FiltersBlock>
      <FiltersBlock label="บัญชี:" isShow={!!currentFilters.accountIds?.length}>
        {currentFilters.accountIds?.map((_accountId) => {
          const accountData = options.accounts.find(({ id }) => id === _accountId);
          if (!accountData) {
            return <Fragment key={_accountId} />;
          }
          return (
            <Chip
              {...chipProps}
              key={_accountId}
              label={`${getBankName(accountData.bank, true)}: ${accountData.bankName}`}
              onDelete={() => handleRemoveAccount(_accountId)}
            />
          );
        })}
      </FiltersBlock>
      <FiltersBlock label="โครงการ:" isShow={!!currentFilters.projectIds?.length}>
        {currentFilters.projectIds?.map((_projectId) => {
          const _projectData = options.projects.find(({ id }) => id === _projectId);
          if (!_projectData) {
            return <Fragment key={_projectId} />;
          }
          return (
            <Chip
              {...chipProps}
              key={_projectId}
              label={_projectData.name}
              onDelete={() => handleRemoveProject(_projectId)}
            />
          );
        })}
      </FiltersBlock>
      <FiltersBlock label="ผู้สร้างข้อมูล:" isShow={!!currentFilters.userIds?.length}>
        {currentFilters.userIds?.map((_userId) => {
          const _userData = options.users.find(({ id }) => id === _userId);
          if (!_userData) {
            return <Fragment key={_userId} />;
          }
          return (
            <Chip
              {...chipProps}
              key={_userId}
              label={_userData.name}
              onDelete={() => handleRemoveUser(_userId)}
            />
          );
        })}
      </FiltersBlock>
      <FiltersBlock
        label="ช่วงเวลาธุรกรรม:"
        isShow={Boolean(currentFilters.txStartDate && currentFilters.txEndDate)}
      >
        <Chip
          {...chipProps}
          label={fDateRangeShortLabel(currentFilters.txStartDate, currentFilters.txEndDate)}
          onDelete={handleRemoveDate}
        />
      </FiltersBlock>
    </FiltersResult>
  );
}
