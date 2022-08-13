import React, { FC } from 'react';
import { AppProps } from '../node_modules/next/app';
import { wrapper } from '../store/index';

const WrapperApp: FC<AppProps> = ({ Component, pageProps }) => <Component {...pageProps} />;

export default wrapper.withRedux(WrapperApp);
