export const Trailer = ({trailerKey}: {trailerKey: string | null}) => {
    return <div className="w-full px-4 sm:px-6 md:px-8">
    <div className="mx-auto w-full md:w-[800px] aspect-video bg-black rounded overflow-hidden">
        <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
            title="Trailer"
            allow="autoplay; encrypted-media"
        />
    </div>
</div>
}