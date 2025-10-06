import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { vueOutputTarget } from '@stencil/vue-output-target';

const componentCorePackage = '../../../';
const directivesProxyFile = (name: string) => `./framework/${name}/src/revodropdown.ts`;
export const config: Config = {
  buildEs5: 'prod',
  namespace: 'revo-dropdown',
  extras: {
    enableImportInjection: true
  },
  plugins: [sass()],
  outputTargets: [
    vueOutputTarget({
      componentCorePackage,
      proxiesFile: directivesProxyFile('vue'),
      componentModels: [{
        elements: 'revo-dropdown',
        event: 'changed',
        targetAttr: 'value'
      }]
    }),
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'single-export-module',
      minify: true,
      dir: 'standalone',
      generateTypeDeclarations: true,
      empty: true,
    },
  ],
};
