export interface ICCNumberInputProps extends ICCInputProps {
  onChange: (value: string, event?: React.ChangeEvent<HTMLInputElement>) => void;
  mask?: string;
}

export interface ICCInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange: (value: string, event?: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

export type TCursorPosition = {
  cursorStart: number | null;
  cursorEnd: number | null;
};
