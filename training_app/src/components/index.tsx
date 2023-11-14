// src/components/index.tsx
import React from 'react';
import Link from 'next/link';

const IndexComponent: React.FC = () => {
  return (
    <div>
      <Link href="/login">Login</Link>
      <Link href="/signup">Create Account</Link>
    </div>
  );
};

export default IndexComponent;
