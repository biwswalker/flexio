import type { UseSetStateReturn } from 'minimal-shared/hooks';
import type { FiltersResultProps } from 'src/components/filters-result';

import { useCallback } from 'react';

import Chip from '@mui/material/Chip';

import { getUserRoleName } from 'src/constants/user';

import { chipProps, FiltersBlock, FiltersResult } from 'src/components/filters-result';

// ----------------------------------------------------------------------

type Props = FiltersResultProps & {
  onResetPage: () => void;
  filters: UseSetStateReturn<FilterUser>;
};

export function UserTableFiltersResult({ filters, onResetPage, totalResults, sx }: Props) {
  const { state: currentFilters, setState: updateFilters, resetState: resetFilters } = filters;

  const handleRemoveKeyword = useCallback(() => {
    onResetPage();
    updateFilters({ name: '' });
  }, [onResetPage, updateFilters]);

  const handleRemoveStatus = useCallback(() => {
    onResetPage();
    updateFilters({ status: 'ALL' });
  }, [onResetPage, updateFilters]);

  const handleRemoveRole = useCallback(
    (inputValue: string) => {
      const newValue = currentFilters.roles?.filter((item) => item !== inputValue);

      onResetPage();
      updateFilters({ roles: newValue });
    },
    [onResetPage, updateFilters, currentFilters.roles]
  );

  const handleReset = useCallback(() => {
    onResetPage();
    resetFilters();
  }, [onResetPage, resetFilters]);

  return (
    <FiltersResult totalResults={totalResults} onReset={handleReset} sx={sx}>
      <FiltersBlock label="สถานะ:" isShow={currentFilters.status !== 'ALL'}>
        <Chip
          {...chipProps}
          label={currentFilters.status}
          onDelete={handleRemoveStatus}
          sx={{ textTransform: 'capitalize' }}
        />
      </FiltersBlock>

      <FiltersBlock label="บทบาท (Role):" isShow={!!currentFilters.roles?.length}>
        {currentFilters.roles?.map((item) => (
          <Chip
            {...chipProps}
            key={item}
            label={getUserRoleName(item)}
            onDelete={() => handleRemoveRole(item)}
          />
        ))}
      </FiltersBlock>

      <FiltersBlock label="ค้นหา:" isShow={!!currentFilters.name}>
        <Chip {...chipProps} label={currentFilters.name} onDelete={handleRemoveKeyword} />
      </FiltersBlock>
    </FiltersResult>
  );
}
