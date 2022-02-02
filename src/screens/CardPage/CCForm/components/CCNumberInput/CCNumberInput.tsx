import React from 'react';
import {Input} from '@a3/frontkit';
import {removeMask, createDisplayValue} from './utils';
import {ICCNumberInputProps, TCursorPosition} from '../types';


function CCNumberInputComponent(props: ICCNumberInputProps, ref: React.ForwardedRef<HTMLInputElement>) {
  const {name, mask = '9999 9999 9999 9999 999', onChange, value, ...restProps} = props;

  const [{cursorStart, cursorEnd}, setCursor] = React.useReducer(
    (s: TCursorPosition, a: TCursorPosition): TCursorPosition => ({...s, ...a}),
    {
      cursorStart: null,
      cursorEnd: null,
    },
  );
  const [updateKey, forceUpdate] = React.useState(0);
  const prevValue = React.useRef<string>('');
  const prevMaskedValue = React.useRef<string>('');
  const inputRef = React.useRef<HTMLInputElement>(null);
  React.useImperativeHandle(ref, () => (inputRef?.current!), []);

  const inputType = React.useRef<string>('');

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = removeMask(event.currentTarget.value);
      let cursor = cursorStart;
      const displayValue = createDisplayValue(rawValue, mask);

      switch (inputType.current) {
        default:
        case 'insertText': {
          if ([4, 9, 14, 19].includes(cursorStart!)) {
            cursor = cursorStart! + 2;
          } else {
            cursor = cursorStart! + 1;
          }
          setCursor({cursorStart: cursor, cursorEnd: cursor});
          break;
        }
        case 'deleteContentBackward': {
          cursor = cursorStart! - 1;
          setCursor({cursorStart: cursor, cursorEnd: cursor});
          break;
        }
        case 'deleteContentForward': {
          setCursor({cursorStart: cursor, cursorEnd: cursor});
          forceUpdate(s => s + 1);
          break;
        }
        case 'deleteSection': {
          cursor = cursorStart;
          setCursor({cursorStart: cursor, cursorEnd: cursor});
          break;
        }
        case 'insertFromPaste': {
          cursor = displayValue.length;
          setCursor({cursorStart: cursor, cursorEnd: cursor});
          break;
        }
      }
      onChange(displayValue);
      prevValue.current = rawValue;
      prevMaskedValue.current = displayValue;
    },
    [cursorStart, mask, onChange],
  );

  const handleKeyDown = React.useCallback((event: React.KeyboardEvent) => {
    const {ctrlKey, metaKey, key} = event;
    const isNumericKey = isFinite(Number(key));
    if (ctrlKey || metaKey) {
      return;
    }
    const start = (event.target as HTMLInputElement).selectionStart;
    const end = (event.target as HTMLInputElement).selectionEnd;

    if (start === end) {
      if (isNumericKey) {
        inputType.current = 'insertText';
      } else if (key === 'Backspace') {
        inputType.current = 'deleteContentBackward';
      } else if (key === 'Delete') {
        inputType.current = 'deleteContentForward';
      }
    } else {
      if (isNumericKey) {
        inputType.current = 'insertText';
      } else if (key === 'Backspace') {
        inputType.current = 'deleteSection';
      } else if (key === 'Delete') {
        inputType.current = 'deleteSection';
      }
    }
    setCursor({cursorStart: start, cursorEnd: end});
  }, []);

  const handlePaste = React.useCallback(() => {
    inputType.current = 'insertFromPaste';
  }, []);

  React.useLayoutEffect(() => {
    inputRef?.current?.setSelectionRange(cursorStart, cursorEnd);
  }, [cursorStart, cursorEnd, updateKey]);


  return (
    <Input
      type="tel"
      name="ccNumber"
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      ref={inputRef}
      value={value}
      placeholder="Номер карты"
      autoFocus
      autoComplete="cc-number"
      tabIndex={0}
      {...restProps}
    />
  );
}

export const CCNumberInput = React.forwardRef(CCNumberInputComponent)
