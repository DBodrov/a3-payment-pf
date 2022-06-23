import React from 'react';
import {Input} from '@a3/frontkit';
import {MailIcon} from '@/assets/icons';

type TProps = {
  onChange: (email: string) => void;
  email?: string;
};

export function EmailField({onChange, email}: TProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailAddress = e.target.value;
    onChange(emailAddress);
  };

  return (
    <div css={{width: '100%', position: 'relative'}}>
      <MailIcon css={{position: 'absolute', top: 8, left: 18}} />
      <Input
        id="email"
        name="email"
        type="email"
        onChange={handleChange}
        value={email}
        placeholder="Email"
        css={{
          height: 40,
          paddingLeft: 44,
          borderRadius: 12,
          backgroundColor: 'var(--color-background-secondary)',
        }}
      />
    </div>
  );
}
