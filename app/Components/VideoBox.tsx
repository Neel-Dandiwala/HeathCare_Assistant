export default function VideoBox(props: any) {
    return (
        <div className="w-full h-full rounded-full overflow-hidden">
            <video 
                ref={props.video} 
                autoPlay 
                playsInline 
                id="simli_video"
                className="w-full h-full object-cover"
            ></video>
            <audio ref={props.audio} autoPlay id="simli_audio"></audio>
        </div>
    );
}