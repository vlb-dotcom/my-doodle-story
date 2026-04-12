import React from 'react';

export function StarDoodle({ className = '', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
    </svg>
  );
}

export function HeartDoodle({ className = '', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} className={className} width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

export function SwirlDoodle({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M16 16c0-3 2.5-5.5 5.5-5.5S27 10 27 13s-2.5 5.5-5.5 5.5c-4.5 0-8-3.5-8-8s3.5-8 8-8" />
    </svg>
  );
}

export function ArrowDoodle({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="40" height="20" viewBox="0 0 40 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 10c8-4 16-4 28 0" />
      <path d="M26 4l4 6-6 4" />
    </svg>
  );
}

export function DoodleDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-3 text-muted-foreground opacity-40">
      <SwirlDoodle />
      <StarDoodle />
      <SwirlDoodle className="scale-x-[-1]" />
    </div>
  );
}
