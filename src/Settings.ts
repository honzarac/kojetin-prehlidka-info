import {DateTime} from "luxon";

export default class Settings
{
  static showDuration: number = (this.isDev() ? 5 : 48) * 1000
  static photoDuration: number = (this.isDev() ? 1 : 8) * 1000
  static lastYearPhotosDuration: number = (this.isDev() ? 15 : 180) * 1000

  static getShowDuration() {
    if (localStorage.getItem('showDuration')) {
      return localStorage.getItem('showDuration') * 1000
    }
    return Settings.showDuration
  }

  static getPhotoDuration() {
    if (localStorage.getItem('photoDuration')) {
      return localStorage.getItem('photoDuration') * 1000
    }
    return Settings.photoDuration
  }

  static isDev(){
    return import.meta.env.DEV
  }

  static printSettingTimes(shows: Array<Object>) {
    console.log('---------- TIME SETTINGS -------------')
    console.log('SHOW:' + this.showDuration/1000 + 's | PHOTO: ' + this.photoDuration/1000 + 's | lastYearPhotos: ' + this.lastYearPhotosDuration/1000 + 's')

    const showsTimeInSeconds = (shows.length*(this.showDuration))/1000
    console.log('Shows duration: ' + this.secondsToHumanReadable(showsTimeInSeconds))
    console.log('Complete slideshow duration: ' + this.secondsToHumanReadable(showsTimeInSeconds+(this.lastYearPhotosDuration/1000)))
    console.log('---------- TIME SETTINGS -------------')
  }

  static secondsToHumanReadable(seconds: number)
  {
    if (seconds < 60) {
      return seconds + 's';
    }
    return Math.floor(seconds/60) + 'm ' + (seconds%60) + 's'
  }

  static year = DateTime.now().toFormat('yyyy')
}