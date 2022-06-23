import React from 'react';
import {Input} from '@a3/frontkit';
import {onlyDigit} from '@/utils/string.utils';
import {ICCInputProps, TCursorPosition} from '../types';

function CSCCodeInputComponent(props: ICCInputProps, ref: React.ForwardedRef<HTMLInputElement>) {
  const {onChange, value, ...restProps} = props;
  const [displaySymbols, setSymbols] = React.useState('');
  const [updateKey, forceUpdate] = React.useState(0);
  const realValue = React.useRef<string[]>([]);
  const inputType = React.useRef<string>('');
  const inputRef = React.useRef<HTMLInputElement>(null);
  React.useImperativeHandle(ref, () => inputRef?.current!, []);
  const [{cursorStart, cursorEnd}, setCursor] = React.useReducer(
    (s: TCursorPosition, a: TCursorPosition): TCursorPosition => ({...s, ...a}),
    {
      cursorStart: null,
      cursorEnd: null,
    },
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digit = onlyDigit(e.target.value);
    let cursor = cursorStart;
    if (!inputType.current && digit) {
      inputType.current = 'autoComplete';
    }

    switch (inputType.current) {
      default:
      case 'insertText': {
        if (realValue.current.length >= 3) {
          return;
        }
        realValue.current.push(digit);
        setSymbols(s => s + '*');
        cursor = cursorStart! + 1;
        setCursor({cursorStart: cursor, cursorEnd: cursor});
        break;
      }
      case 'deleteContentBackward': {
        cursor = cursorStart! - 1;
        const currentValue = realValue.current;
        currentValue.splice(cursor, 1);
        realValue.current = currentValue;

        const symbols = '*'.repeat(realValue.current.length);
        setSymbols(symbols);
        setCursor({cursorStart: cursor, cursorEnd: cursor});
        break;
      }
      case 'deleteContentForward': {
        const currentValue = realValue.current;
        currentValue.splice(cursor!, 1);
        realValue.current = currentValue;

        const symbols = '*'.repeat(realValue.current.length);
        setSymbols(symbols);
        setCursor({cursorStart: cursor, cursorEnd: cursor});
        forceUpdate(s => s + 1);
        break;
      }
      case 'deleteSection': {
        cursor = cursorStart;
        const selectLength = cursorEnd! - cursorStart!;
        realValue.current.splice(cursor!, selectLength);
        const symbols = '*'.repeat(realValue.current.length);
        setSymbols(symbols);
        setCursor({cursorStart: cursor, cursorEnd: cursor});
        break;
      }
      case 'insertFromPaste':
      case 'autoComplete': {
        const update = digit.split('');
        realValue.current = update;
        const updatedValue = realValue.current.slice(0, 3);
        realValue.current = updatedValue;
        const symbols = '*'.repeat(realValue.current.length);
        setSymbols(symbols);
        setCursor({cursorStart: 3, cursorEnd: 3});
        break;
      }

      case 'insertTextWithSelect': {
        realValue.current.splice(cursorStart!, cursorEnd!, digit);
        const symbols = '*'.repeat(realValue.current.length);
        setSymbols(symbols);
        cursor = cursorStart! + 1;
        setCursor({cursorStart: cursor, cursorEnd: cursor});
        break;
      }
    }
    onChange(realValue.current.join(''));
    inputType.current = '';
  };

  const handleKeyDown = React.useCallback((event: React.KeyboardEvent) => {
    const {ctrlKey, metaKey, key} = event;
    const isNumericKey = isFinite(Number(key));
    if (ctrlKey || metaKey) {
      return;
    }
    const start = (event.target as HTMLInputElement).selectionStart;
    const end = (event.target as HTMLInputElement).selectionEnd;

    if (start === end) {
      if (key === 'Backspace') {
        inputType.current = 'deleteContentBackward';
      } else if (key === 'Delete') {
        inputType.current = 'deleteContentForward';
      } else if (isNumericKey) {
        inputType.current = 'insertText';
      }
    } else {
      if (key === 'Backspace') {
        inputType.current = 'deleteSection';
      } else if (key === 'Delete') {
        inputType.current = 'deleteSection';
      } else if (isNumericKey) {
        inputType.current = 'insertTextWithSelect';
      }
    }
    setCursor({cursorStart: start, cursorEnd: end});
  }, []);

  const handlePaste = React.useCallback((e: React.ClipboardEvent<HTMLInputElement>) => {
    const start = e.currentTarget.selectionStart;
    const end = e.currentTarget.selectionEnd;
    inputType.current = 'insertFromPaste';
    setCursor({cursorStart: start, cursorEnd: end});
  }, []);

  React.useInsertionEffect(() => {
    inputRef?.current?.setSelectionRange(cursorStart, cursorEnd);
  }, [cursorStart, cursorEnd, updateKey]);

  return (
    <Input
      type="tel"
      name="cvc"
      tabIndex={0}
      ref={inputRef}
      placeholder="CVC/CVC2"
      autoComplete="cc-csc"
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      value={displaySymbols}
      maxLength={3}
      css={{height: 40, borderRadius: 12, backgroundColor: 'var(--color-background-secondary)'}}
      {...restProps}
    />
  );
}

export const CSCCodeInput = React.forwardRef(CSCCodeInputComponent);
