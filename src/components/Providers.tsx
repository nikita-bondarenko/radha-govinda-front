'use client';

import StyledComponentsRegistry from '@/lib/styled-components/StyledComponentsRegistry';
import { theme } from '@/lib/styled-components/theme';
import { PropsWithChildren } from 'react';
import { ThemeProvider } from 'styled-components';


export default function Providers({ children }: PropsWithChildren) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyledComponentsRegistry>
  );
}
