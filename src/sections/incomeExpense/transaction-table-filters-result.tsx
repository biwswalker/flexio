import type { UseSetStateReturn } from 'minimal-shared/hooks';
import type { FiltersResultProps } from 'src/components/filters-result';

import { useCallback } from 'react';

import Chip from '@mui/material/Chip';

import { fDateRangeShortLabel } from 'src/utils/format-time';

import { chipProps, FiltersBlock, FiltersResult } from 'src/components/filters-result';

// ----------------------------------------------------------------------

type Props = FiltersResultProps & {
  onResetPage: () => void;
  filters: UseSetStateReturn<FilterTransaction>;
};

export function TransactionTableFiltersResult({ filters, totalResults, onResetPage, sx }: Props) {
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
        {currentFilters.categories?.map((category) => (
          <Chip
            {...chipProps}
            key={category}
            label={category}
            onDelete={() => handleRemoveCategory(category)}
          />
        ))}
      </FiltersBlock>
      <FiltersBlock label="วิธีการชำระ:" isShow={!!currentFilters.paymentMethods?.length}>
        {currentFilters.paymentMethods?.map((paymentMethod) => (
          <Chip
            {...chipProps}
            key={paymentMethod}
            label={paymentMethod}
            onDelete={() => handleRemovePaymentMethod(paymentMethod)}
          />
        ))}
      </FiltersBlock>
      <FiltersBlock label="บัญชี:" isShow={!!currentFilters.accountIds?.length}>
        {currentFilters.accountIds?.map((accountId) => (
          <Chip
            {...chipProps}
            key={accountId}
            label={accountId}
            onDelete={() => handleRemoveAccount(accountId)}
          />
        ))}
      </FiltersBlock>
      <FiltersBlock label="โครงการ:" isShow={!!currentFilters.projectIds?.length}>
        {currentFilters.projectIds?.map((project) => (
          <Chip
            {...chipProps}
            key={project}
            label={project}
            onDelete={() => handleRemoveProject(project)}
          />
        ))}
      </FiltersBlock>
      <FiltersBlock label="ผู้สร้างข้อมูล:" isShow={!!currentFilters.userIds?.length}>
        {currentFilters.userIds?.map((user) => (
          <Chip {...chipProps} key={user} label={user} onDelete={() => handleRemoveUser(user)} />
        ))}
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
