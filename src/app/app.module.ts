import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ThemeService } from './services/theme.service';

export const appConfig = {
  providers: [ThemeService]
};
