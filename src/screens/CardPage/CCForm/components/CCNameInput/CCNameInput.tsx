import React from 'react';
import {Input} from '@a3/frontkit';
import {formatCCName} from './utils';
import {ICCInputProps, TCursorPosition} from '../types';


export function CCNameInput(props: ICCInputProps) {
  const {onChange, value, ...restProps} = props;
  const [updateKey, forceUpdate] = React.useState(0);
  const inputType = React.useRef<string>('');
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [{cursorStart, cursorEnd}, setCursor] = React.useReducer(
    (s: TCursorPosition, a: TCursorPosition): TCursorPosition => ({...s, ...a}),
    {
      cursorStart: null,
      cursorEnd: null,
    },
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ccName = formatCCName(e.target.value);
    let cursor = cursorStart;
    switch (inputType.current) {
      default:
      case 'insertText': {
        cursor = cursorStart! + 1;
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
        cursor = ccName.length;
        setCursor({cursorStart: cursor, cursorEnd: cursor});
        break;
      }
    }
    onChange(ccName);
  };

  const handleKeyDown = React.useCallback((event: React.KeyboardEvent) => {
    const {ctrlKey, metaKey, key} = event;
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
      } else {
        inputType.current = 'insertText';
      }
    } else {
      if (key === 'Backspace') {
        inputType.current = 'deleteSection';
      } else if (key === 'Delete') {
        inputType.current = 'deleteSection';
      } else {
        inputType.current = 'insertText';
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
      type="text"
      css={{width: '70%'}}
      placeholder="Владелец карты"
      name="ccName"
      tabIndex={0}
      onChange={handleChange}
      value={value}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      ref={inputRef}
      autoComplete="cc-name"
      {...restProps}
    />
  );
}
