'use client';

import React from 'react';
import { useParams, useSelectedLayoutSegments } from 'next/navigation';

import { cn } from '@/lib/utils';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

function ConsoleBreadcrumb() {
  const params = useParams();
  const segments = useSelectedLayoutSegments();
  const paramsArray = Object.keys(params).map((key) => params[key]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {segments.map((segment, index) => {
          const url = `/console/${segments.slice(0, index + 1).join('/')}`;
          const isParam = paramsArray.includes(segment);
          const breadcrumbClassName = !isParam ? 'capitalize' : '';
          const breadcrumbText = !isParam
            ? segment.replace(/-/g, ' ')
            : segment;
          const isLast = index === segments.length - 1;

          if (!isLast) {
            return (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={url}
                    className={cn('hidden md:block', breadcrumbClassName)}
                  >
                    {breadcrumbText}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
              </React.Fragment>
            );
          }

          return (
            <BreadcrumbItem key={index}>
              <BreadcrumbPage className={breadcrumbClassName}>
                {breadcrumbText}
              </BreadcrumbPage>
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default ConsoleBreadcrumb;
