import { IImage, IKinoVideo } from "./images";

export interface IMediaKinoDetails {
    videos: IKinoVideo[],
    posters: IImage[],
    backdrops: IImage[],
}