import { ControllerRenderProps, FieldValues } from 'react-hook-form';
import { FormItem, FormLabel, FormControl, FormMessage } from './ui/form';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

export interface Option {
  value: string;
  label: string;
}

interface FormRadioGroupProps {
  field: ControllerRenderProps<FieldValues, string>;
  label: string;
  options: Option[];
  dir?: 'vertical' | 'horizontal';
}

export function FormRadioGroup({
  field,
  label,
  options,
  dir,
}: FormRadioGroupProps) {
  return (
    <FormItem className="space-y-3">
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <RadioGroup
          onValueChange={field.onChange}
          defaultValue={field.value}
          className={`flex ${dir === 'vertical' && 'flex-col'}`}
        >
          {options.map((option) => (
            <FormItem
              className="flex items-center space-x-3 space-y-0"
              key={option.value}
            >
              <FormControl>
                <RadioGroupItem value={option.value} />
              </FormControl>
              <FormLabel className="font-normal">{option.label}</FormLabel>
            </FormItem>
          ))}
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
