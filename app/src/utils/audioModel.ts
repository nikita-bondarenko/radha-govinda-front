import {
  setLeftTime,
  setPassedTime,
  setProgress,
  setIsPlaying,
  setIsLoading,
  setAudio,
  setSelectedCategoryId,
} from "@/lib/store/audioSlice";
import { store } from "@/lib/store/store";
import { findNextAudioIndex } from "@/utils/findNextAudioIndex";
import { ur } from "zod/v4/locales";
import { Audio as AudioType } from "@/components/sections/audio-preview/AudioPreview";

export class AudioElement {
  private AUDIO_ELEMENT_ID = "audio-el";
  dispatch: any = null;

  _element: HTMLAudioElement | null = null;
  constructor() {
    const storeInstance = store;
    this.init(storeInstance);
    this.dispatch = storeInstance.dispatch;
  }

  private init(storeInstance: any) {
    let audioElement = document.getElementById(
      this.AUDIO_ELEMENT_ID
    ) as HTMLAudioElement;
    if (!audioElement) {
      audioElement = new Audio();
      audioElement.preload = "auto";

      audioElement.addEventListener("loadedmetadata", () => {
        if (storeInstance && audioElement) {
          const duration = audioElement.duration;
          if (duration > 0 && !isNaN(duration) && isFinite(duration)) {
            storeInstance.dispatch(setLeftTime(duration));
            storeInstance.dispatch(setPassedTime(0));
            storeInstance.dispatch(setProgress(0));
          }
        }
      });

      audioElement.addEventListener("durationchange", () => {
        if (storeInstance && audioElement) {
          const duration = audioElement.duration;
          if (duration > 0 && !isNaN(duration) && isFinite(duration)) {
            storeInstance.dispatch(setLeftTime(duration));
          }
        }
      });

      audioElement.addEventListener("timeupdate", () => {
        if (storeInstance && audioElement) {
          const currentTime = audioElement.currentTime;
          const duration = audioElement.duration;

          if (duration > 0 && !isNaN(duration) && isFinite(duration)) {
            const progress = (currentTime / duration) * 100;
            storeInstance.dispatch(setPassedTime(currentTime));
            storeInstance.dispatch(setProgress(progress));
          }
        }
      });

      audioElement.addEventListener("ended", () => {
        const currentState = storeInstance?.getState();
        const isLooping = currentState?.audio?.isLooping;

        if (isLooping && audioElement) {
          audioElement.currentTime = 0;
          audioElement.play().catch((error) => {
            console.error("Error restarting audio:", error);
            storeInstance.dispatch(setIsPlaying(false));
            audioElement.pause()
          });
        } else {
          this.playNextAudio();
        }
      });


      audioElement.id = this.AUDIO_ELEMENT_ID;
      audioElement.style.display = "none";
      document.body.append(audioElement);
    }
    this._element = audioElement;
  }

  play({ audio }: { audio?: AudioType | null }) {
    const dispatch = store.dispatch;
    dispatch(setIsLoading(true));
    const state = store.getState();
    const volume = state.audio.volume;
    const logoUrl = state.audio.logoUrl;

    this.setCurrentTime(state.audio.passedTime);

    if (audio?.AudioCategory?.documentId)
      dispatch(setSelectedCategoryId(audio?.AudioCategory?.documentId));

    return new Promise((resolve, reject) => {
      if (!audio?.Audio.url || !this._element || !volume) return;

      const tryPlay = () => {
        const playPromise = this._element?.play();
        if (playPromise)
          playPromise
            .then(() => {
              dispatch(setIsLoading(false));
              if (navigator?.mediaSession?.playbackState)
                navigator.mediaSession.playbackState = "playing";
              resolve(1);
            })
            .catch((error) => {
              dispatch(setIsLoading(false));
              reject(error);
            });
      };
      if (this._element.src !== audio?.Audio.url) {
        if ("mediaSession" in navigator) {
          navigator.mediaSession.metadata = new MediaMetadata({
            title: audio?.Name || "", // Set the audio title here
            artwork: [
              audio?.AudioCategory?.Image?.url
                ? {
                    src: audio?.AudioCategory?.Image?.url,
                    sizes: "96x96", // Adjust size to match your design
                    type: "image/webp",
                  }
                : {
                    src: logoUrl || "",
                    sizes: "96x96", // Adjust size to match your design
                    type: "image/svg+xml",
                  },
            ],
          });
          navigator.mediaSession.setActionHandler("play", () => {
            tryPlay();
            dispatch(setIsPlaying(true));
          });
          navigator.mediaSession.setActionHandler("pause", () => {
            this.pause();
            dispatch(setIsPlaying(false));
          });
          navigator.mediaSession.setActionHandler("previoustrack", () => {
            this.playPrevAudio();
          });
          navigator.mediaSession.setActionHandler("nexttrack", () => {
            this.playNextAudio();
          });
    
        }
        this._element.src = audio?.Audio.url;
        this._element.volume = volume / 100;
        const onCanPlay = () => {
          tryPlay();
          this._element?.removeEventListener("canplay", onCanPlay); // Удаляем слушатель
        };
        this._element.addEventListener("canplay", onCanPlay);
        this._element.load();
      } else {
        if (this._element.paused || this._element.ended) {
          tryPlay();
        } else {
          dispatch(setIsLoading(false));
          resolve(1); // Аудио уже играет, разрешаем промис
        }
      }
    });
  }
  pause() {
    this._element?.pause();
    if (navigator?.mediaSession?.playbackState)
      navigator.mediaSession.playbackState = "paused";
  }

  getCurrentTime() {
    return this._element?.currentTime || 0;
  }

  getDuration() {
    return this._element?.duration || 0;
  }

  setCurrentTime(time: number): void {
    if (this._element) {
      this._element.currentTime = time;
    }
  }

  setVolume(volume: number): void {
    if (this._element) this._element.volume = volume / 100;
  }

  playPrevAudio() {
    const { audio: state } = store.getState();
    const index = findNextAudioIndex({
      audio: state.audio,
      playlist: state.playlist,
      playlistAudioPositions: state.playlistAudioPositions,
      direction: "prev",
    });

    const newAudio = state.playlist[index];
    this.play({ audio: newAudio });
    this.dispatch(setAudio(newAudio));
    this.dispatch(setIsPlaying(true));
    this.dispatch(setProgress(0));
    this.dispatch(setLeftTime(0));
    this.dispatch(setPassedTime(0));
  }

  playNextAudio() {
    const { audio: state } = store.getState();

    const index = findNextAudioIndex({
      audio: state.audio,
      playlist: state.playlist,
      playlistAudioPositions: state.playlistAudioPositions,
      direction: "next",
    });

    const newAudio = state.playlist[index];
    console.log(
      newAudio,
      state.playlist,
      state.playlistAudioPositions.map(
        (id) => state.playlist.find((audio) => audio?.documentId === id)?.Name
      )
    );

    this.play({ audio: newAudio });
    this.dispatch(setAudio(newAudio));
    this.dispatch(setIsPlaying(true));
    this.dispatch(setProgress(0));
    this.dispatch(setLeftTime(0));
    this.dispatch(setPassedTime(0));
  }
}
