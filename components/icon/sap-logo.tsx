import logo from '@/public/assets/static/logo.webp';
import Image from 'next/image';
import * as React from 'react';

const LogoIcon = (props: any) => <Image src={logo} alt="SAP Hub" {...props} />;
export default LogoIcon;
