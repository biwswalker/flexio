'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

import Grid from '@mui/material/Grid2';

import { CONFIG } from 'src/global-config';
import { getCompany } from 'src/services/company';

import { LoadingScreen } from 'src/components/loading-screen';

import { SummaryCard } from '../summary-card';
import { CompanyLayout } from '../company-layout';

// ----------------------------------------------------------------------

export function CompanyDetailView() {
  const params = useParams();
  const shortName = String(params.id);
  const [company, setCompany] = useState<Company | undefined>(undefined);

  useEffect(() => {
    handleGetCompany();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetCompany = async () => {
    const _company = await getCompany(shortName);
    setCompany(_company);
  };

  if (!company) {
    return <LoadingScreen />;
  }

  return (
    <CompanyLayout>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <SummaryCard
            title="กำไรขาดทุน"
            percent={2.6}
            total={714000}
            icon={
              <img
                alt="กำไรขาดทุน"
                src={`${CONFIG.assetsDir}/assets/icons/glass/ic-glass-bag.svg`}
              />
            }
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [22, 8, 35, 50, 82, 84, 77, 12],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <SummaryCard
            title="รายได้ทั้งหมด"
            percent={-0.1}
            total={1352831}
            color="secondary"
            icon={
              <img
                alt="รายได้ทั้งหมด"
                src={`${CONFIG.assetsDir}/assets/icons/glass/ic-glass-users.svg`}
              />
            }
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [56, 47, 40, 62, 73, 30, 23, 54],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <SummaryCard
            title="รายจ่าย"
            percent={2.8}
            total={1723315}
            color="warning"
            icon={
              <img alt="รายจ่าย" src={`${CONFIG.assetsDir}/assets/icons/glass/ic-glass-buy.svg`} />
            }
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [40, 70, 50, 28, 70, 75, 7, 64],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <SummaryCard
            title="เงินหมุนเวียน"
            percent={3.6}
            total={234}
            color="error"
            icon={
              <img
                alt="เงินหมุนเวียนทั้งหมด"
                src={`${CONFIG.assetsDir}/assets/icons/glass/ic-glass-message.svg`}
              />
            }
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [56, 30, 23, 54, 47, 40, 62, 73],
            }}
          />
        </Grid>
      </Grid>
    </CompanyLayout>
  );
}
