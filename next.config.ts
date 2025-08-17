import type { NextConfig } from 'next';
import { builtinModules } from 'module';

const externalModules = builtinModules.filter(
  (m) => m !== 'process' && m !== 'assert'
);

const nextConfig: NextConfig = {

};

export default nextConfig;
