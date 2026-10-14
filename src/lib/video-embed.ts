export type VideoPlayback =
  | { mode: 'iframe'; embedSrc: string; watchUrl: string }
  | { mode: 'file'; src: string }
  | { mode: 'link'; href: string; label: string };

function youtubeWatchUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

function youtubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}?rel=0`;
}

function extractYoutubeVideoId(url: URL): string | undefined {
  const host = url.hostname.replace(/^www\./, '').toLowerCase();

  if (host === 'youtu.be') {
    const id = url.pathname.split('/').filter(Boolean)[0];
    return id || undefined;
  }

  if (host !== 'youtube.com' && host !== 'm.youtube.com' && host !== 'youtube-nocookie.com') {
    return undefined;
  }

  const path = url.pathname;

  if (path === '/watch') {
    return url.searchParams.get('v') || undefined;
  }

  const embedMatch = path.match(/^\/(?:embed|shorts|live|v)\/([^/?#]+)/i);
  if (embedMatch?.[1]) return embedMatch[1];

  return undefined;
}

function isYoutubeChannelOrBrowse(url: URL): boolean {
  const host = url.hostname.replace(/^www\./, '').toLowerCase();
  if (host !== 'youtube.com' && host !== 'm.youtube.com') return false;
  const path = url.pathname;
  return (
    path.startsWith('/@') ||
    path.startsWith('/channel/') ||
    path.startsWith('/c/') ||
    path.startsWith('/user/') ||
    path === '/' ||
    path === ''
  );
}

/**
 * Converte URL do Studio (YouTube, arquivo direto, etc.) no modo de reprodução do site.
 */
export function resolveVideoPlayback(src: string): VideoPlayback {
  const trimmed = src.trim();
  if (!trimmed) return { mode: 'link', href: '#', label: 'Link inválido' };

  let url: URL;
  try {
    url = new URL(trimmed);
  } catch {
    return { mode: 'file', src: trimmed };
  }

  const protocol = url.protocol.toLowerCase();
  if (protocol !== 'http:' && protocol !== 'https:') {
    return { mode: 'link', href: trimmed, label: 'Abrir mídia' };
  }

  const videoId = extractYoutubeVideoId(url);
  if (videoId) {
    return {
      mode: 'iframe',
      embedSrc: youtubeEmbedUrl(videoId),
      watchUrl: youtubeWatchUrl(videoId),
    };
  }

  if (isYoutubeChannelOrBrowse(url)) {
    return {
      mode: 'link',
      href: url.toString(),
      label: 'Abrir canal no YouTube',
    };
  }

  const host = url.hostname.replace(/^www\./, '').toLowerCase();
  if (host.includes('youtube.com') || host === 'youtu.be') {
    return {
      mode: 'link',
      href: url.toString(),
      label: 'Abrir no YouTube',
    };
  }

  const pathname = url.pathname.toLowerCase();
  if (/\.(mp4|webm|ogg|mov)(?:$|\?)/i.test(pathname)) {
    return { mode: 'file', src: trimmed };
  }

  // URL genérica (ex.: CDN do Studio) — tenta <video>; se falhar, o navegador mostra controles vazios.
  return { mode: 'file', src: trimmed };
}
