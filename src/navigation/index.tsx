import React from 'react';
import { View } from 'react-native';
import { withNamespaces } from 'react-i18next';
import { AppNavigator } from './Navigator';
import '@src/locale/i18n';
import { ActionSheetProvider } from './ActionSheetProvider';
import { ThemeProvider } from '@src/theme';
import NavigationService from './NavigationService';

interface WrappedStackProps {
  t: (text: string) => string;
}

// Wrapping a stack with translation hoc asserts we get new render on language change
// the hoc is set to only trigger rerender on languageChanged
class WrappedStack extends React.Component<WrappedStackProps> {
  static router = AppNavigator.router;
  render(): JSX.Element {
    const { t } = this.props;
    return (
      <AppNavigator
        ref={(navigatorRef) => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
        screenProps={{ t }}
        {...this.props}
      />
    );
  }
}
const ReloadAppOnLanguageChange = withNamespaces('common', {
  // @ts-ignore
  bindI18n: 'languageChanged',
  bindStore: false,
})(WrappedStack);

export default class extends React.Component {
  render(): JSX.Element {
    return (
      <ThemeProvider>
        <View style={{ flex: 1 }}>
          <ReloadAppOnLanguageChange />
          <ActionSheetProvider />
        </View>
      </ThemeProvider>
    );
  }
}
