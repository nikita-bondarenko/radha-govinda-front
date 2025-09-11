import {
  setLeftTime,
  setPassedTime,
  setProgress,
  setIsPlaying,
  setIsLoading,
  setAudio,
  setBufferPosition,
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
        // console.log('Audio ended');
        // Проверяем состояние зацикливания
        const currentState = storeInstance?.getState();
        const isLooping = currentState?.audio?.isLooping;

        if (isLooping && audioElement) {
          // Если зацикливание включено, перезапускаем текущий трек
          // console.log('Looping enabled, restarting current track');
          audioElement.currentTime = 0;
          audioElement.play().catch((error) => {
            console.error("Error restarting audio:", error);
            storeInstance.dispatch(setIsPlaying(false));
          });
        } else {
          this.playNextAudio();
        }
      });

      audioElement.addEventListener("error", (e) => {
        console.error("Audio error:", e);
        // Если произошла ошибка загрузки, сбрасываем состояние воспроизведения
        if (storeInstance) {
          storeInstance.dispatch(setIsPlaying(false));
          storeInstance.dispatch(setIsLoading(false));
          // console.log('Audio loading failed, setting isPlaying to false');
        }
      });

      audioElement.id = this.AUDIO_ELEMENT_ID;
      audioElement.style.display = "none";
      document.body.append(audioElement);
    }
    this._element = audioElement;
  }

  play({
    audio,
    volume,
  }: {
    audio?: AudioType | null;
    volume: number | null | undefined;
  }) {
    const dispatch = store.dispatch;
    dispatch(setIsLoading(true));
    const state = store.getState();
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
              resolve(1);
            })
            .catch((error) => {
              dispatch(setIsLoading(false));
              reject(error);
            });
      };
      if (this._element.src !== audio?.Audio.url) {
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
    const index = findNextAudioIndex(
      state.audio,
      state.playlist,
      state.flow,
      "prev"
    );

    const newAudio = state.playlist[index];
    this.play({ audio: newAudio, volume: state.volume });
    this.dispatch(setAudio(newAudio));
    this.dispatch(setIsPlaying(true));
    this.dispatch(setProgress(0));
    this.dispatch(setLeftTime(0));
    this.dispatch(setPassedTime(0));
  }

  playNextAudio() {
    const { audio: state } = store.getState();

    const index = findNextAudioIndex(
      state.audio,
      state.playlist,
      state.flow,
      "next"
    );

    const newAudio = state.playlist[index];

    this.play({ audio: newAudio, volume: state.volume });
    this.dispatch(setAudio(newAudio));
    this.dispatch(setIsPlaying(true));
    this.dispatch(setProgress(0));
    this.dispatch(setLeftTime(0));
    this.dispatch(setPassedTime(0));
  }
}
