import { useMemo } from 'react'
import assetManifest from 'virtual:assets'

const FALLBACK_MANIFEST = { images: [], music: [] }

function normalizeManifest(data) {
  if (!data || typeof data !== 'object') return FALLBACK_MANIFEST
  return {
    images: Array.isArray(data.images) ? data.images : [],
    music: Array.isArray(data.music) ? data.music : [],
  }
}

export function useAssets() {
  return useMemo(() => normalizeManifest(assetManifest), [])
}

export function useImageUrls() {
  const { images } = useAssets()
  return images
}

export function useMusicUrls() {
  const { music } = useAssets()
  return music
}
