import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverProps {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver({
  threshold = 0,
  root = null,
  rootMargin = '0%',
  freezeOnceVisible = false,
}: UseIntersectionObserverProps = {}): [
  (node?: Element | null) => void,
  boolean,
  IntersectionObserverEntry | undefined,
] {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const [node, setNode] = useState<Element | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry);
  };

  useEffect(() => {
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || frozen || !node) return;

    const observerParams = { threshold, root, rootMargin };
    const isThresholdArray = Array.isArray(threshold);

    if (!observer.current || isThresholdArray) {
      observer.current = new IntersectionObserver(updateEntry, observerParams);
    }

    observer.current.observe(node);

    return () => observer.current?.disconnect();
  }, [node, JSON.stringify(threshold), root, rootMargin, frozen]);

  const previousY = useRef<number>();
  const previousRatio = useRef<number>();

  useEffect(() => {
    if (
      entry &&
      entry.boundingClientRect.y !== undefined &&
      entry.intersectionRatio !== undefined
    ) {
      if (
        previousY.current !== undefined &&
        previousRatio.current !== undefined
      ) {
        if (
          entry.boundingClientRect.y < previousY.current &&
          entry.intersectionRatio > previousRatio.current
        ) {
          // Scrolling down/in
        } else if (
          entry.boundingClientRect.y > previousY.current &&
          entry.intersectionRatio < previousRatio.current
        ) {
          // Scrolling up/out
        }
      }
      previousY.current = entry.boundingClientRect.y;
      previousRatio.current = entry.intersectionRatio;
    }
  });

  return [setNode, !!entry?.isIntersecting, entry];
}