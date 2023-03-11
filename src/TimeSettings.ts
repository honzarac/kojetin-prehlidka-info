
export default class TimeSettings
{
  // TESTING
  // static showDuration: number = 8 * 1000
  // static photoDuration: number = 4 * 1000
  // static lastYearPhotosDuration: number = 15 * 1000

  // PROD
  static showDuration: number = 48 * 1000
  static photoDuration: number = 8 * 1000
  static lastYearPhotosDuration: number = 180 * 1000

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
}