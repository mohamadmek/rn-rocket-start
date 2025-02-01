import type { ReactNode } from 'react';
import type { FieldValues, UseFormReturn } from 'react-hook-form';
import { FormProvider } from 'react-hook-form';

export type TFormProvidersProps<T extends FieldValues> = {
  children: ReactNode;
  formMethods: UseFormReturn<T>;
  errors?: string;
  className?: string;
  isDirtyOverride?: boolean;
  showErrors?: boolean;
  onCancel?: () => void;
};

export const FormProviders = <T extends FieldValues>(
  props: TFormProvidersProps<T>,
) => {
  const { formMethods, children } = props;

  return <FormProvider {...formMethods}>{children}</FormProvider>;
};
