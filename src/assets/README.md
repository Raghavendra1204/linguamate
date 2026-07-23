# Project Assets Folder (`src/assets`)

This directory holds the static graphic assets used in the application.

## Subdirectories

- `/images/` - Raster graphic files (PNG, JPG, WebP) for landing illustrations, badges, and user avatars.
- `/icons/` - Custom application-specific SVG icons (use `lucide-react` by default, only add files here if custom vector icons are required).
- `/vectors/` - Responsive, lightweight vector illustrations (SVGs) for empty states, dashboards, or achievement banners.

## Guidelines

1. **Format Optimization**: 
   - Prefer vector SVGs for all non-photo graphics to support scaling and performance.
   - Use WebP for raster images to optimize loading speeds.
2. **Flag Assets**:
   - High-quality SVG flag representations are stored under `/images/flags/` for language selectors.
3. **SVGs as React Elements**:
   - Large vectors should be imported as SVGs or wrapped in custom react components for dynamic color control.
