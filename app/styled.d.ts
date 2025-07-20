import { theme } from './src/lib/styled-components/theme';
// styled.d.ts
import 'styled-components';

type Theme = typeof  theme 

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
