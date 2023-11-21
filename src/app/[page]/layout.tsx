import { InputLimit } from '@/components/input-limit/input-limit';

export default function Layout ({ children }: { children: React.ReactNode }) {
  return (
    <>
      <InputLimit />
      {children}
    </>
  );
}