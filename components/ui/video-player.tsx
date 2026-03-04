"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
import {
    Play,
    Pause,
    Volume2,
    VolumeX,
    Maximize,
    Minimize,
    Settings,
    SkipBack,
    SkipForward,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

interface VideoPlayerProps {
    url: string;
    title?: string;
    onProgress?: (state: { played: number; playedSeconds: number }) => void;
    onEnded?: () => void;
    className?: string;
}

export function VideoPlayer({
    url,
    title,
    onProgress,
    onEnded,
    className,
}: VideoPlayerProps) {
    const playerRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);
    const [volume, setVolume] = useState(0.8);
    const [played, setPlayed] = useState(0);
    const [duration, setDuration] = useState(0);
    const [seeking, setSeeking] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [showSettings, setShowSettings] = useState(false);
    const [buffered, setBuffered] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    const hideControlsTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const handlePlayPause = () => {
        setPlaying(!playing);
    };

    const handleProgress = (state: { played: number; playedSeconds: number; loaded: number }) => {
        if (!seeking) {
            setPlayed(state.played);
            setBuffered(state.loaded);
        }
        onProgress?.(state);
    };

    const handleSeekChange = (value: number[]) => {
        setPlayed(value[0]);
    };

    const handleSeekMouseDown = () => {
        setSeeking(true);
    };

    const handleSeekMouseUp = (value: number[]) => {
        setSeeking(false);
        playerRef.current?.seekTo(value[0]);
    };

    const handleVolumeChange = (value: number[]) => {
        setVolume(value[0]);
        setMuted(value[0] === 0);
    };

    const handleDuration = (duration: number) => {
        setDuration(duration);
    };

    const handleEnded = () => {
        setPlaying(false);
        onEnded?.();
    };

    const toggleFullscreen = useCallback(() => {
        if (!containerRef.current) return;

        if (!isFullscreen) {
            if (containerRef.current.requestFullscreen) {
                containerRef.current.requestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
        setIsFullscreen(!isFullscreen);
    }, [isFullscreen]);

    const handleMouseMove = () => {
        setShowControls(true);
        if (hideControlsTimeout.current) {
            clearTimeout(hideControlsTimeout.current);
        }
        hideControlsTimeout.current = setTimeout(() => {
            if (playing) {
                setShowControls(false);
            }
        }, 3000);
    };

    const skip = (seconds: number) => {
        const currentTime = playerRef.current?.getCurrentTime() || 0;
        playerRef.current?.seekTo(currentTime + seconds);
    };

    const playbackSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

    if (!isMounted) {
        return (
            <div className={cn(
                "relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center",
                className
            )}>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
            </div>
        );
    }
    const normalizeUrl = (url: string) => {
        if (url.includes("youtube.com/embed/")) {
            const id = url.split("embed/")[1]?.split("?")[0];
            return `https://www.youtube.com/watch?v=${id}`;
        }
        return url;
    };

    return (
        <div
            ref={containerRef}
            className={cn(
                "relative aspect-video bg-black rounded-2xl overflow-hidden group shadow-2xl",
                className
            )}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => playing && setShowControls(false)}
        >
            {/* Video Player */}
            <ReactPlayer
                {...({
                    ref: playerRef,
                    url: normalizeUrl(url),
                    width: "100%",
                    height: "100%",
                    playing: playing,
                    muted: muted,
                    volume: volume,
                    playbackRate: playbackRate,
                    onProgress: handleProgress,
                    onDuration: handleDuration,
                    onEnded: handleEnded,
                    style: { position: "absolute", top: 0, left: 0 },
                    config: {
                        youtube: {
                            playerVars: {
                                modestbranding: 1,
                                rel: 0,
                                showinfo: 0,
                            },
                        },
                    },
                } as any)}
            />

            {/* Click to Play/Pause Overlay */}
            <div
                className="absolute inset-0 cursor-pointer z-10"
                onClick={handlePlayPause}
            />

            {/* Play Button Overlay (when paused) */}
            {!playing && (
                <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                    <div className="h-20 w-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-2xl">
                        <Play className="h-10 w-10 text-white fill-white ml-1" />
                    </div>
                </div>
            )}

            {/* Controls Overlay */}
            <div
                className={cn(
                    "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 pt-16 transition-opacity duration-300 z-30",
                    showControls ? "opacity-100" : "opacity-0"
                )}
            >
                {/* Progress Bar */}
                <div className="mb-4 relative group/progress">
                    {/* Buffered Progress */}
                    <div className="absolute h-1.5 bg-white/20 rounded-full w-full top-1/2 -translate-y-1/2 overflow-hidden">
                        <div
                            className="h-full bg-white/30 transition-all"
                            style={{ width: `${buffered * 100}%` }}
                        />
                    </div>
                    <Slider
                        value={[played]}
                        min={0}
                        max={0.999999}
                        step={0.001}
                        onValueChange={handleSeekChange}
                        onPointerDown={handleSeekMouseDown}
                        onValueCommit={handleSeekMouseUp}
                        className="cursor-pointer [&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:bg-white [&_[role=slider]]:border-0 [&_[role=slider]]:shadow-lg [&_[role=slider]]:opacity-0 group-hover/progress:[&_[role=slider]]:opacity-100 [&_[role=slider]]:transition-opacity"
                    />
                </div>

                {/* Controls Row */}
                <div className="flex items-center justify-between gap-4">
                    {/* Left Controls */}
                    <div className="flex items-center gap-2">
                        {/* Skip Back */}
                        <button
                            onClick={() => skip(-10)}
                            className="p-2 rounded-full hover:bg-white/10 transition-colors text-white"
                            title="Skip back 10s"
                        >
                            <SkipBack className="h-5 w-5" />
                        </button>

                        {/* Play/Pause */}
                        <button
                            onClick={handlePlayPause}
                            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                        >
                            {playing ? (
                                <Pause className="h-6 w-6" />
                            ) : (
                                <Play className="h-6 w-6 ml-0.5" />
                            )}
                        </button>

                        {/* Skip Forward */}
                        <button
                            onClick={() => skip(10)}
                            className="p-2 rounded-full hover:bg-white/10 transition-colors text-white"
                            title="Skip forward 10s"
                        >
                            <SkipForward className="h-5 w-5" />
                        </button>

                        {/* Volume */}
                        <div className="flex items-center gap-2 group/volume">
                            <button
                                onClick={() => setMuted(!muted)}
                                className="p-2 rounded-full hover:bg-white/10 transition-colors text-white"
                            >
                                {muted || volume === 0 ? (
                                    <VolumeX className="h-5 w-5" />
                                ) : (
                                    <Volume2 className="h-5 w-5" />
                                )}
                            </button>
                            <div className="w-0 overflow-hidden group-hover/volume:w-20 transition-all duration-300">
                                <Slider
                                    value={[muted ? 0 : volume]}
                                    min={0}
                                    max={1}
                                    step={0.01}
                                    onValueChange={handleVolumeChange}
                                    className="cursor-pointer [&_[role=slider]]:h-3 [&_[role=slider]]:w-3 [&_[role=slider]]:bg-white [&_[role=slider]]:border-0"
                                />
                            </div>
                        </div>

                        {/* Time Display */}
                        <span className="text-white text-sm font-medium ml-2">
                            {formatTime(played * duration)} / {formatTime(duration)}
                        </span>
                    </div>

                    {/* Right Controls */}
                    <div className="flex items-center gap-2">
                        {/* Playback Speed */}
                        <div className="relative">
                            <button
                                onClick={() => setShowSettings(!showSettings)}
                                className="p-2 rounded-full hover:bg-white/10 transition-colors text-white"
                            >
                                <Settings className="h-5 w-5" />
                            </button>

                            {showSettings && (
                                <div className="absolute bottom-full right-0 mb-2 bg-black/90 backdrop-blur-md rounded-xl border border-white/10 p-2 min-w-[140px] shadow-2xl">
                                    <p className="text-xs text-white/50 font-medium px-2 pb-2 border-b border-white/10 mb-2">
                                        Playback Speed
                                    </p>
                                    {playbackSpeeds.map((speed) => (
                                        <button
                                            key={speed}
                                            onClick={() => {
                                                setPlaybackRate(speed);
                                                setShowSettings(false);
                                            }}
                                            className={cn(
                                                "w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                                playbackRate === speed
                                                    ? "bg-white text-black"
                                                    : "text-white hover:bg-white/10"
                                            )}
                                        >
                                            {speed}x
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Fullscreen */}
                        <button
                            onClick={toggleFullscreen}
                            className="p-2 rounded-full hover:bg-white/10 transition-colors text-white"
                        >
                            {isFullscreen ? (
                                <Minimize className="h-5 w-5" />
                            ) : (
                                <Maximize className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
