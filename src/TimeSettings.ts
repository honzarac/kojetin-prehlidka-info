
export default class TimeSettings
{
  // TESTING
  static showDuration: number = 12 * 1000
  static photoDuration: number = 6 * 1000
  static lastYearPhotosDuration: number = 10 * 1000

  // PROD
  // static showDuration: number = 32 * 1000
  // static photoDuration: number = 8 * 1000
  // static lastYearPhotosDuration: number = 120 * 1000

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