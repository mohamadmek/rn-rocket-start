import type { ReactElement } from 'react';
import type { FieldValues, UseFormReturn } from 'react-hook-form';
import { FormProvider } from 'react-hook-form';

// Define the accepted component types
type AcceptedInput = ReactElement<{ name: string }>;

// Ensure all keys in T are used as a name prop in children
type EnsureAllFieldsUsed<T extends Record<string, any>, C> = {
  [K in keyof T]: K extends C ? K : never;
}[keyof T] extends keyof T
  ? object
  : { error: 'All form fields must be used as input names' };

export type TFormProvidersProps<T extends FieldValues> = {
  children: AcceptedInput[];
  formMethods: UseFormReturn<T>;
  errors?: string;
  className?: string;
  isDirtyOverride?: boolean;
  showErrors?: boolean;
  onCancel?: () => void;
} & EnsureAllFieldsUsed<T, ExtractNamesFromChildren<AcceptedInput[]>>;

// Extract the `name` prop from children
type ExtractNamesFromChildren<T> = T extends ReactElement<{ name: infer N }>[]
  ? N
  : never;

export const FormProviders = <T extends FieldValues>(
  props: TFormProvidersProps<T>,
) => {
  const { formMethods, children } = props;

  return <FormProvider {...formMethods}>{children}</FormProvider>;
};
