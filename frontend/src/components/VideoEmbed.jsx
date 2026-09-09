export default function VideoEmbed({ url }) {
  if (!url) return null

  const getEmbedUrl = (url) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/)
    return match ? `https://www.youtube.com/embed/${match[1]}` : null
  }

  const embedUrl = getEmbedUrl(url)
  if (!embedUrl) return null

  return (
    <div className="my-8 rounded-xl overflow-hidden border border-dark-border aspect-video">
      <iframe
        src={embedUrl}
        title="Video"
        className="w-full h-full"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  )
}
