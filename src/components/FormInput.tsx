import { ControllerRenderProps, FieldValues } from 'react-hook-form';
import { FormItem, FormLabel, FormControl, FormMessage } from './ui/form';
import { Input } from './ui/input';

interface FormInputProps {
  field: ControllerRenderProps<FieldValues, string>;
  label: string;
}

export function FormInput({ field, label }: FormInputProps) {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
