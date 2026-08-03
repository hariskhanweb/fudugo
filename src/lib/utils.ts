export function cn(
  ...classes: Array<string | number | boolean | null | undefined>
) {
  return classes.filter((value) => typeof value === "string" && value).join(" ");
}

export function youtubeEmbedUrl(
  videoId: string,
  options: { autoplay?: boolean; mute?: boolean; controls?: boolean } = {},
) {
  const { autoplay = true, mute = true, controls = false } = options;
  const params = new URLSearchParams({
    autoplay: autoplay ? "1" : "0",
    mute: mute ? "1" : "0",
    loop: "1",
    playlist: videoId,
    controls: controls ? "1" : "0",
    rel: "0",
  });
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}
