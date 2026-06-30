import { forwardRef, useRef, useState, useEffect, useCallback } from "react";
import ClassicTemplate from "../ResumePreview/ResumePreview";
import ModernTemplate from "./ModernTemplate";
import SidebarTemplate from "./SidebarTemplate";
import TwoColumnTemplate from "./TwoColumnTemplate";
import TimelineTemplate from "./TimelineTemplate";

const TEMPLATE_MAP = {
  classic: ClassicTemplate,
  modern: ModernTemplate,
  sidebar: SidebarTemplate,
  twocol: TwoColumnTemplate,
  timeline: TimelineTemplate,
};

/* A4 / US-Letter at 96 DPI */
const PAGE_W = 816; // 8.5in × 96
const PAGE_H = 1056; // 11in  × 96

const ResumePreviewWrapper = forwardRef(
  ({ data, templateId = "classic" }, ref) => {
    const Template = TEMPLATE_MAP[templateId] || TEMPLATE_MAP.classic;
    const containerRef = useRef(null);
    const [scale, setScale] = useState(0.5);

    /* Recalculate scale whenever the container resizes.
       We fit to WIDTH only (like Google Docs / Word "fit to width" zoom),
       and let the page scroll vertically inside the container if it's
       taller than the available viewport height. This avoids the page
       shrinking to a postage stamp just because the container is short. */
    const recalc = useCallback(() => {
      const el = containerRef.current;
      if (!el) return;
      const cw = el.clientWidth;
      const pad = 48; // 24px breathing room on each side
      const sw = (cw - pad) / PAGE_W;
      setScale(Math.min(sw, 1)); // never exceed 1:1, fit width only
    }, []);

    useEffect(() => {
      const el = containerRef.current;
      if (!el) return;
      recalc();
      const ro = new ResizeObserver(recalc);
      ro.observe(el);
      return () => ro.disconnect();
    }, [recalc]);

    return (
      <div
        ref={containerRef}
        className="rpw-container"
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          overflowX: "hidden",
          overflowY: "auto",
          paddingTop: 24,
          paddingBottom: 24,
        }}
      >
        <div
          className="rpw-page"
          style={{
            width: PAGE_W,
            minHeight: PAGE_H,
            transformOrigin: "top center",
            transform: `scale(${scale})`,
            /* Reserve the actual scaled footprint in layout so the
               container's scrollable area matches what's visible —
               otherwise large unscaled whitespace appears below. */
            marginBottom: scale < 1 ? -(PAGE_H * (1 - scale)) : 0,
            flexShrink: 0,
          }}
        >
          <Template data={data} ref={ref} />
        </div>
      </div>
    );
  },
);

ResumePreviewWrapper.displayName = "ResumePreviewWrapper";
export default ResumePreviewWrapper;
